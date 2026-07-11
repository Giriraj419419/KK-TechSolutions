import fs from 'fs';
import path from 'path';

const pagesPath = 'e:/KK tech/src/pages';
const files = fs.readdirSync(pagesPath);

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const filePath = path.join(pagesPath, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Revert .map((item) => back to .map((item, i) =>
  content = content.replace(/\.map\(\(([^,]+)\)\s*=>/g, '.map(($1, i) =>');
  
  fs.writeFileSync(filePath, content, 'utf8');
});

// Fix Section.tsx unexpected any
const sectionPath = 'e:/KK tech/src/components/Section.tsx';
if (fs.existsSync(sectionPath)) {
  let sContent = fs.readFileSync(sectionPath, 'utf8');
  sContent = sContent.replace(/const getVariants = \(\): any => \{/g, '// eslint-disable-next-line @typescript-eslint/no-explicit-any\n  const getVariants = (): any => {');
  fs.writeFileSync(sectionPath, sContent, 'utf8');
}

// Fix TechConstellation.tsx unused isHovered
const techPath = 'e:/KK tech/src/components/TechConstellation.tsx';
if (fs.existsSync(techPath)) {
  let tContent = fs.readFileSync(techPath, 'utf8');
  tContent = tContent.replace(/const isHovered = hoveredId === partner\.id;/g, '');
  fs.writeFileSync(techPath, tContent, 'utf8');
}

console.log("Revert applied!");
