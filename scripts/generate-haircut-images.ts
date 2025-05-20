import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { maleHaircuts, femaleHaircuts } from '../client/src/data/haircuts';
import OpenAI from "openai";

// Load environment variables from .env file
dotenv.config();

// Set up OpenAI client
const apiKey = process.env.OPENAI_API_KEY;
console.log("API Key available:", !!apiKey);
const openai = new OpenAI({ apiKey });

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images/haircuts');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Function to generate image prompt for a haircut
function generatePrompt(name: string, gender: 'male' | 'female', tags: string[]): string {
  
  return `A professional, realistic photo of a ${gender} model with a ${name} hairstyle. Clear focus on the hair, show the complete head, fashion photoshoot quality, neutral studio background, photorealistic.`;
}

// Function to download an image from a URL
async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
  console.log(`Image saved: ${filepath}`);
}

// Function to generate one image for a haircut
async function generateHaircutImage(haircut: any): Promise<void> {
  try {
    const prompt = generatePrompt(haircut.name, haircut.gender, haircut.tags);
    console.log(`Generating image for: ${haircut.name} (${haircut.gender})`);
    console.log(`Prompt: ${prompt}`);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    
    if (!response.data || response.data.length === 0) {
      throw new Error('No image data returned from API');
    }
    
    const imageUrl = response.data[0].url;
    if (!imageUrl) {
      throw new Error('No image URL returned from API');
    }
    
    const filename = `${haircut.gender}-${haircut.id}.png`;
    const filepath = path.join(imagesDir, filename);
    
    await downloadImage(imageUrl, filepath);
    
    // Update record of generated images
    const generatedImages = loadGeneratedImages();
    generatedImages[`${haircut.gender}-${haircut.id}`] = {
      id: haircut.id,
      name: haircut.name,
      gender: haircut.gender,
      filename: filename,
      generatedAt: new Date().toISOString()
    };
    saveGeneratedImages(generatedImages);
    
  } catch (error: any) {
    console.error(`Error generating image for ${haircut.name}:`, error);
  }
}

// Function to load record of generated images
function loadGeneratedImages(): Record<string, any> {
  const filepath = path.join(__dirname, '../public/images/generated-images.json');
  if (fs.existsSync(filepath)) {
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
  }
  return {};
}

// Function to save record of generated images
function saveGeneratedImages(data: Record<string, any>): void {
  const filepath = path.join(__dirname, '../public/images/generated-images.json');
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

// Main function to run the script
async function main() {
  // Combine all haircuts
  const allHaircuts = [...maleHaircuts, ...femaleHaircuts];
  
  // Check if we should generate one sample image for each style or for specific styles
  const args = process.argv.slice(2);
  const sampleMode = args.includes('--sample');
  const specificIds = args.filter(arg => !arg.startsWith('--')).map(id => parseInt(id, 10));
  
  if (sampleMode) {
    // Generate one sample image for male and one for female
    const maleHaircut = maleHaircuts[0];
    const femaleHaircut = femaleHaircuts[0];
    
    console.log('Generating sample images...');
    await generateHaircutImage(maleHaircut);
    await generateHaircutImage(femaleHaircut);
    
  } else if (specificIds.length > 0) {
    // Generate images for specific haircuts
    console.log(`Generating images for specific haircuts: ${specificIds.join(', ')}`);
    
    for (const haircut of allHaircuts) {
      if (specificIds.includes(haircut.id)) {
        await generateHaircutImage(haircut);
      }
    }
    
  } else {
    // Generate images for all haircuts
    console.log('Generating images for all haircuts...');
    
    for (const haircut of allHaircuts) {
      await generateHaircutImage(haircut);
    }
  }
  
  console.log('Image generation completed!');
}

// Run the script
main().catch(error => {
  console.error('Error running script:', error);
  process.exit(1);
});