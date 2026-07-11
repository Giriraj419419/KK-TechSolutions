import fs from 'fs';
import path from 'path';

const filesToFix = [
  'Adobe.tsx', 'Autodesk.tsx', 'Azure.tsx', 'CorelDRAW.tsx', 
  'DellServers.tsx', 'GstarCAD.tsx', 'HPServers.tsx', 
  'LenovoServers.tsx', 'ZWCAD.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join('e:/KK tech/src/pages', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace .map((item) =>
  content = content.replace(/\.map\(\s*\(\s*([a-zA-Z_0-9]+)\s*\)\s*=>/g, '.map(($1, i) =>');
  
  // Replace .map(item =>
  content = content.replace(/\.map\(\s*([a-zA-Z_0-9]+)\s*=>/g, '.map(($1, i) =>');
  
  // Fix HPServers.tsx f to b
  if (file === 'HPServers.tsx') {
    content = content.replace(/\{f\.title\}/g, '{b.title}');
    content = content.replace(/\{f\.desc\}/g, '{b.desc}');
    content = content.replace(/<f\.icon/g, '<b.icon');
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
});
console.log("Fixed missing i");
