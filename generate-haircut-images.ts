/**
 * Haircut Images Generator Script
 * 
 * This script generates AI images for all hairstyles defined in the application.
 * It uses OpenAI's DALL-E 3 model to create realistic images of the haircuts.
 * 
 * Run with: npx tsx generate-haircut-images.ts [options]
 * 
 * Options:
 *   --all              Generate images for all haircuts (default)
 *   --male             Generate images for male haircuts only
 *   --female           Generate images for female haircuts only
 *   --limit=n          Limit to generating n images
 *   --id=n             Generate image for a specific haircut ID
 *   
 * Examples:
 *   npx tsx generate-haircut-images.ts --male --limit=5
 *   npx tsx generate-haircut-images.ts --id=3
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import { Haircut } from './shared/schema';
import { maleHaircuts, femaleHaircuts } from './client/src/data/haircuts';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directory for images if it doesn't exist
const imagesDir = path.join(__dirname, 'public/images/haircuts');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`Created directory: ${imagesDir}`);
}

// Create metadata file if it doesn't exist
const metadataPath = path.join(__dirname, 'public/images/haircuts-metadata.json');
let metadata: Record<string, any> = {};
if (fs.existsSync(metadataPath)) {
  try {
    const data = fs.readFileSync(metadataPath, 'utf8');
    metadata = JSON.parse(data);
  } catch (e) {
    console.error('Error reading metadata file:', e);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  male: args.includes('--male') || !args.includes('--female'),
  female: args.includes('--female') || !args.includes('--male'),
  limit: args.find(arg => arg.startsWith('--limit='))?.split('=')[1] 
    ? parseInt(args.find(arg => arg.startsWith('--limit='))!.split('=')[1]) 
    : Infinity,
  id: args.find(arg => arg.startsWith('--id='))?.split('=')[1] || null
};

if (args.includes('--all')) {
  options.male = true;
  options.female = true;
}

// Get haircuts to process based on options
let haircuts: Haircut[] = [];

if (options.id) {
  // Find the specific haircut by ID
  const id = parseInt(options.id);
  const maleHaircut = maleHaircuts.find(h => h.id === id);
  const femaleHaircut = femaleHaircuts.find(h => h.id === id);
  
  if (maleHaircut) {
    haircuts.push(maleHaircut);
  } else if (femaleHaircut) {
    haircuts.push(femaleHaircut);
  } else {
    console.error(`No haircut found with ID: ${id}`);
    process.exit(1);
  }
} else {
  // Get haircuts based on gender options
  if (options.male) {
    haircuts = haircuts.concat(maleHaircuts);
  }
  
  if (options.female) {
    haircuts = haircuts.concat(femaleHaircuts);
  }
  
  // Apply limit if specified
  if (options.limit !== Infinity) {
    haircuts = haircuts.slice(0, options.limit);
  }
}

console.log(`Preparing to generate images for ${haircuts.length} haircuts...`);

// Function to generate image for a single haircut
async function generateImage(haircut: Haircut): Promise<boolean> {
  const filename = `${haircut.gender}-${haircut.id}.png`;
  const imagePath = path.join(imagesDir, filename);
  
  // Skip if image already exists and no force flag
  if (fs.existsSync(imagePath) && !args.includes('--force')) {
    console.log(`Image for ${haircut.name} (${haircut.gender}) already exists. Skipping.`);
    return true;
  }
  
  try {
    console.log(`\nGenerating image for ${haircut.name} (${haircut.gender}, ID: ${haircut.id})...`);
    
    // Generate prompt based on haircut properties
    const lengthTag = haircut.tags.find(tag => ["Short", "Medium", "Long"].includes(tag)) || "";
    const styleTag = haircut.tags.find(tag => ["Classic", "Modern"].includes(tag)) || "";
    
    const prompt = `A professional, realistic photo of a ${haircut.gender} model with a ${lengthTag.toLowerCase()} ${haircut.name} hairstyle. ${styleTag} style. Clear focus on the hair, fashion photoshoot quality, neutral studio background, photorealistic.`;
    console.log(`Prompt: ${prompt}`);
    
    // Call OpenAI API to generate image
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    
    if (!response.data || response.data.length === 0) {
      throw new Error('No image data returned from API');
    }
    
    const imageUrl = response.data[0].url;
    if (!imageUrl) {
      throw new Error('No image URL in response');
    }
    
    // Download and save the image
    console.log(`Downloading image...`);
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }
    
    const buffer = await imageResponse.arrayBuffer();
    fs.writeFileSync(imagePath, Buffer.from(buffer));
    
    // Update metadata
    metadata[`${haircut.gender}-${haircut.id}`] = {
      id: haircut.id,
      name: haircut.name,
      gender: haircut.gender,
      tags: haircut.tags,
      filename,
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    console.log(`✅ Successfully generated and saved image: ${filename}`);
    return true;
    
  } catch (error: any) {
    console.error(`❌ Error generating image for ${haircut.name}:`, error.message);
    return false;
  }
}

// Main function to process all haircuts
async function main() {
  let successCount = 0;
  let errorCount = 0;
  
  for (const haircut of haircuts) {
    const success = await generateImage(haircut);
    
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Print summary
  console.log(`\n✨ Image Generation Complete ✨`);
  console.log(`Total images processed: ${haircuts.length}`);
  console.log(`Successfully generated: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Images saved to: ${imagesDir}`);
}

// Run the script
main().catch(error => {
  console.error('Error running script:', error);
  process.exit(1);
});