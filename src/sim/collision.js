import { SUB } from './constants.js';

// Boxes are { x0, x1, y0, y1 } in subpixels, with y measured up from the floor.
export function overlaps(a, b) {
  return a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
}

export function hurtbox(f, def) {
  const half = (def.width * SUB) / 2;
  const h = (f.crouching ? def.crouchHeight : def.height) * SUB;
  return { x0: f.x - half, x1: f.x + half, y0: f.y, y1: f.y + h };
}

// Hitboxes are written facing right, in pixels from the fighter's feet.
export function hitbox(f, box) {
  const near = f.x + f.facing * box.x * SUB;
  const far = f.x + f.facing * (box.x + box.w) * SUB;
  const y0 = f.y + box.y * SUB;
  return { x0: Math.min(near, far), x1: Math.max(near, far), y0, y1: y0 + box.h * SUB };
}

export function projectileBox(p) {
  return { x0: p.x - p.w / 2, x1: p.x + p.w / 2, y0: p.y - p.h / 2, y1: p.y + p.h / 2 };
}
