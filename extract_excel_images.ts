import fs from 'fs';
import unzipper from 'unzipper';

async function extractImages() {
  const directory = await unzipper.Open.file('data.xlsx');
  const mediaFiles = directory.files.filter(d => d.path.startsWith('xl/media/'));
  console.log(`Found ${mediaFiles.length} media files`);
  
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }
  
  for (const file of mediaFiles) {
    const content = await file.buffer();
    const fileName = file.path.split('/').pop();
    fs.writeFileSync(`public/images/${fileName}`, content);
  }
  console.log("Extracted all images to public/images/");
}
extractImages();
