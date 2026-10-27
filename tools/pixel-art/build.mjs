import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Canvas } from './canvas.mjs';
import { encodePng } from './png.mjs';
import * as airblued from './scenes/airblued.mjs';
import * as mem from './scenes/mem.mjs';
import * as yourNextBinge from './scenes/your-next-binge.mjs';

const SCENES = { 'your-next-binge': yourNextBinge, mem, airblued };
const SCALES = [2, 3];

const outDir = fileURLToPath(new URL('../../public/art/', import.meta.url));
mkdirSync(outDir, { recursive: true });

for (const [name, scene] of Object.entries(SCENES)) {
  const frames = scene.FRAMES ?? 1;
  for (const scale of SCALES) {
    const sheet = new Canvas(scene.WIDTH * frames * scale, scene.HEIGHT * scale);
    for (let frame = 0; frame < frames; frame += 1) {
      sheet.blit(scene.drawFrame(frame).scaled(scale), frame * scene.WIDTH * scale, 0);
    }
    const suffix = frames > 1 ? 'sheet' : 'frame';
    const file = `${outDir}${name}-${suffix}-${scale}x.png`;
    writeFileSync(file, encodePng(sheet.width, sheet.height, sheet.data));
    console.log(`${name}-${suffix}-${scale}x.png  ${sheet.width}x${sheet.height}  ${frames} frame(s)`);
  }
}
