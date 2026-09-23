import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function testAll() {
  const base = 'C:/Users/poyil/Downloads/drive-download-20260923T055411Z-1-001';
  const folders = [
    { name: 'cny_2018', dir: path.join(base, 'HPV Chinese New Year 2018 folder') },
    { name: 'rice_fest_2018', dir: path.join(base, 'HPV Rice Festival 2018 folder/Final HPV Rice Festival folder - Copy/Resize Final folder') },
    { name: 'cny_2020', dir: path.join(base, 'Processed Sel Feb 01 HPV New Year folder/Resize HPV  folder') },
    { name: 'hpv_dedication', dir: path.join(base, 'Sel Nov 2 HPV Dedication folder/Processed HPV folder/Resize folder') }
  ];

  for (const fld of folders) {
    const files = fs.readdirSync(fld.dir)
      .filter(f => /\.(jpe?g|png)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const items = [];
    for (const f of files) {
      const p = path.join(fld.dir, f);
      const m = await sharp(p).metadata();
      const s = m.exif ? m.exif.toString('binary') : '';
      const dateMatch = s.match(/\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}/);
      let t = 0;
      if (dateMatch) {
        const str = dateMatch[0];
        const iso = str.slice(0, 4) + '-' + str.slice(5, 7) + '-' + str.slice(8, 10) + 'T' + str.slice(11);
        t = new Date(iso).getTime();
      }
      const buf = await sharp(p).resize(16, 16, { fit: 'fill' }).grayscale().raw().toBuffer();
      items.push({ f, t, buf, p });
    }

    const parent = {};
    files.forEach(f => { parent[f] = f; });
    function find(x) {
      if (parent[x] === x) return x;
      return (parent[x] = find(parent[x]));
    }
    function union(x, y) {
      parent[find(x)] = find(y);
    }

    for (let i = 0; i < items.length - 1; i++) {
      const timeDiffSec = (items[i].t && items[i + 1].t) ? Math.abs(items[i + 1].t - items[i].t) / 1000 : 999;
      let diff = 0;
      for (let k = 0; k < 256; k++) {
        diff += Math.abs(items[i].buf[k] - items[i + 1].buf[k]);
      }
      const avgDiff = diff / 256;

      // Group if either:
      // (1) taken within 15 seconds AND reasonably similar (avgDiff < 45) -> burst shots of the same action/scene
      // (2) purely visual similarity is very high (avgDiff < 26)
      if ((timeDiffSec <= 15 && avgDiff < 45) || avgDiff < 26) {
        union(items[i].f, items[i + 1].f);
      }
    }

    const groups = {};
    files.forEach(f => {
      const r = find(f);
      if (!groups[r]) groups[r] = [];
      groups[r].push(f);
    });

    const dups = Object.values(groups).filter(g => g.length > 1);
    console.log(`\n${fld.name}: ${files.length} total files -> ${Object.keys(groups).length} distinct scenes (${dups.length} duplicate groups eliminated)`);
    for (const d of dups) {
      console.log(`  Duplicate burst of ${d.length}: ${d.join(', ')}`);
    }
  }
}

testAll().catch(console.error);
