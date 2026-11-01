// One bit per control. Touch, keyboard and CPU all produce the same bitmask.
export const UP = 1 << 0;
export const DOWN = 1 << 1;
export const LEFT = 1 << 2;
export const RIGHT = 1 << 3;
export const LIGHT = 1 << 4;
export const HEAVY = 1 << 5;
export const SPECIAL = 1 << 6;
export const THROW = 1 << 7;
export const BLOCK = 1 << 8; // touch-only block button, same as holding back

export const BUTTONS = { light: LIGHT, heavy: HEAVY, special: SPECIAL, throw: THROW };
