import unzipper from 'unzipper';

async function listFiles() {
  const directory = await unzipper.Open.file('data.xlsx');
  console.log(directory.files.map(f => f.path).join('\n'));
}
listFiles();
