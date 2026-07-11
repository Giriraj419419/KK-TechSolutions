import fs from 'fs';
import path from 'path';

const pagesPath = 'e:/KK tech/src/pages';
const files = fs.readdirSync(pagesPath);

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const filePath = path.join(pagesPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace .map((item, i) => with .map((item) =>
  content = content.replace(/\.map\(\(([^,]+),\s*i\)\s*=>/g, '.map(($1) =>');
  
  // Fix specific unused variables
  content = content.replace(/const benefits = \[[^\]]+\];\s*/g, '');
  content = content.replace(/const awsServices = \[[^\]]+\];\s*/g, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
});

// Fix ZWCAD unused imports
const zwcadPath = 'e:/KK tech/src/pages/ZWCAD.tsx';
if (fs.existsSync(zwcadPath)) {
  let zContent = fs.readFileSync(zwcadPath, 'utf8');
  zContent = zContent.replace(/Component, FileText, AppWindow, /g, 'AppWindow, ');
  zContent = zContent.replace(/Code, FastForward, Repeat,/g, 'Code, Repeat,');
  zContent = zContent.replace(/MonitorCheck, Globe, Clock, HeadphonesIcon/g, '');
  fs.writeFileSync(zwcadPath, zContent, 'utf8');
}

console.log("Fixes applied!");
