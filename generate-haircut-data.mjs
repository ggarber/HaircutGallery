/**
 * This script creates sample SVG images for haircuts to use in our application.
 * It will write the data to our public directory so that we can use it for testing.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the haircuts data directory if it doesn't exist
const outputDir = path.join(__dirname, 'public/images/haircuts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

// Male haircuts data
const maleHaircuts = [
  {
    id: 1,
    name: "Undercut",
    tags: ["Modern", "Short"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 2,
    name: "Crew Cut",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 3,
    name: "Fade",
    tags: ["Modern", "Short"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 4,
    name: "Pompadour",
    tags: ["Classic", "Medium"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 5,
    name: "Side Part",
    tags: ["Classic", "Medium"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 6,
    name: "Buzz Cut",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 7,
    name: "Quiff",
    tags: ["Modern", "Medium"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 8,
    name: "Slicked Back",
    tags: ["Classic", "Medium"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 9,
    name: "Textured Crop",
    tags: ["Modern", "Short"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 10,
    name: "Faux Hawk",
    tags: ["Modern", "Medium"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 11,
    name: "Comb Over",
    tags: ["Classic", "Medium"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 12,
    name: "French Crop",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 13,
    name: "Taper Cut",
    tags: ["Classic", "Medium"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 14,
    name: "Ivy League",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 15,
    name: "Messy Textured",
    tags: ["Modern", "Medium"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 16,
    name: "Bro Flow",
    tags: ["Modern", "Medium"],
    imageIndex: 3,
    gender: "male"
  },
  {
    id: 17,
    name: "High and Tight",
    tags: ["Classic", "Short"],
    imageIndex: 0,
    gender: "male"
  },
  {
    id: 18,
    name: "Regulation Cut",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "male"
  },
  {
    id: 19,
    name: "Man Bun",
    tags: ["Modern", "Long"],
    imageIndex: 2,
    gender: "male"
  },
  {
    id: 20,
    name: "Hard Part",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "male"
  }
];

// Female haircuts data
const femaleHaircuts = [
  {
    id: 21,
    name: "Bob",
    tags: ["Classic", "Short"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 22,
    name: "Layered Cut",
    tags: ["Classic", "Long"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 23,
    name: "Pixie Cut",
    tags: ["Modern", "Short"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 24,
    name: "Lob (Long Bob)",
    tags: ["Modern", "Medium"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 25,
    name: "Bangs",
    tags: ["Classic", "Medium"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 26,
    name: "Shag Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 27,
    name: "Beach Waves",
    tags: ["Modern", "Long"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 28,
    name: "Blunt Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 29,
    name: "Asymmetrical Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 30,
    name: "Feathered Layers",
    tags: ["Classic", "Medium"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 31,
    name: "Curtain Bangs",
    tags: ["Modern", "Medium"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 32,
    name: "Undercut (Female)",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 33,
    name: "French Bob",
    tags: ["Classic", "Short"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 34,
    name: "Wolf Cut",
    tags: ["Modern", "Medium"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 35,
    name: "Hime Cut",
    tags: ["Classic", "Long"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 36,
    name: "Rachel Cut",
    tags: ["Classic", "Medium"],
    imageIndex: 3,
    gender: "female"
  },
  {
    id: 37,
    name: "Butterfly Cut",
    tags: ["Modern", "Long"],
    imageIndex: 0,
    gender: "female"
  },
  {
    id: 38,
    name: "Chin-Length Bob",
    tags: ["Classic", "Short"],
    imageIndex: 1,
    gender: "female"
  },
  {
    id: 39,
    name: "A-Line Bob",
    tags: ["Modern", "Short"],
    imageIndex: 2,
    gender: "female"
  },
  {
    id: 40,
    name: "Bixie Cut",
    tags: ["Modern", "Short"],
    imageIndex: 3,
    gender: "female"
  }
];

// Write a metadata file with all haircuts information
const metadataPath = path.join(outputDir, 'haircuts-metadata.json');
const metadata = {};

// Generate metadata entries for each haircut
[...maleHaircuts, ...femaleHaircuts].forEach(haircut => {
  metadata[`${haircut.gender}-${haircut.id}`] = {
    id: haircut.id,
    name: haircut.name,
    gender: haircut.gender,
    tags: haircut.tags,
    filename: `${haircut.gender}-${haircut.id}.png`, // Placeholder filename
    generatedAt: new Date().toISOString()
  };
});

// Write metadata to file
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
console.log(`Metadata saved to: ${metadataPath}`);

// Create SVG images for each haircut
[...maleHaircuts, ...femaleHaircuts].forEach(haircut => {
  const imagePath = path.join(outputDir, `${haircut.gender}-${haircut.id}.png`);
  
  // Only create if it doesn't exist
  if (!fs.existsSync(imagePath)) {
    // Create SVG content for the haircut
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <rect width="1024" height="1024" fill="${haircut.gender === 'male' ? '#e6f2ff' : '#fff0f5'}"/>
      <rect x="262" y="162" width="500" height="700" fill="${haircut.gender === 'male' ? '#d1e6ff' : '#ffe6f2'}"/>
      <circle cx="512" cy="350" r="150" fill="${haircut.gender === 'male' ? '#b3d1ff' : '#ffcceb'}"/>
      <rect x="437" y="500" width="150" height="250" fill="${haircut.gender === 'male' ? '#b3d1ff' : '#ffcceb'}"/>
      <text x="512" y="810" font-family="Arial" font-size="48" text-anchor="middle" fill="#333333" font-weight="bold">${haircut.name}</text>
      <text x="512" y="870" font-family="Arial" font-size="32" text-anchor="middle" fill="#666666">${haircut.gender}, ${haircut.tags.join(', ')}</text>
    </svg>`;
    
    // Write SVG to file
    fs.writeFileSync(imagePath, svgContent);
    console.log(`Created image for: ${haircut.name} (${haircut.gender})`);
  } else {
    console.log(`Image for ${haircut.name} already exists, skipping.`);
  }
});

console.log('\n✨ All images have been generated!');
console.log(`You can find them in: ${outputDir}`);