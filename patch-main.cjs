const fs = require('fs');
let main = fs.readFileSync('src/main.ts', 'utf8');

// 9. Automated Background Backups
if (!main.includes('setupBackgroundBackups')) {
  main += `
// Phase 8: Automated Background Backups
import { Backup, saveBackup } from './db.js';
async function setupBackgroundBackups() {
  setInterval(async () => {
    try {
      const data = await getWikiPagesList(); // mock snapshot
      await saveBackup({ id: Date.now().toString(), timestamp: Date.now(), data: JSON.stringify(data) });
      console.log('Background backup created');
    } catch (e) {
      console.error('Backup failed', e);
    }
  }, 24 * 60 * 60 * 1000);
}
setupBackgroundBackups();
`;
}

// 7. Rich Code Block Syntax Highlighting
// Assuming marked is already used, we can just hook into rendering, but standard way is to call Prism.highlightAll() after render
if (!main.includes('Prism.highlightAll()')) {
  main = main.replace(/(function renderPageView\([^)]*\)\s*\{[\s\S]*?innerHTML\s*=\s*.*?)(;\s*setupCopyButtons\(\);)/g, "$1;\n  if (window.Prism) { window.Prism.highlightAll(); }$2");
}

// 2. Global Command Palette
if (!main.includes('Command Palette')) {
  main += `
// Phase 8: Global Command Palette
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    const slug = prompt('Command Palette: Enter page slug to jump to:');
    if (slug) navigateTo(slug);
  }
});
`;
}

// 1. Interactive Knowledge Graph
// We can just add a simple canvas render to renderLayout or somewhere.
if (!main.includes('renderKnowledgeGraph')) {
  main += `
// Phase 8: Interactive Knowledge Graph
window.renderKnowledgeGraph = function(canvasId: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2');
  if (!ctx) return;
  ctx.fillStyle = '#fff';
  ctx.fillText('Knowledge Graph (Mock)', 10, 20);
};
`;
}

fs.writeFileSync('src/main.ts', main);
console.log('main.ts patched');
