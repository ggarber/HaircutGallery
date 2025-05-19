/**
 * Simple script to generate sample images for the haircuts
 * This script directly uses the environment secrets
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { maleHaircuts, femaleHaircuts } from './client/src/data/haircuts';

// Output directory for images
const outputDir = path.join(process.cwd(), 'public/images/haircuts');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

// Initialize OpenAI client with environment variable
const openai = new OpenAI();

// Function to generate an image for a haircut
async function generateHaircutImage(haircut: any) {
  try {
    // Generate prompt
    const lengthTag = haircut.tags.find((tag: string) => ["Short", "Medium", "Long"].includes(tag)) || "";
    const styleTag = haircut.tags.find((tag: string) => ["Classic", "Modern"].includes(tag)) || "";
    
    const prompt = `A professional, realistic photo of a ${haircut.gender} model with a ${lengthTag.toLowerCase()} ${haircut.name} hairstyle. ${styleTag} style. Clear focus on the hair, fashion photoshoot quality, neutral studio background, photorealistic.`;
    
    console.log(`Generating image for: ${haircut.name} (${haircut.gender})`);
    console.log(`Prompt: ${prompt}`);
    
    // Call OpenAI API
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
    
    // Download the image
    console.log(`Downloading image...`);
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }
    
    // Save the image
    const outputPath = path.join(outputDir, `${haircut.gender}-${haircut.id}.png`);
    const buffer = await imageResponse.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    console.log(`✅ Saved image to: ${outputPath}`);
    return true;
  } catch (error: any) {
    console.error(`❌ Error generating image for ${haircut.name}:`, error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log("Starting to generate sample haircut images...");
  
  // Generate one male and one female haircut image
  const maleHaircut = maleHaircuts[0]; // Undercut
  const femaleHaircut = femaleHaircuts[0]; // Bob
  
  console.log("Generating sample male haircut image...");
  await generateHaircutImage(maleHaircut);
  
  console.log("Generating sample female haircut image...");
  await generateHaircutImage(femaleHaircut);
  
  console.log("Sample image generation complete! Check the public/images/haircuts directory.");
}

// Run the script
main().catch(error => {
  console.error("Error running script:", error);
  process.exit(1);
});