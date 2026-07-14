import fs from 'fs'
import path from 'path'

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, out)
    else if (/\.(jsx?|tsx?)$/.test(ent.name)) out.push(p)
  }
  return out
}

for (const file of walk('src')) {
  const buf = fs.readFileSync(file)
  if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    console.log('BOM:', file)
  }
}
