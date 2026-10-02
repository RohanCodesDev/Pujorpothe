const fs = require('fs');

const dataTsPath = 'c:/Users/LENOVO/Desktop/pujorpothe/src/lib/data.ts';
const metroTsPath = 'c:/Users/LENOVO/Desktop/pujorpothe/src/app/metro/page.tsx';

const metroContent = fs.readFileSync(metroTsPath, 'utf8');

// Quick regex to extract stops and pandals
const stopsRegex = /{ stop: "([^"]+)", pandals: \[([^\]]+)\] }/g;
let match;

const allNewPandals = [];
const existingPandals = new Set([
  'deshapriya-park', 'tridhara', 'mudiali', 'college-square', 'bagbazar', 'chetla-agrani', 'suruchi-sangha', 'salt-lake-fd', 'new-town-eco'
]);

// Base coords for Kolkata center to add slight variations
const kolkataLat = 22.5726;
const kolkataLng = 88.3639;

let count = 0;

while ((match = stopsRegex.exec(metroContent)) !== null) {
  const stopName = match[1];
  const pandalsStr = match[2];
  
  // Extract individual pandal strings
  const pandalNames = pandalsStr.match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) || [];
  
  for (const pName of pandalNames) {
    const id = pName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (existingPandals.has(id)) continue;
    existingPandals.add(id);
    
    // Slight random offset for clustering around a virtual stop
    const lat = kolkataLat + (Math.random() - 0.5) * 0.1;
    const lng = kolkataLng + (Math.random() - 0.5) * 0.1;
    
    const isNorth = ['Shyambazar', 'Sovabazar Sutanuti', 'Girish Park', 'Belgachia', 'Dum Dum', 'Baranagar'].includes(stopName);
    const isSouth = ['Kalighat', 'Rabindra Sarobar', 'Mahanayak Uttam Kumar', 'Kavi Subhash', 'Netaji Bhawan', 'Jatin Das Park'].includes(stopName);
    const region = isNorth ? 'north-kolkata' : isSouth ? 'south-kolkata' : 'central-kolkata';
    
    const obj = `  {
    id: '${id}',
    name: '${pName}',
    bengaliName: '${pName} পুজো',
    region: '${region}',
    style: ['Traditional', 'Artistic'],
    crowd: 'moderate',
    lat: ${lat.toFixed(4)},
    lng: ${lng.toFixed(4)},
    description: 'A vibrant Durga Puja celebration near ${stopName} Metro station, known for its deep community roots and festive spirit.',
    theme: 'Community celebration',
    history: 'A beloved local puja that draws crowds from across the ${region.replace('-', ' ')} area.',
    timings: 'Open 24 hours during Puja.',
    crowdInfo: 'Moderate crowd expected.',
    experience: ['Family-friendly'],
    imageKey: '${region.replace('-', '_')}',
  }`;
    
    allNewPandals.push(obj);
    count++;
  }
}

// Append to data.ts
if (allNewPandals.length > 0) {
  let dataContent = fs.readFileSync(dataTsPath, 'utf8');
  
  // Insert right before `];` of the pandals array
  const insertionPoint = dataContent.indexOf('];', dataContent.indexOf('export const pandals: Pandal[] = ['));
  
  if (insertionPoint !== -1) {
    const newPandalsStr = ',\n' + allNewPandals.join(',\n') + '\n';
    dataContent = dataContent.slice(0, insertionPoint) + newPandalsStr + dataContent.slice(insertionPoint);
    fs.writeFileSync(dataTsPath, dataContent);
    console.log(`Successfully added ${count} new pandals to data.ts`);
  } else {
    console.log('Could not find insertion point in data.ts');
  }
} else {
  console.log('No new pandals to add.');
}
