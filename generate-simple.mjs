// A simple script to generate haircut images using OpenAI API
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { maleHaircuts, femaleHaircuts } from './client/src/data/haircuts.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create output directory
const outputDir = path.join(__dirname, 'public/images/haircuts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to download an image from a URL to a local file
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Image saved to: ${filepath}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', reject);
  });
}

// Function to generate an image for a single haircut
async function generateHaircutImage(haircut) {
  try {
    const outputPath = path.join(outputDir, `${haircut.gender}-${haircut.id}.png`);
    
    // Skip if image already exists
    if (fs.existsSync(outputPath)) {
      console.log(`Image for ${haircut.name} already exists. Skipping.`);
      return true;
    }
    
    // Generate prompt
    const lengthTag = haircut.tags.find(tag => ["Short", "Medium", "Long"].includes(tag)) || "";
    const styleTag = haircut.tags.find(tag => ["Classic", "Modern"].includes(tag)) || "";
    
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
    
    // Check response
    if (!response.data || !response.data[0] || !response.data[0].url) {
      throw new Error('No image URL returned in API response');
    }
    
    // Download image
    console.log('Image generated, downloading...');
    await downloadImage(response.data[0].url, outputPath);
    console.log(`✅ Successfully generated image for ${haircut.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Error generating image for ${haircut.name}:`, error.message);
    return false;
  }
}

// Main function to run the script
async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const options = {
    male: !args.includes('--female-only'),
    female: !args.includes('--male-only'),
    limit: args.find(arg => arg.startsWith('--limit='))?.split('=')[1] || Infinity,
    singleId: args.find(arg => arg.startsWith('--id='))?.split('=')[1] || null
  };
  
  if (args.includes('--help')) {
    console.log(`
Usage: node generate-simple.mjs [options]

Options:
  --male-only     Generate only male haircut images
  --female-only   Generate only female haircut images
  --limit=n       Limit to generating n images
  --id=n          Generate image for a specific haircut ID
    `);
    return;
  }
  
  // Which haircuts to process?
  let haircuts = [];
  
  if (options.singleId) {
    // Single ID mode
    const id = parseInt(options.singleId);
    const haircut = [...maleHaircuts, ...femaleHaircuts].find(h => h.id === id);
    
    if (!haircut) {
      console.error(`Error: No haircut found with ID ${id}`);
      return;
    }
    
    haircuts.push(haircut);
  } else {
    // Multiple haircuts mode
    if (options.male) {
      haircuts = haircuts.concat(maleHaircuts);
    }
    
    if (options.female) {
      haircuts = haircuts.concat(femaleHaircuts);
    }
    
    // Apply limit
    if (options.limit !== Infinity) {
      haircuts = haircuts.slice(0, parseInt(options.limit));
    }
  }
  
  console.log(`Will generate images for ${haircuts.length} haircuts`);
  
  // Process haircuts
  let successCount = 0;
  let errorCount = 0;
  
  for (const haircut of haircuts) {
    try {
      const success = await generateHaircutImage(haircut);
      
      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
      
      // Wait a bit to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(`Unexpected error processing ${haircut.name}:`, error);
      errorCount++;
    }
  }
  
  // Print summary
  console.log("\n✨ Image Generation Complete ✨");
  console.log(`Total haircuts processed: ${haircuts.length}`);
  console.log(`Successfully generated: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

// Run the script
main().catch(error => {
  console.error("Script failed:", error);
  process.exit(1);
});