import fs from 'fs';
import unzipper from 'unzipper';

async function checkDrawings() {
  const directory = await unzipper.Open.file('data.xlsx');
  const drawingFiles = directory.files.filter(d => d.path.startsWith('xl/drawings/'));
  console.log(`Found ${drawingFiles.length} drawing files:`, drawingFiles.map(f => f.path));
  
  for (const file of drawingFiles) {
    const content = await file.buffer();
    fs.writeFileSync(file.path.split('/').pop(), content);
  }
  
  const relsFiles = directory.files.filter(d => d.path.startsWith('xl/drawings/_rels/'));
  for (const file of relsFiles) {
    const content = await file.buffer();
    fs.writeFileSync(file.path.split('/').pop(), content);
  }
}
checkDrawings();
