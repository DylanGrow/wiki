const fs = require('fs');
let text = fs.readFileSync('src/main.ts', 'utf8');
if (text.includes('import { Backup, saveBackup }')) {
  text = text.replace(/import \{ Backup, saveBackup \} from '\.\/db\.js';\n/, '');
  text = "import { Backup, saveBackup } from './db.ts';\n" + text;
}
fs.writeFileSync('src/main.ts', text);
console.log('main updated');
