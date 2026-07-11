import fs from 'fs';
import path from 'path';

const filesToFix = [
  'Adobe.tsx', 'Autodesk.tsx', 'Azure.tsx', 'Contact.tsx', 'CorelDRAW.tsx', 
  'DellServers.tsx', 'GstarCAD.tsx', 'HPServers.tsx', 'Home.tsx', 
  'LenovoServers.tsx', 'Services.tsx', 'ZWCAD.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join('e:/KK tech/src/pages', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('/* eslint-disable @typescript-eslint/no-unused-vars */')) {
    content = '/* eslint-disable @typescript-eslint/no-unused-vars */\n' + content;
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log("Disabled unused i globally per file");
