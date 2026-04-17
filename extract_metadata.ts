import fs from 'fs';
import unzipper from 'unzipper';

async function extractMetadata() {
  const directory = await unzipper.Open.file('data.xlsx');
  const file = directory.files.find(f => f.path === 'xl/metadata.xml');
  if (file) {
    const content = await file.buffer();
    console.log(content.toString().substring(0, 500));
  }
}
extractMetadata();
