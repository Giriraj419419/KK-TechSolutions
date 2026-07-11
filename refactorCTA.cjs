const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has EnterpriseCTA
  if (content.includes('<EnterpriseCTA')) continue;

  // We are looking for something like {/* ===== CTA BANNER ===== */} or {/* ===== 4. PROJECT CTA STRIP ===== */}
  // Followed by <section> ... </section>
  const ctaRegex = /\{\/\*\s*=====\s*(?:CTA BANNER|.*CTA STRIP)\s*=====\s*\*\/\}\s*<section[\s\S]*?<\/section>/i;
  
  const match = content.match(ctaRegex);
  if (match) {
    const ctaBlock = match[0];
    
    // Extract title (h2)
    const titleMatch = ctaBlock.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : "Ready to Transform Your Business?";
    // fix spaces/newlines
    title = title.replace(/\s+/g, ' ');

    // Extract description (p)
    const descMatch = ctaBlock.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    let description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : "Let's build something exceptional together. Reach out to our team of experts today.";
    description = description.replace(/\s+/g, ' ');

    // Extract links
    const linksMatches = [...ctaBlock.matchAll(/<Link[^>]*to="([^"]+)"[^>]*>([\s\S]*?)<\/Link>/g)];
    
    let primaryText = "Start a Project";
    let primaryLink = "/contact-us";
    let secondaryText = null;
    let secondaryLink = null;

    if (linksMatches.length > 0) {
      primaryLink = linksMatches[0][1];
      primaryText = linksMatches[0][2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      
      if (linksMatches.length > 1) {
        secondaryLink = linksMatches[1][1];
        secondaryText = linksMatches[1][2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      }
    }

    let ctaComponentStr = `      {/* ===== FLAGSHIP ENTERPRISE CTA ===== */}
      <EnterpriseCTA 
        title="${title}"
        description="${description}"
        primaryButtonText="${primaryText}"
        primaryButtonLink="${primaryLink}"`;
        
    if (secondaryText && secondaryLink) {
      ctaComponentStr += `
        secondaryButtonText="${secondaryText}"
        secondaryButtonLink="${secondaryLink}"`;
    }
    ctaComponentStr += `
      />`;

    content = content.replace(ctaRegex, ctaComponentStr);
    
    // Ensure import is there
    if (!content.includes('import EnterpriseCTA')) {
      // add import after the last import
      const lastImportIndex = content.lastIndexOf('import ');
      const endOfLastImport = content.indexOf(';', lastImportIndex) + 1;
      
      let importLine = `\nimport EnterpriseCTA from '../components/EnterpriseCTA';`;
      if (endOfLastImport === 0) {
        // Fallback if no semicolon
        content = `import EnterpriseCTA from '../components/EnterpriseCTA';\n` + content;
      } else {
        content = content.slice(0, endOfLastImport) + importLine + content.slice(endOfLastImport);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
