// All positions and speeds are whole numbers in subpixels, so every device computes
// exactly the same fight (see DECISIONS.md 1.4).
export const FPS = 60;
export const SUB = 100; // subpixels per pixel
export const STAGE_WIDTH = 1280 * SUB;

export const ROUND_FRAMES = 60 * FPS;
export const INTRO_FRAMES = 90;
export const KO_FRAMES = 150;
export const ROUNDS_TO_WIN = 2;

export const BUFFER_FRAMES = 8; // how long a button press is remembered
export const KNOCKDOWN_FRAMES = 45;
export const TECH_FRAMES = 14; // both fighters' recovery after a throw is escaped

// Each extra hit in a combo does less damage, down to a floor (percent).
export const COMBO_SCALE_STEP = 15;
export const MIN_COMBO_SCALE = 40;
