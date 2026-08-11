import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directory = 'public/digitized-photos';

async function optimizeImages() {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    if (file.match(/\.(jpeg|jpg|png)$/i)) {
      const inputPath = path.join(directory, file);
      const outputFilename = file.replace(/\.(jpeg|jpg|png)$/i, '.webp');
      const outputPath = path.join(directory, outputFilename);
      
      console.log(`Processing ${file}...`);
      
      try {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true }) // Scale down huge images
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Successfully optimized to ${outputFilename}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

optimizeImages();
