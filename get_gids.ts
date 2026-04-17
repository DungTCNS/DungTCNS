import fs from 'fs';

async function fetchCsv() {
  const res = await fetch("https://docs.google.com/spreadsheets/d/1dGz4GEU1TZp8lmJ6M7o8AL7KJxwWyk9t/export?format=csv&gid=1880543396");
  const text = await res.text();
  fs.writeFileSync('dulieudauvao.csv', text);
  console.log("Saved dulieudauvao.csv");
}
fetchCsv();
