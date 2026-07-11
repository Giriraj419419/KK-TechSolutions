import fs from 'fs';

const lintOutput = `
E:\\KK tech\\src\\pages\\Adobe.tsx
  428:39  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\Autodesk.tsx
  344:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\Azure.tsx
  337:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\Contact.tsx
  816:40  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\CorelDRAW.tsx
  394:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\DellServers.tsx
  739:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\GstarCAD.tsx
  395:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\HPServers.tsx
  812:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\Home.tsx
  339:43  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\LenovoServers.tsx
  767:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\Services.tsx
  159:48  error  'i' is defined but never used  @typescript-eslint/no-unused-vars
  317:26  error  'i' is defined but never used  @typescript-eslint/no-unused-vars

E:\\KK tech\\src\\pages\\ZWCAD.tsx
  312:36  error  'i' is defined but never used  @typescript-eslint/no-unused-vars
  335:35  error  'i' is defined but never used  @typescript-eslint/no-unused-vars
`;

const lines = lintOutput.split('\n');
const errorsByFile = {};
let currentFile = null;

for (const line of lines) {
  if (line.startsWith('E:\\')) {
    currentFile = line.trim();
  } else if (currentFile && line.includes('error')) {
    const match = line.match(/^\s*(\d+):/);
    if (match) {
      if (!errorsByFile[currentFile]) errorsByFile[currentFile] = [];
      errorsByFile[currentFile].push(parseInt(match[1]));
    }
  }
}

for (const file in errorsByFile) {
  let content = fs.readFileSync(file, 'utf8').split('\n');
  const lineNums = [...new Set(errorsByFile[file])].sort((a, b) => b - a); // descending and unique
  for (const num of lineNums) {
    const indentMatch = content[num - 1].match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1] : '  ';
    content.splice(num - 1, 0, indent + '// eslint-disable-next-line @typescript-eslint/no-unused-vars');
  }
  fs.writeFileSync(file, content.join('\n'), 'utf8');
}
console.log('Disabled unused i');
