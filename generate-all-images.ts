import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { maleHaircuts, femaleHaircuts } from './client/src/data/haircuts';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public/images/haircuts');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Initialize OpenAI client directly
const openai = new OpenAI();
console.log("OpenAI API initialized");

// Function to generate a prompt for a haircut
function generatePrompt(haircut: any): string {
  const lengthTag = haircut.tags.find((tag: string) => ["Short", "Medium", "Long"].includes(tag)) || "";
  const styleTag = haircut.tags.find((tag: string) => ["Classic", "Modern"].includes(tag)) || "";
  
  return `A professional, realistic photo of a ${haircut.gender} model with a ${lengthTag.toLowerCase()} ${haircut.name} hairstyle. ${styleTag} style. Clear focus on the hair, fashion photoshoot quality, neutral studio background, photorealistic.`;
}

// Function to download an image
async function downloadImage(url: string, filepath: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`Image saved to: ${filepath}`);
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
}

// Function to generate image for a haircut
async function generateImage(haircut: any): Promise<void> {
  const imagePath = path.join(imagesDir, `${haircut.gender}-${haircut.id}.png`);
  
  // Skip if image already exists
  if (fs.existsSync(imagePath)) {
    console.log(`Image for ${haircut.name} already exists, skipping...`);
    return;
  }
  
  try {
    console.log(`Generating image for ${haircut.name} (${haircut.gender})...`);
    const prompt = generatePrompt(haircut);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    
    if (!response.data || response.data.length === 0 || !response.data[0].url) {
      throw new Error("No image URL returned");
    }
    
    await downloadImage(response.data[0].url, imagePath);
    console.log(`✅ Successfully generated image for ${haircut.name}`);
    
    // Wait a bit to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error(`❌ Failed to generate image for ${haircut.name}:`, error);
  }
}

// Main function to generate all images
async function generateAllImages() {
  console.log("Starting image generation for all haircuts...");
  
  // Process male haircuts
  console.log(`\nGenerating images for ${maleHaircuts.length} male haircuts...`);
  for (const haircut of maleHaircuts) {
    await generateImage(haircut);
  }
  
  // Process female haircuts
  console.log(`\nGenerating images for ${femaleHaircuts.length} female haircuts...`);
  for (const haircut of femaleHaircuts) {
    await generateImage(haircut);
  }
  
  console.log("\n✨ All images have been generated!");
}

// Run the script
generateAllImages().catch(error => {
  console.error("Error running script:", error);
  process.exit(1);
});