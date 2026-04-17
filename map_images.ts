import fs from 'fs';
import unzipper from 'unzipper';
import * as cheerio from 'cheerio';

async function mapImages() {
  const directory = await unzipper.Open.file('data.xlsx');
  
  const getXml = async (path) => {
    const file = directory.files.find(f => f.path === path);
    if (!file) return null;
    return (await file.buffer()).toString();
  };

  const sheet2Xml = await getXml('xl/worksheets/sheet2.xml');
  const metadataXml = await getXml('xl/metadata.xml');
  const rdrichvalueXml = await getXml('xl/richData/rdrichvalue.xml');
  const relsXml = await getXml('xl/richData/_rels/richValueRel.xml.rels');

  const vmToRv = {};
  const $meta = cheerio.load(metadataXml, { xmlMode: true });
  $meta('rc').each((i, el) => {
    vmToRv[i + 1] = $meta(el).attr('v'); 
  });
  console.log("vmToRv sample:", Object.entries(vmToRv).slice(0, 5));

  const rvToRId = {};
  const $rv = cheerio.load(rdrichvalueXml, { xmlMode: true });
  $rv('rv').each((i, el) => {
    const vTags = $rv(el).find('v');
    if (vTags.length > 0) {
      rvToRId[i] = $rv(vTags[0]).text();
    }
  });
  console.log("rvToRId sample:", Object.entries(rvToRId).slice(0, 5));

  const rIdToImage = {};
  const $rels = cheerio.load(relsXml, { xmlMode: true });
  $rels('Relationship').each((i, el) => {
    const id = $rels(el).attr('Id').replace('rId', '');
    const target = $rels(el).attr('Target');
    rIdToImage[id] = target.replace('../media/', '');
  });
  console.log("rIdToImage sample:", Object.entries(rIdToImage).slice(0, 5));

  const cellToImage = {};
  const $sheet = cheerio.load(sheet2Xml, { xmlMode: true });
  $sheet('c[r^="L"]').each((i, el) => {
    const r = $sheet(el).attr('r');
    const vm = $sheet(el).attr('vm');
    if (vm) {
      const rv = vmToRv[vm];
      if (rv !== undefined) {
        const relIdx = rvToRId[rv];
        // The relIdx in rdrichvalue is 0-based, but rId in rels is 1-based usually
        const image = rIdToImage[parseInt(relIdx) + 1] || rIdToImage[relIdx];
        if (image) {
          cellToImage[r] = image;
        }
      }
    }
  });
  
  console.log("cellToImage sample:", Object.entries(cellToImage).slice(0, 10));
  fs.writeFileSync('image_mapping.json', JSON.stringify(cellToImage, null, 2));
}
mapImages();
