import fs from 'fs';
import path from 'path';

const pagesPath = 'e:/KK tech/src/pages';
const files = fs.readdirSync(pagesPath);

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const filePath = path.join(pagesPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/onClick=\{\(,\s*i\)\s*=>/g, 'onClick={() =>');
  
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log("Fix applied!");
