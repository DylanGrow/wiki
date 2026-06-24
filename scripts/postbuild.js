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

// 2. Copy files from dist to root
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

// 3. Copy assets directory recursively
const srcAssets = path.join(distDir, 'assets');
const destAssets = path.join(rootDir, 'assets');

if (fs.existsSync(srcAssets)) {
  if (!fs.existsSync(destAssets)) {
    fs.mkdirSync(destAssets, { recursive: true });
  }
  const assets = fs.readdirSync(srcAssets);
  for (const asset of assets) {
    fs.copyFileSync(path.join(srcAssets, asset), path.join(destAssets, asset));
    console.log(`Copied asset ${asset} to assets/.`);
  }
}

console.log('Post-build script finished successfully!');
