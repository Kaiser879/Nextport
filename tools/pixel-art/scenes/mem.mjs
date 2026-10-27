import { Canvas, hex } from '../canvas.mjs';

export const WIDTH = 192;
export const HEIGHT = 108;
export const FRAMES = 12;
const REST_FRAMES = 4;

const ink = hex('#0a0f0e');
const paper = hex('#eae7db');
const paperDim = hex('#c9c5b7');
const slate = hex('#3b514c');
const graphite = hex('#6d6a60');
const ochre = hex('#b57f3d');
const ochreLit = hex('#e3a961');
const beam = hex('#b6cac3');
const shadow = hex('#000000', 120);

const SHEET_X = 38;
const SHEET_Y = 16;
const SHEET_W = 112;
const SHEET_H = 86;

/** Indexing a page: a scan beam sweeps the text, the match line lights up, a caret blinks. */
export function drawFrame(frame) {
  const canvas = new Canvas(WIDTH, HEIGHT);

  const sheet = (x, y, width, height, fill) => {
    canvas.rect(x + 4, y + 5, width, height, shadow);
    canvas.rect(x, y, width, height, fill);
    canvas.frame(x, y, width, height, ink, 2);
  };

  sheet(SHEET_X + 22, SHEET_Y - 14, SHEET_W, SHEET_H, slate);
  sheet(SHEET_X + 11, SHEET_Y - 7, SHEET_W, SHEET_H, paperDim);
  sheet(SHEET_X, SHEET_Y, SHEET_W, SHEET_H, paper);

  // Title block, then body lines. The fourth line is the match.
  const lines = [78, 56, 88, 48, 68, 82, 40];
  const lineY = [42, 50, 58, 66, 74, 82, 90];
  const sweeping = frame >= REST_FRAMES;
  const beamY = 20 + (frame - REST_FRAMES) * 10;
  const matchLit = sweeping && Math.abs(beamY + 3 - 66) < 10;

  // Scan beam sits under the type, so the line it crosses stays legible.
  if (sweeping) {
    const beamTop = Math.max(20, Math.min(beamY, 92));
    canvas.rect(44, beamTop, 100, 7, beam);
    canvas.rect(44, beamTop + 6, 100, 1, hex('#8fb3a9'));
  }

  canvas.rect(46, 24, 52, 8, ink);
  lines.forEach((width, index) => {
    const isMatch = index === 3;
    canvas.rect(46, lineY[index], width, 3, isMatch ? (matchLit ? ochreLit : ochre) : graphite);
  });

  // Caret at the end of the last line.
  if (frame % 4 < 2) canvas.rect(89, 88, 3, 7, ink);

  // Lens over the match, kept on the page so the ink rim always has paper behind it.
  canvas.circle(118, 74, 18, ink, 4);
  canvas.line(132, 88, 142, 98, ink, 5);

  return canvas;
}
