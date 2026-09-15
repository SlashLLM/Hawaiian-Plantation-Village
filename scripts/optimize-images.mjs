/**
 * Builds web copies of the digitized photographs:
 *   public/digitized-photos/IMG_x.webp         1920px, detail pages
 *   public/digitized-photos/thumbs/IMG_x.webp  800px, grid cards
 *
 * Run: npm run images:optimize
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directory = 'public/digitized-photos';
const thumbsDirectory = path.join(directory, 'thumbs');

const VARIANTS = [
  { dir: directory, width: 1920, quality: 80 },
  { dir: thumbsDirectory, width: 800, quality: 72 },
];

const isFresh = (outputPath, inputPath) =>
  fs.existsSync(outputPath) && fs.statSync(outputPath).mtimeMs >= fs.statSync(inputPath).mtimeMs;

async function optimizeImages() {
  fs.mkdirSync(thumbsDirectory, { recursive: true });
  const files = fs.readdirSync(directory).filter((file) => /\.(jpeg|jpg|png)$/i.test(file));

  for (const file of files) {
    const inputPath = path.join(directory, file);
    const outputFilename = file.replace(/\.(jpeg|jpg|png)$/i, '.webp');

    for (const { dir, width, quality } of VARIANTS) {
      const outputPath = path.join(dir, outputFilename);
      if (isFresh(outputPath, inputPath)) continue;

      try {
        await sharp(inputPath)
          .rotate() // honour EXIF orientation before metadata is stripped
          .resize({ width, withoutEnlargement: true })
          .webp({ quality })
          .toFile(outputPath);
        console.log(`Wrote ${outputPath}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

optimizeImages();
