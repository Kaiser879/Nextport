'use client';

import { useEffect, useRef } from 'react';

type Ember = {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
  depth: number;
  warm: boolean;
};

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Hero composition after the Physint key art: a blown-out wedge of paper light
 * on the left, a monolithic column right of centre, and embers drifting through
 * the haze. Every layer parallaxes with the pointer and the embers part around
 * it; the column's rim light tracks the pointer horizontally.
 */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    let visible = true;
    let time = 0;
    let targetX = 0;
    let targetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let embers: Ember[] = [];
    const random = mulberry32(20261027);

    const buildEmbers = () => {
      const count = Math.round(Math.min(140, Math.max(46, (width * height) / 12000)));
      embers = [];
      for (let index = 0; index < count; index += 1) {
        embers.push({
          x: random() * width,
          y: random() * height,
          size: 0.6 + random() * 1.9,
          speed: 0.12 + random() * 0.5,
          sway: 0.2 + random() * 0.8,
          phase: random() * Math.PI * 2,
          alpha: 0.16 + random() * 0.5,
          depth: 0.35 + random() * 0.65,
          warm: random() > 0.55,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      // Haze behind the column.
      const glowX = width * 0.66 + pointerX * 10;
      const glowY = height * 0.42 + pointerY * 8;
      const glowRadius = Math.max(width, height) * 0.5;
      const glow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
      glow.addColorStop(0, 'rgba(139, 168, 158, .32)');
      glow.addColorStop(0.34, 'rgba(69, 98, 96, .15)');
      glow.addColorStop(1, 'rgba(11, 21, 22, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      // Blown-out light from the upper left, soft-edged like the key art.
      const lightX = -width * 0.08 + pointerX * 14;
      const lightY = height * 0.06 + pointerY * 14;
      const lightRadius = Math.max(width * 0.72, height * 0.92);
      const light = context.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius);
      light.addColorStop(0, 'rgba(243, 241, 233, .3)');
      light.addColorStop(0.26, 'rgba(243, 241, 233, .12)');
      light.addColorStop(0.62, 'rgba(243, 241, 233, .03)');
      light.addColorStop(1, 'rgba(243, 241, 233, 0)');
      context.fillStyle = light;
      context.fillRect(0, 0, width, height);

      // Brush streaks dragged through the light.
      context.lineWidth = 1;
      for (let index = 0; index < 6; index += 1) {
        const y = height * (0.03 + index * 0.045) + pointerY * 8;
        context.beginPath();
        context.moveTo(-width * 0.02, y);
        context.lineTo(width * (0.2 + index * 0.03) + pointerX * 8, y - height * 0.07);
        context.strokeStyle = `rgba(243, 241, 233, ${0.14 - index * 0.02})`;
        context.stroke();
      }

      // Monolithic column, running off both edges so it reads as structure
      // rather than a panel, with soft sides that melt into the haze.
      const columnWidth = Math.max(70, Math.min(150, width * 0.09));
      const columnX = width * 0.715 + pointerX * 12 - columnWidth / 2;
      const columnTop = -height * 0.08;
      const columnBottom = height * 1.08;
      const columnHeight = columnBottom - columnTop;

      const columnFill = context.createLinearGradient(columnX, 0, columnX + columnWidth, 0);
      columnFill.addColorStop(0, 'rgba(6, 12, 13, 0)');
      columnFill.addColorStop(0.14, 'rgba(6, 12, 13, .82)');
      columnFill.addColorStop(0.5, 'rgba(13, 26, 27, .9)');
      columnFill.addColorStop(0.86, 'rgba(6, 12, 13, .86)');
      columnFill.addColorStop(1, 'rgba(6, 12, 13, 0)');
      context.fillStyle = columnFill;
      context.fillRect(columnX, columnTop, columnWidth, columnHeight);

      const detailTop = height * 0.1;
      const detailBottom = height * 0.92;
      const innerLeft = columnX + columnWidth * 0.16;
      const innerRight = columnX + columnWidth * 0.84;

      context.save();
      context.beginPath();
      context.rect(innerLeft, detailTop, innerRight - innerLeft, detailBottom - detailTop);
      context.clip();

      for (let index = 1; index < 8; index += 1) {
        const x = innerLeft + ((innerRight - innerLeft) / 8) * index;
        context.beginPath();
        context.moveTo(x, detailTop);
        context.lineTo(x, detailBottom);
        context.strokeStyle = 'rgba(243, 241, 233, .05)';
        context.stroke();
      }

      const rimX = columnX + columnWidth * (0.26 + (pointerX + 1) * 0.17);
      const rimHalf = columnWidth * 0.22;
      const rim = context.createLinearGradient(rimX - rimHalf, 0, rimX + rimHalf, 0);
      rim.addColorStop(0, 'rgba(243, 241, 233, 0)');
      rim.addColorStop(0.5, 'rgba(243, 241, 233, .1)');
      rim.addColorStop(1, 'rgba(243, 241, 233, 0)');
      context.fillStyle = rim;
      for (let y = detailTop; y < detailBottom; y += 6) {
        const fade = Math.sin(Math.PI * ((y - detailTop) / (detailBottom - detailTop)));
        context.globalAlpha = Math.max(0, fade);
        context.fillRect(rimX - rimHalf, y, rimHalf * 2, 6);
      }
      context.globalAlpha = 1;
      context.restore();

      // Embers.
      const pointerPixelX = width * (0.5 + pointerX * 0.5);
      const pointerPixelY = height * (0.5 + pointerY * 0.5);
      for (const ember of embers) {
        if (!reduced.matches) {
          ember.y -= ember.speed * ember.depth * 2.1;
          ember.x += Math.sin(time * 0.02 + ember.phase) * ember.sway * 0.35;
          if (ember.y < -10) {
            ember.y = height + 10;
            ember.x = random() * width;
          }
        }

        let x = ember.x + pointerX * 14 * ember.depth;
        let y = ember.y + pointerY * 10 * ember.depth;
        const dx = x - pointerPixelX;
        const dy = y - pointerPixelY;
        const distance = Math.hypot(dx, dy);
        if (distance < 190 && distance > 0.1) {
          const push = (1 - distance / 190) * 24;
          x += (dx / distance) * push;
          y += (dy / distance) * push;
        }

        context.beginPath();
        context.arc(x, y, ember.size, 0, Math.PI * 2);
        context.fillStyle = ember.warm
          ? `rgba(197, 164, 116, ${ember.alpha * 0.85})`
          : `rgba(243, 241, 233, ${ember.alpha * 0.7})`;
        context.fill();
      }

      // Vignette.
      const vignette = context.createRadialGradient(
        width * 0.5, height * 0.44, Math.min(width, height) * 0.24,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.78,
      );
      vignette.addColorStop(0, 'rgba(6, 12, 13, 0)');
      vignette.addColorStop(1, 'rgba(6, 12, 13, .55)');
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      if (width < 2 || height < 2) return;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildEmbers();
      draw();
    };

    const animate = () => {
      pointerX += (targetX - pointerX) * 0.06;
      pointerY += (targetY - pointerY) * 0.06;
      time += 1;
      draw();
      frame = window.requestAnimationFrame(animate);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      if (reduced.matches) {
        pointerX = targetX;
        pointerY = targetY;
        draw();
        return;
      }
      if (visible) frame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1));
      targetY = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1));
      if (reduced.matches) {
        pointerX = targetX;
        pointerY = targetY;
        draw();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    }, { threshold: 0.01 });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    reduced.addEventListener('change', start);
    resize();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      reduced.removeEventListener('change', start);
    };
  }, []);

  return <canvas className="hero-field" ref={canvasRef} aria-hidden="true" />;
}
