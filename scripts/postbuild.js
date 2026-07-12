import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const rootDir = path.resolve('.');

console.log('Running post-build script...');

// 1. Rename dist/index.source.html to dist/index.html
const sourceHtml = path.join(distDir, 'index.source.html');
const destHtml = path.join(distDir, 'index.html');
if (fs.existsSync(sourceHtml)) {
  fs.renameSync(sourceHtml, destHtml);
  console.log('Renamed dist/index.source.html to dist/index.html');
} else {
  console.warn('Warning: dist/index.source.html not found.');
}

// 2. Update sw.js with hashed assets before copying it
const swPath = path.join(distDir, 'sw.js');
const srcAssets = path.join(distDir, 'assets');
if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  
  // Find all files in assets directory
  let assetFiles = [];
  if (fs.existsSync(srcAssets)) {
    assetFiles = fs.readdirSync(srcAssets);
  }
  
  // Form the list of asset URLs for Service Worker caching (respecting subfolder base '/wiki/')
  const swAssetUrls = assetFiles.map(file => `"/wiki/assets/${file}"`);
  
  const searchStr = '["/wiki/","/wiki/index.html","/wiki/manifest.json","/wiki/icon.svg"]';
  if (swContent.includes(searchStr)) {
    const replacementStr = `["/wiki/","/wiki/index.html","/wiki/manifest.json","/wiki/icon.svg",${swAssetUrls.join(',')}]`;
    swContent = swContent.replace(searchStr, replacementStr);
    fs.writeFileSync(swPath, swContent, 'utf8');
    console.log('sw.js updated with hashed assets successfully!');
  } else {
    console.warn('Warning: Could not find ASSETS array in compiled sw.js');
  }
}

// 3. Clear existing assets in the root directory to avoid cluttering with old hashes
const destAssets = path.join(rootDir, 'assets');
if (fs.existsSync(destAssets)) {
  const oldAssets = fs.readdirSync(destAssets);
  for (const file of oldAssets) {
    fs.unlinkSync(path.join(destAssets, file));
  }
  console.log('Cleared old assets from root assets/ directory.');
} else {
  fs.mkdirSync(destAssets, { recursive: true });
}

// 4. Copy files from dist to root
const filesToCopy = [
  'index.html',
  'sw.js',
  'manifest.json',
  'favicon.ico',
  'icon.svg',
  'robots.txt',
  'sitemap.xml'
];

for (const file of filesToCopy) {
  const srcPath = path.join(distDir, file);
  const destPath = path.join(rootDir, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to root.`);
  }
}

// 5. Copy assets directory recursively
if (fs.existsSync(srcAssets)) {
  const assets = fs.readdirSync(srcAssets);
  for (const asset of assets) {
    fs.copyFileSync(path.join(srcAssets, asset), path.join(destAssets, asset));
    console.log(`Copied asset ${asset} to assets/.`);
  }
}

// 6. Patch hashed manifest JSON in root assets/ to fix icon paths
//    When manifest is served from /wiki/assets/, relative "icon.svg" resolves to /wiki/assets/icon.svg (404).
//    We rewrite to absolute /wiki/icon.svg so it always resolves correctly.
const rootAssetsDir = path.join(rootDir, 'assets');
if (fs.existsSync(rootAssetsDir)) {
  const assetFiles2 = fs.readdirSync(rootAssetsDir);
  for (const file of assetFiles2) {
    if (file.startsWith('manifest') && file.endsWith('.json')) {
      const manifestAssetPath = path.join(rootAssetsDir, file);
      try {
        const mContent = JSON.parse(fs.readFileSync(manifestAssetPath, 'utf8'));
        if (mContent.icons) {
          mContent.icons = mContent.icons.map(icon => ({
            ...icon,
            src: icon.src.replace(/^(?!\/|https?:\/\/)/, '/wiki/')
          }));
          fs.writeFileSync(manifestAssetPath, JSON.stringify(mContent, null, 2) + '\n', 'utf8');
          console.log(`Patched icon paths in hashed manifest: ${file}`);
        }
      } catch (e) {
        console.warn(`Warning: Could not patch manifest ${file}: ${e.message}`);
      }
    }
  }
}

console.log('Post-build script finished successfully!');
