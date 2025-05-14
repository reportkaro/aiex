/**
 * GIF to Video Converter Script
 * 
 * This script uses ffmpeg to convert GIF files to more efficient WebM and MP4 formats.
 * It keeps the original GIF file for fallback but generates optimized video versions.
 * 
 * To use:
 * 1. Make sure you have ffmpeg installed
 * 2. Run: node scripts/convert-gifs.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const sourceDir = './public/images/examples';
const minSizeForConversion = 500 * 1024; // 500KB - only convert GIFs larger than this

// Helper function to get file size in bytes
function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Create a function to convert a GIF to WebM and MP4
function convertGifToVideo(gifPath) {
  try {
    const baseName = path.basename(gifPath, '.gif');
    const dirName = path.dirname(gifPath);
    const webmOutput = path.join(dirName, `${baseName}.webm`);
    const mp4Output = path.join(dirName, `${baseName}.mp4`);
    
    // Check if files already exist
    if (fs.existsSync(webmOutput) && fs.existsSync(mp4Output)) {
      console.log(`🔄 Videos already exist for ${gifPath}, skipping...`);
      return;
    }
    
    console.log(`🎬 Converting ${gifPath} to WebM and MP4...`);
    
    // Convert to WebM (better compression but less compatibility)
    if (!fs.existsSync(webmOutput)) {
      execSync(`ffmpeg -i "${gifPath}" -c:v libvpx-vp9 -b:v 0 -crf 30 -pix_fmt yuva420p "${webmOutput}"`, { stdio: 'inherit' });
    }
    
    // Convert to MP4 (more compatible)
    if (!fs.existsSync(mp4Output)) {
      execSync(`ffmpeg -i "${gifPath}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart "${mp4Output}"`, { stdio: 'inherit' });
    }
    
    // Calculate size reduction
    const originalSize = getFileSizeInBytes(gifPath);
    const webmSize = getFileSizeInBytes(webmOutput);
    const mp4Size = getFileSizeInBytes(mp4Output);
    
    const webmReduction = ((originalSize - webmSize) / originalSize * 100).toFixed(2);
    const mp4Reduction = ((originalSize - mp4Size) / originalSize * 100).toFixed(2);
    
    console.log(`✅ Conversion complete! Size reductions: WebM: ${webmReduction}%, MP4: ${mp4Reduction}%`);
    
  } catch (error) {
    console.error(`❌ Error converting ${gifPath}:`, error.message);
  }
}

// Find and process all GIF files in the directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (path.extname(filePath).toLowerCase() === '.gif') {
      // Process GIF files
      const fileSize = getFileSizeInBytes(filePath);
      
      if (fileSize >= minSizeForConversion) {
        console.log(`📊 Found large GIF: ${filePath} (${Math.round(fileSize / 1024)}KB)`);
        convertGifToVideo(filePath);
      } else {
        console.log(`⏭️ Skipping small GIF: ${filePath} (${Math.round(fileSize / 1024)}KB)`);
      }
    }
  }
}

// Main execution
try {
  console.log('🚀 Starting GIF to Video conversion...');
  processDirectory(sourceDir);
  console.log('🎉 Conversion process complete!');
} catch (error) {
  console.error('❌ Error during conversion process:', error.message);
} 