const fs = require('fs');
let text = fs.readFileSync('src/main.ts', 'utf8');

text = text.replace(/import \{ Backup, saveBackup \} from '\.\/db\.ts';\n/, "import { saveBackup } from './db.ts';\n");
text = text.replace(/const data = await getWikiPagesList\(\); \/\/ mock snapshot/, "const data = wikiPagesList; // mock snapshot");
text = text.replace(/window\.renderKnowledgeGraph =/g, "(window as any).renderKnowledgeGraph =");
text = text.replace(/const ctx = canvas\.getContext\('2'\);/g, "const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;");
text = text.replace(/if \(!main\.includes\('setupBackgroundBackups'\)\) \{/, '');

fs.writeFileSync('src/main.ts', text);
console.log('main.ts fixed');
