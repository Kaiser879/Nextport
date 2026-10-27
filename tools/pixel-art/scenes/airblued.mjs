import { Canvas, hex } from '../canvas.mjs';

export const WIDTH = 192;
export const HEIGHT = 108;
export const FRAMES = 16;

const panel = hex('#122624');
const panelActive = hex('#17302d');
const chipFill = hex('#1b3733');
const wire = hex('#4a6b64');
const teal = hex('#6f9a92');
const paper = hex('#e5e9dd');
const dim = hex('#8ba49c');
const ochre = hex('#c9974f');
const ochreLit = hex('#e8b46c');

const BOX_Y = 30;
const BOX_H = 48;
const LINK_Y = 53;

/** A request travels TUI → BlueZ → adapter, the radio answers, the reply comes back. */
export function drawFrame(frame) {
  const canvas = new Canvas(WIDTH, HEIGHT);

  let active = -1;
  let packet = null;
  let reply = false;
  let pulse = false;

  if (frame >= 2 && frame <= 5) {
    active = 0;
    packet = 54 + (frame - 2) * 5;
  } else if (frame >= 6 && frame <= 9) {
    active = 1;
    packet = 120 + (frame - 6) * 5;
  } else if (frame >= 10 && frame <= 11) {
    active = 2;
    pulse = true;
  } else if (frame >= 12 && frame <= 13) {
    active = 1;
    packet = 134 - (frame - 12) * 10;
    reply = true;
  } else if (frame >= 14) {
    active = 0;
    packet = 70 - (frame - 14) * 10;
    reply = true;
  }

  // Links first, so the boxes sit on top of their ends.
  canvas.rect(52, LINK_Y, 22, 2, wire);
  canvas.rect(118, LINK_Y, 22, 2, wire);

  const box = (x, width, isActive) => {
    canvas.rect(x, BOX_Y, width, BOX_H, isActive ? panelActive : panel);
    canvas.frame(x, BOX_Y, width, BOX_H, isActive ? teal : wire, 2);
  };

  box(8, 44, active === 0);
  box(74, 44, active === 1);
  box(140, 44, active === 2);

  // A — the TUI: a rule, three result rows, a blinking caret.
  canvas.rect(12, 38, 36, 1, wire);
  canvas.rect(14, 46, 22, 3, dim);
  canvas.rect(14, 52, 16, 3, dim);
  canvas.rect(14, 58, 26, 3, dim);
  if (frame % 4 < 2) canvas.rect(42, 56, 3, 6, paper);

  // B — BlueZ: a chip with pins on the bus.
  canvas.rect(86, 44, 20, 20, chipFill);
  canvas.frame(86, 44, 20, 20, teal, 1);
  for (const y of [48, 54, 60]) {
    canvas.rect(81, y, 5, 2, wire);
    canvas.rect(106, y, 5, 2, wire);
  }
  canvas.rect(92, 51, 8, 6, active === 1 ? ochreLit : dim);

  // C — the radio side: rune plus signal arcs.
  const rune = [[150, 40], [160, 47], [150, 54], [160, 61], [150, 68]];
  for (let i = 0; i < rune.length - 1; i += 1) {
    canvas.line(rune[i][0], rune[i][1], rune[i + 1][0], rune[i + 1][1], paper, 2);
  }
  canvas.line(150, 40, 150, 68, paper, 2);

  canvas.arc(160, 54, 9, -0.85, 0.85, pulse ? ochreLit : teal, 2);
  canvas.arc(160, 54, 14, -0.85, 0.85, pulse ? ochreLit : wire, 2);

  if (packet !== null) canvas.rect(packet, LINK_Y - 1, 4, 4, reply ? teal : ochre);

  return canvas;
}
