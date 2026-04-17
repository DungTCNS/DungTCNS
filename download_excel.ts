import fs from 'fs';

async function downloadExcel() {
  const res = await fetch("https://docs.google.com/spreadsheets/d/1dGz4GEU1TZp8lmJ6M7o8AL7KJxwWyk9t/export?format=xlsx");
  const buffer = await res.arrayBuffer();
  fs.writeFileSync('data.xlsx', Buffer.from(buffer));
  console.log("Saved data.xlsx, size:", buffer.byteLength);
}
downloadExcel();
