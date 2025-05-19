import { Express, Request, Response } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Initialize OpenAI with API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define public directory for saving images
const publicImagesDir = path.join(process.cwd(), 'public/images/haircuts');

// Ensure the directory exists
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Function to generate a prompt for haircut image
function generatePrompt(name: string, gender: string, tags: string[]): string {
  const lengthTag = tags.find(tag => ["Short", "Medium", "Long"].includes(tag)) || "";
  const styleTag = tags.find(tag => ["Classic", "Modern"].includes(tag)) || "";
  
  return `A professional, realistic photo of a ${gender} model with a ${lengthTag.toLowerCase()} ${name} hairstyle. ${styleTag} style. Clear focus on the hair, fashion photoshoot quality, neutral studio background, photorealistic.`;
}

// Function to download an image from a URL
async function downloadImage(url: string, filepath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error("Error downloading image:", error);
    return false;
  }
}

// Register OpenAI routes
export function registerOpenAIRoutes(app: Express) {
  // Route to generate a haircut image
  app.post('/api/generate-haircut-image', async (req: Request, res: Response) => {
    try {
      const { id, name, gender, tags } = req.body;
      
      if (!id || !name || !gender || !tags) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Generate prompt
      const prompt = generatePrompt(name, gender, tags);
      console.log(`Generating image for: ${name} (${gender})`);
      console.log(`Prompt: ${prompt}`);
      
      // Call OpenAI API to generate image
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });
      
      if (!response.data || response.data.length === 0 || !response.data[0].url) {
        return res.status(500).json({ error: 'Failed to generate image' });
      }
      
      const imageUrl = response.data[0].url;
      
      // Save image to disk
      const filename = `${gender}-${id}.png`;
      const filepath = path.join(publicImagesDir, filename);
      
      const success = await downloadImage(imageUrl, filepath);
      
      if (!success) {
        return res.status(500).json({ error: 'Failed to save image' });
      }
      
      // Update metadata
      updateImageMetadata(id, name, gender, filename);
      
      // Return the path to the saved image
      return res.json({ 
        success: true, 
        imageUrl: `/images/haircuts/${filename}`,
        originalUrl: imageUrl
      });
      
    } catch (error: any) {
      console.error('Error generating image:', error);
      return res.status(500).json({ 
        error: 'Failed to generate image', 
        message: error.message 
      });
    }
  });
  
  // Route to get generated images metadata
  app.get('/api/haircut-images', (req: Request, res: Response) => {
    try {
      const metadata = getImagesMetadata();
      res.json(metadata);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

// Helper to update image metadata
function updateImageMetadata(id: number, name: string, gender: string, filename: string) {
  const metadataPath = path.join(process.cwd(), 'public/images/generated-images.json');
  let metadata: Record<string, any> = {};
  
  if (fs.existsSync(metadataPath)) {
    const data = fs.readFileSync(metadataPath, 'utf8');
    try {
      metadata = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing metadata file, creating new one');
    }
  }
  
  metadata[`${gender}-${id}`] = {
    id,
    name,
    gender,
    filename,
    generatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
}

// Helper to get images metadata
function getImagesMetadata(): Record<string, any> {
  const metadataPath = path.join(process.cwd(), 'public/images/generated-images.json');
  
  if (fs.existsSync(metadataPath)) {
    const data = fs.readFileSync(metadataPath, 'utf8');
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing metadata file');
      return {};
    }
  }
  
  return {};
}