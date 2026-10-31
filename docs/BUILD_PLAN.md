# Build plan

How we get from an empty repo to the MVP, one playable step at a time. It turns the decisions in [DECISIONS.md](./DECISIONS.md) and the milestones in [PRD §10](./PRD.md#10-milestones) into an ordered list of steps.

New to a term? See [GLOSSARY.md](./GLOSSARY.md).

---

## 1. What this plan is built on

### Locked decisions

| Decision | What it means for the build |
|---|---|
| **D1 Mobile web** | Every step is tested in a phone browser first, not on a laptop |
| **D2 Phaser** + **D3 JavaScript** | Plain JavaScript (ES modules), Vite and Phaser. No TypeScript, no build steps we don't need |
| **D4 20 fighters** | The tech has to make each fighter **cheap to add**. That's why M1 builds the animation pipeline before mass content |
| **D5 Two phones in the MVP** | Online play goes in **early** (step 0.4), not at the end. Every later feature then gets tested over the network for free |
| **D6 No app stores** | No native builds. "Add to Home Screen" (PWA) is the app |
| **0.1 Gradual co-builder** | Every step has a small **"your turn"** task, starting very safe (changing a number) and growing over time |
| **0.2 A little coding background** | Each step's note explains the new JavaScript, file or Git ideas as they come up |
| **0.3 Cloudflare previews** | Set up in step 0.1. After that, every push gives you a link to play |
| **0.4 iPhones for testing** | iPhone Safari limits are handled from day one: "Tap to start", a rotate screen, no edge controls, no vibration. A **budget Android check** happens at the M0 gate and before launch |
| **0.5 Small playable increments** | Every step ends with a link, a "what changed and why" note, and a "what to test" checklist |

### Open decisions: we build on the recommendation, and confirm when it matters

Phases 1–4 of the decision log aren't decided yet. Rather than stop and decide everything up front, we **decide each one just before the step that needs it**. Until then, the plan assumes the recommended option, and the code is written so that changing our minds is cheap.

| Decision | Default we build on | Decide by |
|---|---|---|
| 1.1 Phaser 4 or 3 | Phaser 4, version pinned | Step 0.1 |
| 1.7 Project setup | Vite, the folder layout in [ENGINES.md](./ENGINES.md), ESLint and Prettier | Step 0.1 (my call, explained) |
| 1.4 Number system | Whole-number subpixels (1 px = 100 units) | Step 0.2 |
| 1.6 Testing | Vitest for the simulation, replays, your playtests | Step 0.2 |
| 2.1 Speed and weight | Genre-typical starting values, tuned by playing | Step 0.3, retuned all through M0 |
| 1.2 Netcode | Delay-based lockstep, with a checksum to catch desyncs | Step 0.4 |
| 1.3 Finding each other | Share a link or QR code, using PeerJS's free signalling server | Step 0.4 |
| 2.3 Blocking on touch | Build both "hold back" and a Block button, and pick by playtest | Step 0.6 |
| 2.2 Combos | Short (3–4 hits) with damage scaling | Step 0.6 |
| 2.5 Match rules | Best of 3, 60-second rounds | Step 0.7 |
| 2.4 Stage and camera | About 1.5 screens wide, with a camera that follows both fighters | Step 0.8 |
| 2.6 CPU opponent | Simple rules plus randomness, 3 difficulty levels | Step 0.9 |
| 2.7 Friend-match flow | Minimal in M0 (link → fight → rematch), full flow in M1 | Step 0.4 (minimal), M1 (full) |
| 1.5 Animation tools | Our own puppet and hitbox editor | **Before M1** |
| 3.1 Who makes the art | Placeholder shapes until M0 feels fun | **Before M1** |
| 3.2 Voices | Friends and impressionists, with subtitles as the fallback | **Before M1** |
| 3.3 Music and sound | Free CC0 placeholders | **Before M1** |
| 3.4 Final say on jokes | Not yet decided | **Before M1** |
| 3.5 Languages | Roman Urdu lines, English UI and subtitles | **Before M1** |
| 4.1–4.5 Release | Friends-only links until the content review | **Before launch** |

---

## 2. How every step works

1. I build on a branch and explain what I'm doing.
2. Cloudflare builds that branch and gives it a **preview link**.
3. You (and your friend) play it on your iPhones, using the step's **"what to test"** checklist.
4. You do the step's **"your turn"** task. I review it and explain anything that broke.
5. Your feedback goes into the next step. When you're happy, the branch is merged into `main`.

**Every step must end playable.** If a step grows too big to finish with something playable, we split it.

---

## 3. M0: Prototype (grey boxes)

**Goal:** two grey-box fighters on one stage, with touch controls, hitting, rounds, a simple CPU and **two-phone play over Wi-Fi**. No real art. We're finding out whether the fight is fun on a touchscreen.

**Why grey boxes:** art is the most expensive thing in this project. We don't spend any on it until we know the game *feels* good. Coloured rectangles are enough to judge that.

### Step 0.1: Skeleton and preview links
- **I build:** the Vite + Phaser project and the folder layout. A "Tap to start" screen (iPhone audio only starts after a tap), a "rotate your phone" screen in portrait, a 1280×720 game area that scales to fit and respects the notch, and one grey box on screen.
- **You set up:** a Cloudflare account, connected to this GitHub repo (about 5 minutes, and I'll guide you click by click).
- **Your turn:** change the box's colour in one line of code and push it. You'll see your change at the preview link.
- **What to test:** the link opens on both iPhones. Portrait shows the rotate screen. Landscape shows the box. Try "Add to Home Screen".
- **You learn:** what Vite, npm, a branch and a deploy are.

### Step 0.2: The simulation heart
- **I build:** `step(state, inputs) → state` in `src/sim/`, with no Phaser code inside. A fixed 60-ticks-per-second game loop, separate from drawing. Whole-number positions, a seeded random number generator, and the first automated tests (Vitest). Two boxes that walk and jump with the keyboard.
- **Your turn:** change walk speed and jump height in a fighter data file (JSON) and see the difference.
- **What to test:** do the walking and jumping feel too floaty or too stiff? The fight logic must stay at the same speed if the screen stutters.
- **You learn:** game state, the game loop, and why we need determinism (it's what makes step 0.4 possible).

### Step 0.3: Touch controls
- **I build:** a floating joystick on the left half and Light, Heavy, Special and Throw buttons on the right, kept away from the screen edges and the home bar. Touch, keyboard and gamepad all produce the same per-frame input bitmask. An 8–10 frame input buffer. An on-screen input display for debugging.
- **Your turn:** adjust button size and position in a settings file.
- **What to test:** play for 5 minutes. Do your thumbs ever miss? Does an edge swipe or the home bar steal touches? Can you walk, crouch and jump without looking?

### Step 0.4: Two phones, two boxes
*This is the riskiest step, so it comes early.*
- **I build:** "Challenge a friend" creates a link and a QR code (PeerJS). Your friend opens it and both phones connect. Each phone sends **only its button presses**, delayed a few frames, and both run the same simulation. A checksum detects if the two fights ever disagree (a desync) and shows a warning. If the connection drops, both phones return to the menu.
- **Your turn:** change the input delay (in frames) and feel the difference.
- **What to test:** play on the same Wi-Fi, then over mobile data in two places. Does it feel laggy? Did you ever see the desync warning? Does a closed tab or a phone call end the match cleanly?
- **You learn:** lockstep netcode, and why fighting games send inputs instead of positions.
- **If it fails:** a public signalling server that doesn't connect reliably moves decision 1.3 forward. Same-Wi-Fi play must work perfectly before we go on.

### Step 0.5: Hitting
- **I build:** moves with startup, active and recovery frames. Hitboxes, hurtboxes and pushboxes. Hitstun, hitstop and pushback. Health bars. A debug view that draws the boxes.
- **Your turn:** tune the Light and Heavy attacks' damage and startup in the data file.
- **What to test:** do hits *feel* like they land? Is the Heavy worth its slower startup? Turn on the hitbox view: does what you see match what hits?

### Step 0.6: Defence and combos
- **I build:** blocking, **both ways** (hold back, and a Block button you can switch on). Crouching blocks. Throws that beat blocking, and throw escapes. Light → Light → Heavy chains, cancelling into specials, and damage scaling.
- **Your turn:** play 10 matches with each blocking style, then pick one. **This is your first real playtest-driven design decision (2.3).**
- **What to test:** which blocking style do you prefer, and which does your friend prefer? Can you do the 3-hit combo on purpose?

### Step 0.7: Specials, meter and rounds
- **I build:** three specials per box (S, →S, ←S), one projectile, and projectiles that cancel each other. The Jalsa Meter, plus a placeholder Super (tap) and Ultimate (hold). Chip damage on blocked specials. A 60-second timer, best of 3, KO and round reset. A simple results screen with Rematch.
- **Replays:** a "Save replay" button. Since a match is just its inputs, you can send me a replay file and I can watch exactly what happened.
- **Your turn:** write the announcer lines for round start and KO in the data file.
- **What to test:** are rounds too long or too short on a phone? Is the Super worth saving for?

### Step 0.8: Stage, camera and Training
- **I build:** a stage about 1.5 screens wide, with walls and a camera that follows the midpoint between the fighters. One placeholder background layer. **Training mode:** a dummy opponent, the hitbox view and the input display.
- **What to test:** does anything happen off-screen? Does the camera move too much?

### Step 0.9: CPU opponent
- **I build:** a simple rule-based CPU ("if close, attack; if a projectile is coming, jump"), with randomness from the seeded generator. Easy, Medium and Hard change its reaction time and how often it makes mistakes.
- **Your turn:** change one of the CPU's rules, e.g. how often it jumps.
- **What to test:** is Easy beatable by a first-timer? Is Hard annoying or fun?

### M0 gate: is it fun?
Before any art is commissioned, check the PRD's exit criteria:
- [ ] It feels fun on a touchscreen, and playtesters want "one more round".
- [ ] Two friends can play each other on two phones over Wi-Fi, with no desyncs.
- [ ] It runs smoothly on a **real budget Android phone**. Borrow one for an afternoon. The PRD wants this from M0, and it's much cheaper to fix performance problems now than after 20 fighters exist.
- [ ] The automated tests pass, and replays play back identically.

**If it isn't fun yet,** we stay in M0 and tune. Every later milestone multiplies whatever M0 feels like.

---

## 4. M1: Pipeline proven (4 real fighters)

**Goal:** find out what one finished fighter really costs to make, and end up with a link friends actually want to play.

### Before M1 starts: decisions due
- **1.5 Animation tools** (recommendation: our own puppet and hitbox editor).
- **3.1 Who makes the art.** If you're hiring an artist, start looking during M0, because finding one takes time.
- **3.2 Voices**, **3.3 Music and sound**, **3.4 Who has the final say on jokes**, **3.5 Languages**.
- **Which 4 fighters (PRD open question 2).** The suggestion is Kaptaan (rig A), Speed Sahib (B), Sher Mian (C) and Sheikh Sahib (D). **Note:** that puts two PML-Nihari fighters in the first public build. Swapping Sher Mian for **Bara Sahib** (also rig C) gives three different parties plus Sheikh Sahib, which fits the even-handedness rule (PRD §8.3) better.
- **Content review of those 4 concepts** against PRD §8, *before* any drawing starts.

### M1 steps
| Step | What gets built | Your turn |
|---|---|---|
| 1.1 Puppet runtime | Phaser draws fighters as separate parts (head, torso, arms, legs, props) moved by keyframe data | Swap a placeholder head for another and watch the rig move it |
| 1.2 Puppet and hitbox editor | A small browser tool (development only) to pose parts, set keyframes and draw hitboxes, saving the fighter's JSON | Make your first animation: a taunt |
| 1.3 Shared rigs A–D | Walk, jump, block, hit reactions and the 6 normals, animated **once per rig** | Tune one shared normal and see it change for every fighter on that rig |
| 1.4 Fighter 1, end to end | Specials, Super, throw, gimmick, poses, lines and a comic-panel Jalsa Ultimate. **We time how long each part takes** | Write the fighter's lines (Roman Urdu with English subtitles) |
| 1.5 Fighters 2–4 | The same recipe, using what fighter 1 taught us | Playtest each gimmick and suggest a tweak |
| 1.6 Screens and flow | Tap to Start → Mode Select → Character Select → Stage Select → VS splash → Fight → Results → Rematch. The full friend-match flow (2.7) | Write the character-select lines |
| 1.7 Release basics | The parody disclaimer, the "Parody" tag, the PWA (with an "Add to Home Screen" prompt for iPhone), pausing when the tab is hidden, and 1 finished stage | Check the disclaimer text |

### M1 gate
- [ ] We know the **real cost per fighter**, in hours and money for art, animation and voice. **We re-plan M2 using this number.**
- [ ] 4 fighters feel different from each other.
- [ ] The download is within budget: 5 MB or less to the title screen, about 1 MB per fighter.
- [ ] Friends play it without being asked to.

---

## 5. M2: Content production (16 more fighters)

**Goal:** the remaining 16 fighters in **4 batches of 4**, with each batch balanced across parties, plus the engagement features.

**Each batch follows the same pipeline:**
1. Concept review against PRD §8 (before any drawing).
2. Art (heads with about 5 expressions, outfits, props, Ultimate panels).
3. Animation in the editor (about 5 unique animations and 3 poses per fighter).
4. Data: frame data, gimmick, lines, rival intros.
5. Voice recording, or subtitles as the fallback.
6. Playtest the batch, then a final §8 check. **The next batch only starts after this.**

A fighter who fails review is swapped for one from the bench in [ROSTER.md](./ROSTER.md).

**Engagement features, spread across the batches:**
- The 3 remaining stages (4 in total).
- Rival intros (starting with the 12 pairs in ROSTER.md).
- "Breaking News" result headlines, shared to WhatsApp through the phone's share sheet.
- Taunts, character-select barks and 2 colour palettes per fighter.

**Early release check:** after batches 1–2 (8–12 fighters), decide on PRD open question 6: release the finished fighters early while the fad is hot, or hold everything for 20.

---

## 6. MVP launch

**Decisions due:** 4.1 final name, 4.2 domain, 4.3 private or public, 4.4 legal review timing, 4.5 analytics.

**Launch checklist:**
- [ ] All 20 fighters have passed the content review.
- [ ] Smooth on the budget Android reference phone (this is required, not optional).
- [ ] Tested on Android Chrome and iPhone Safari.
- [ ] Modes: Versus CPU, Training, Local Versus and Friend match.
- [ ] English and Urdu.
- [ ] Legal review, if the game is getting traction (and in any case for The Hidden Hand and Patang Bhai).
- [ ] A takedown contact email and process.
- [ ] Hosted outside Pakistan (Cloudflare covers this).

---

## 7. After launch

| Version | What |
|---|---|
| **v1.1** | Internet play hardening: a TURN relay for strict mobile networks, and rollback netcode if the delay feels bad |
| **v1.2** | Arcade mode ("Election Campaign"), the secret boss if cleared, and bench fighters as topical drops |
| **Someday** | Quick match, app store builds through Capacitor. Only if people love it |

---

## 8. What I need from you, and when

| When | What |
|---|---|
| Step 0.1 | Create a Cloudflare account and connect the repo (I'll guide you) |
| Every step | Play the preview link, run through the checklist and tell me how it felt. Do the "your turn" task |
| Step 0.4 onward | A friend with a phone to test two-device play |
| During M0 | If we're hiring an artist, start looking. Start collecting jokes and memes for the roster |
| M0 gate | Borrow a budget Android phone for an afternoon |
| Before M1 | The Phase 3 decisions, and the first 4 fighters |
| Each M2 batch | Write and approve lines. Help organise voice recording |
| Before launch | Phase 4 decisions, and a lawyer if the game is taking off |
