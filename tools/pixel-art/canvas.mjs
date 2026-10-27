/** Minimal RGBA pixel canvas with the handful of primitives the scenes need. */
export class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = new Uint8Array(width * height * 4);
  }

  set(x, y, color) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;
    const i = (y * this.width + x) * 4;
    this.data[i] = color[0];
    this.data[i + 1] = color[1];
    this.data[i + 2] = color[2];
    this.data[i + 3] = color[3] ?? 255;
  }

  rect(x, y, width, height, color) {
    for (let dy = 0; dy < height; dy += 1) {
      for (let dx = 0; dx < width; dx += 1) this.set(x + dx, y + dy, color);
    }
  }

  frame(x, y, width, height, color, thickness = 1) {
    this.rect(x, y, width, thickness, color);
    this.rect(x, y + height - thickness, width, thickness, color);
    this.rect(x, y, thickness, height, color);
    this.rect(x + width - thickness, y, thickness, height, color);
  }

  line(x1, y1, x2, y2, color, thickness = 1) {
    let x = x1;
    let y = y1;
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let error = dx - dy;
    const offset = Math.floor(thickness / 2);
    for (;;) {
      this.rect(x - offset, y - offset, thickness, thickness, color);
      if (x === x2 && y === y2) break;
      const doubled = error * 2;
      if (doubled > -dy) { error -= dy; x += sx; }
      if (doubled < dx) { error += dx; y += sy; }
    }
  }

  circle(cx, cy, radius, color, thickness = 2) {
    const inner = radius - thickness;
    for (let y = -radius; y <= radius; y += 1) {
      for (let x = -radius; x <= radius; x += 1) {
        const distance = Math.sqrt(x * x + y * y);
        if (distance <= radius && distance > inner) this.set(cx + x, cy + y, color);
      }
    }
  }

  /** Midpoint circle: symmetric, single-pixel steps — much cleaner than a distance test. */
  ring(cx, cy, radius, color, thickness = 2) {
    for (let offset = 0; offset < thickness; offset += 1) this.#midpoint(cx, cy, radius - offset, color);
  }

  #midpoint(cx, cy, radius, color) {
    let x = radius;
    let y = 0;
    let error = 1 - radius;
    while (x >= y) {
      for (const [dx, dy] of [[x, y], [y, x], [-y, x], [-x, y], [-x, -y], [-y, -x], [y, -x], [x, -y]]) {
        this.set(cx + dx, cy + dy, color);
      }
      y += 1;
      if (error < 0) {
        error += 2 * y + 1;
      } else {
        x -= 1;
        error += 2 * (y - x) + 1;
      }
    }
  }

  /** Nearest-neighbour upscale, so the pixel grid stays perfectly square. */
  scaled(factor) {
    const output = new Canvas(this.width * factor, this.height * factor);
    for (let y = 0; y < output.height; y += 1) {
      for (let x = 0; x < output.width; x += 1) {
        const source = ((Math.floor(y / factor) * this.width) + Math.floor(x / factor)) * 4;
        const target = (y * output.width + x) * 4;
        output.data[target] = this.data[source];
        output.data[target + 1] = this.data[source + 1];
        output.data[target + 2] = this.data[source + 2];
        output.data[target + 3] = this.data[source + 3];
      }
    }
    return output;
  }

  /** Partial ring, angles in radians. Used for signal arcs. */
  arc(cx, cy, radius, startAngle, endAngle, color, thickness = 2) {
    const steps = Math.max(8, Math.ceil(radius * Math.abs(endAngle - startAngle) * 3));
    for (let i = 0; i <= steps; i += 1) {
      const angle = startAngle + ((endAngle - startAngle) * i) / steps;
      for (let t = 0; t < thickness; t += 1) {
        const r = radius - t;
        this.set(Math.round(cx + Math.cos(angle) * r), Math.round(cy + Math.sin(angle) * r), color);
      }
    }
  }

  /** Copies another canvas in at the given offset, skipping transparent source pixels. */
  blit(source, offsetX, offsetY) {
    for (let y = 0; y < source.height; y += 1) {
      for (let x = 0; x < source.width; x += 1) {
        const i = (y * source.width + x) * 4;
        if (source.data[i + 3] === 0) continue;
        this.set(offsetX + x, offsetY + y, [
          source.data[i],
          source.data[i + 1],
          source.data[i + 2],
          source.data[i + 3],
        ]);
      }
    }
  }
}

export function hex(value, alpha = 255) {
  const n = Number.parseInt(value.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, alpha];
}
