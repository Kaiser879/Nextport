import { Canvas, hex } from '../canvas.mjs';

export const WIDTH = 192;
export const HEIGHT = 108;
export const FRAMES = 16;

const panel = hex('#122624');
const screen = hex('#0c1817');
const wire = hex('#4a6b64');
const teal = hex('#6f9a92');
const dim = hex('#8ba49c');
const ochre = hex('#c9974f');
const ochreLit = hex('#e8b46c');
const dotDim = hex('#35564f');
const tileA = hex('#2a4a45');
const tileB = hex('#3c5f57');

// The catalogue projected into embedding space: clusters are things that mean similar things.
const SPACE = [
  // cluster: titles with the same mood
  [122, 30, 2], [127, 34, 2], [131, 29, 3], [124, 38, 2], [130, 41, 2], [135, 36, 2], [121, 44, 2],
  // cluster: same genre, different era
  [126, 62, 2], [131, 67, 3], [137, 63, 2], [128, 72, 2], [134, 74, 2], [140, 69, 2],
  // cluster: the match region
  [162, 44, 3], [168, 41, 2], [172, 47, 2], [165, 52, 2], [170, 56, 2], [175, 52, 2], [163, 60, 2],
  // strays
  [146, 26, 2], [178, 70, 2], [120, 82, 2],
];
const NEIGHBOURS = [[162, 44], [163, 60], [170, 56]];
const QUERY = [152, 52];

/** A query is embedded, dropped into the vector space, and its nearest neighbours come back. */
export function drawFrame(frame) {
  const canvas = new Canvas(WIDTH, HEIGHT);

  const embedding = frame >= 6 && frame <= 9;
  const queryLanded = frame >= 12;
  const ranked = frame >= 15;
  const result = frame >= 14;

  // --- the TV
  canvas.rect(10, 28, 56, 48, panel);
  canvas.frame(10, 28, 56, 48, wire, 2);
  canvas.rect(14, 32, 48, 34, screen);
  canvas.frame(14, 32, 48, 34, hex('#2c4a45'), 1);
  canvas.rect(34, 76, 8, 5, wire);
  canvas.rect(24, 81, 28, 2, wire);

  canvas.rect(17, 35, 28, 5, hex('#1d3a36'));
  canvas.rect(48, 36, 3, 3, dim);

  canvas.rect(18, 44, 12, 20, tileA);
  canvas.rect(32, 44, 12, 20, tileB);
  canvas.rect(46, 44, 12, 20, tileA);
  if (result) canvas.frame(32, 44, 12, 20, ochreLit, 1);

  // --- links
  canvas.rect(66, 53, 12, 2, wire);
  canvas.rect(106, 53, 12, 2, wire);

  // --- embedding model: a small three-layer net
  canvas.rect(78, 40, 28, 28, panel);
  canvas.frame(78, 40, 28, 28, embedding ? teal : wire, 2);
  const layerOne = [[84, 48], [84, 60]];
  const layerTwo = [[92, 44], [92, 54], [92, 64]];
  const layerThree = [[100, 48], [100, 60]];
  const mesh = hex('#33514b');
  layerOne.forEach(([ax, ay]) => layerTwo.forEach(([bx, by]) => canvas.line(ax, ay, bx, by, mesh, 1)));
  layerTwo.forEach(([ax, ay]) => layerThree.forEach(([bx, by]) => canvas.line(ax, ay, bx, by, mesh, 1)));
  const nodeColor = embedding ? teal : dim;
  [...layerOne, ...layerTwo, ...layerThree].forEach(([x, y]) => canvas.rect(x - 1, y - 1, 2, 2, nodeColor));

  // --- vector space
  canvas.rect(116, 22, 1, 6, wire);
  canvas.rect(116, 22, 6, 1, wire);
  canvas.rect(181, 22, 1, 6, wire);
  canvas.rect(176, 22, 6, 1, wire);
  canvas.rect(116, 80, 1, 6, wire);
  canvas.rect(116, 85, 6, 1, wire);
  canvas.rect(181, 80, 1, 6, wire);
  canvas.rect(176, 85, 6, 1, wire);

  SPACE.forEach(([x, y, size]) => canvas.rect(x, y, size, size, size > 2 ? teal : dotDim));

  if (queryLanded) {
    const visible = Math.min(3, frame - 11);
    NEIGHBOURS.slice(0, visible).forEach(([x, y], index) => {
      const isTop = ranked && index === 0;
      canvas.line(QUERY[0] + 2, QUERY[1] + 2, x + 1, y + 1, isTop ? ochre : wire, 1);
      canvas.rect(x, y, 2, 2, isTop ? ochreLit : teal);
    });
    canvas.rect(QUERY[0], QUERY[1], 4, 4, ochre);
  }

  // --- packets: the query, then the embedding vector it becomes
  if (frame >= 2 && frame <= 5) canvas.rect(68 + (frame - 2) * 3, 52, 4, 4, ochre);
  if (frame >= 10 && frame <= 11) {
    const x = 107 + (frame - 10) * 4;
    canvas.rect(x, 50, 2, 8, ochre);
    canvas.rect(x + 3, 47, 2, 11, ochre);
    canvas.rect(x + 6, 52, 2, 6, ochre);
  }

  return canvas;
}
