const fs = require('fs');
const https = require('https');

const dataPath = 'c:/Users/LENOVO/Desktop/pujorpothe/src/lib/data.ts';

https.get('https://www.durgapujakolkata.in/api/pandals', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      const fetchedPandals = data.pandals || [];
      
      let dataTs = fs.readFileSync(dataPath, 'utf8');
      let matchCount = 0;
      
      const pandalRegex = /name:\s*["']([^"']+)["'],[\s\S]*?description:\s*["']([^"']+)["']/g;
      
      let newTs = dataTs;
      let match;
      
      const toSearchName = (n) => n.toLowerCase().replace(/[^a-z0-9]/g, '');

      while ((match = pandalRegex.exec(dataTs)) !== null) {
        const fullMatch = match[0];
        const pName = match[1];
        const currentDesc = match[2];
        
        const sName = toSearchName(pName);
        const bestMatch = fetchedPandals.find(fp => toSearchName(fp.paraName).includes(sName) || sName.includes(toSearchName(fp.paraName)));
        
        if (bestMatch && bestMatch.themeDescription) {
          // DO NOT slice it!
          const safeDesc = bestMatch.themeDescription.replace(/['"]/g, '').replace(/(\r\n|\n|\r)/gm, " ").trim();
          const newBlock = fullMatch.replace(`description: '${currentDesc}'`, `description: '${safeDesc}'`).replace(`description: "${currentDesc}"`, `description: "${safeDesc}"`);
          
          if (newBlock !== fullMatch) {
             newTs = newTs.replace(fullMatch, newBlock);
             matchCount++;
          }
        }
      }
      
      fs.writeFileSync(dataPath, newTs);
      console.log(`Successfully updated ${matchCount} descriptions!`);
      
    } catch (e) {
      console.error(e);
    }
  });
});
