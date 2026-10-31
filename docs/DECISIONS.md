# Decision log

We work through every major decision **before** building, and record it here. Each entry explains what the decision is, **why it matters** (the game-dev lesson), the options, a recommendation, and what we chose.

New to a term? See [GLOSSARY.md](./GLOSSARY.md). For when each open decision is due, see the [build plan](./BUILD_PLAN.md).

**Status key:** ✅ decided · 🟡 discussing now · ⬜ not started

---

## Already decided

| # | Decision | Choice | Why |
|---|---|---|---|
| D1 | Platform | **Mobile web**, played in the phone's browser | Most of the audience is on Android phones. A link has no install step |
| D2 | Engine | **Phaser** | Best web performance and community, and it works with plain JavaScript |
| D3 | Language | **JavaScript** (not TypeScript) | Your preference. It's simpler to read and learn |
| D4 | Roster size | **20 fighters at MVP** | The content drives engagement (see [ROSTER.md](./ROSTER.md)) |
| D5 | Multiplayer | **The MVP must let two friends play on two phones**, at least over the same Wi-Fi | That's the core social experience |
| D6 | App stores | Not planned. Capacitor later, if ever | Keeps the focus on the game |

---

## Phase 0: How we work together

These come first, because they shape everything else.

### 0.1 Your role and how deep you want to learn ✅
**Decided: B, gradual co-builder.**

**Why it matters:** this decides how I explain, how much code you write, and how fast we go.
- **A. Tester and reviewer.** I write the code. You play every build, and I explain each piece in plain language. Fastest.
- **B. Gradual co-builder** *(recommended)*. I build the foundations and explain them. You make small, safe changes early (like tuning a punch's damage or writing a fighter's lines in a data file), then bigger ones over time. You learn by doing, without being blocked.
- **C. You write most of it.** I guide and review. Slowest, deepest learning.

### 0.2 Your coding background ✅
**Why it matters:** so I don't over- or under-explain. There's no wrong answer.

**Answer: a little** (some HTML, formulas or tutorials). Explanations will cover the basics of JavaScript, files and Git as they come up, without assuming prior knowledge.

### 0.3 The test loop: how you'll play each build ✅
**Decided: auto-deploy previews. We'll use Cloudflare** because its free tier has no bandwidth cap, which matters if a fad goes viral. Netlify is the fallback. It's set up as soon as the project skeleton exists.

**Why it matters:** game development is a loop of *build → play → feel → adjust*, and the faster the loop, the better the game. You're the tester, so every change should be **one tap away on your phone**.
- **A. Auto-deploy each push to a web URL** *(recommended)*. Netlify or Cloudflare Pages build the game automatically and give each branch its own preview link. You open it on your phone, and so can your friend. Free. You'd create the account and connect the GitHub repo (about 5 minutes, and I'll guide you).
- **B. GitHub Pages.** Also free and automatic, but it needs the repo to be public (or a paid GitHub plan), and there's only one URL with no per-branch previews.
- **C. Run it on a laptop** and open it on the phone over Wi-Fi. It needs Node.js installed and a terminal. Good to learn eventually, but more friction for testing.

**Note:** preview URLs are hard to guess, but technically public. Fine for a parody game in testing, but don't post them publicly until the content review (PRD §8) is done.

### 0.4 Test devices ✅
**Why it matters:** we tune performance and controls against real devices, and Android Chrome and iPhone Safari behave differently, especially for audio, fullscreen and networking.

**Answer: iPhones** (you and your friend). What that means:
- **iPhone Safari becomes our primary *test* platform.** Android remains the main *audience*.
- iPhone Safari limitations we must design around:
  - **No fullscreen button for games.** The fix is "Add to Home Screen", which runs the game full-screen like an app. We'll prompt for it.
  - **No orientation lock.** We show a "rotate your phone" screen in portrait.
  - **No vibration** (`navigator.vibrate` isn't supported), so haptics only work on Android.
  - **Audio only starts after a tap**, so we need the "Tap to start" screen.
  - The swipe-from-edge gestures and the bottom home bar can steal touches, so controls must keep away from the screen edges.
- **Risk:** iPhones are much faster than budget Androids, so the game could feel smooth for us and be sluggish for the real audience. **Mitigation:** I'll watch performance budgets in code, and **before the public launch, test on at least one budget Android phone** (borrow one, or buy a cheap one for about PKR 25–35k).

### 0.5 Working rhythm ✅
**Recommendation:** small playable increments. Every step ends with:
1. A link you can play.
2. A short "what changed and why" note, written to teach.
3. A **"what to test"** checklist (e.g. *"Does the jump feel floaty? Try 10 jumps."*).
4. Your feedback goes into the next step.

---

## Phase 1: Technical foundations

### 1.1 Phaser 4 or Phaser 3 ⬜
**Why it matters:** major versions differ in features and in how many tutorials exist.
- **Phaser 4** (latest is 4.2.x) *(recommended)*. Current, with a new faster renderer, and its API is largely familiar to anyone who knows Phaser 3. Fewer tutorials written specifically for it.
- **Phaser 3** (final is 3.90). Years of tutorials and examples, but it's the previous generation.

### 1.2 Online play architecture (netcode) ⬜
**Why it matters (key lesson):** two phones must agree on what's happening, 60 times a second, over a network that adds delay. Fighting games solve this differently from most games. **They send only button presses, not positions.** Both phones run the identical simulation with the identical inputs, so they produce the identical fight. That's why the simulation must be **deterministic** (see Glossary).
- **A. Delay-based lockstep** *(recommended for MVP)*. Each input is scheduled a few frames in the future (e.g. press now, it happens 3 frames from now), so the other phone's input arrives in time. Simple and fair, and on the same Wi-Fi the delay is unnoticeable. Over the internet it can feel slightly sluggish.
- **B. Rollback.** Guess the opponent's input, show the result immediately, and if the guess was wrong, rewind and replay. It's the gold standard (modern fighting games use it), but it's more complex, and every visual and sound effect must handle being rewound.
- **C. Host-authoritative.** One phone runs the game and streams the result to the other. Simple, but the guest always plays with lag, which is unfair.

**Plan:** A for the MVP, built so that B can be added later if internet play feels bad.

### 1.3 How two phones find each other ⬜
**Why it matters:** phones can't just "call" each other. They need a matchmaker (a **signalling server**) to introduce them, and sometimes a **relay** (TURN) when networks block direct connections. Many mobile networks do.
- **A. Share a link or QR code, with PeerJS's free public signalling server** *(recommended to start)*. Zero setup. If it turns out unreliable, we host our own later.
- **B. Host our own signalling server.** More control, but there's a server to run.
- **Relay (TURN):** not needed on the same Wi-Fi. For internet play on strict networks we'll add a free-tier TURN service in v1.1.

### 1.4 Number system for positions ⬜
**Why it matters:** different phones can compute decimals (floating-point numbers) with tiny differences. Tiny differences grow, and the two phones' fights drift apart: a **desync**.
- **Recommendation:** store positions as **whole numbers in "subpixels"** (e.g. 1 pixel = 100 units). Whole-number math is identical on every device.

### 1.5 Animation technology and tools ⬜
**Why it matters:** with 20 fighters, animation is the biggest cost (PRD §5.3).
- **A. Our own small puppet and hitbox editor** in the browser *(recommended)*. Tailored to us, free, and building it is a great learning project.
- **B. Spine** (paid, about US$70 for the basic edition). A professional, polished tool, and Phaser has official support. Everyone who edits animations needs a licence.
- **C. Sprite sheets** drawn frame by frame. Simplest technically, but far too much drawing for 20 fighters.

### 1.6 Testing strategy ⬜
- **Automated tests** (Vitest) for the fight simulation: *"after this punch hits, health is 90"*. They catch bugs before you do.
- **Replays:** because the simulation is deterministic, a match can be saved as just its inputs. When something weird happens, you tap "Save replay" and send it to me, and I can watch exactly what happened. **This is how pro fighting-game developers debug.**
- **Your playtests:** the "what to test" checklists from 0.5.

### 1.7 Project setup ⬜
Vite, folder structure (see ENGINES.md), ESLint and Prettier for consistent formatting. This is mostly my call; I'll explain it as we go.

---

## Phase 2: Game design (the "feel")

### 2.1 Speed and weight ⬜
How fast fighters walk, how high they jump, how long hits freeze the screen. **Lesson:** "game feel" comes from small numbers like these, especially **hitstop** (a tiny freeze when a hit lands, which makes it feel powerful). We start from genre-typical values and tune them by playing.

### 2.2 Combo philosophy ⬜
How long can combos be? **Recommendation:** short (about 3–4 hits), with **damage scaling** (each extra hit does less). It's beginner-friendly, keeps fights funny rather than technical, and prevents endless combos.

### 2.3 Blocking on a touchscreen ⬜
- **A. Hold back on the joystick** (classic). Natural for fighting-game fans, but awkward on glass.
- **B. A dedicated Block button.** Easier on mobile, but uses a thumb slot.
- **C. Both, with a setting.**
**Recommendation:** prototype A and B and decide by playtesting. That's your first real test-driven design decision.

### 2.4 Stage size and camera ⬜
Single-screen arena, or a wider stage where the camera follows both fighters? **Recommendation:** a stage about 1.5 screens wide, with a camera that follows the midpoint between the fighters and a maximum distance between them.

### 2.5 Match rules ⬜
Currently best of 3 rounds, 60 seconds each. Confirm after playtesting. Shorter suits phones.

### 2.6 CPU opponent ⬜
How smart, and how it's built. **Recommendation:** simple rules ("if close, attack; if a projectile is coming, jump") with randomness. Difficulty controls reaction time and mistakes.

### 2.7 Friend-match flow ⬜
How a friend match runs: lobby, both players picking fighters, rematch, what happens on disconnect, and who picks the stage.

---

## Phase 3: Content production

### 3.1 Who makes the art ⬜
- **A. Placeholder art from me** (simple shapes and colours) until the game feels fun *(recommended now, in any case)*.
- **B. Hire one caricature artist** (a Pakistani illustrator, through Instagram or Fiverr) for a consistent style. Needs a budget.
- **C. You draw.**
- **D. AI-assisted art.** Most image generators refuse to depict real politicians, it's hard to keep a consistent style, and ownership of the output is legally unclear.

### 3.2 Voices ⬜
Friends doing impressions, hired voice actors, text-to-speech, or subtitles only. **Recommendation:** friends and impressionists for the MVP (cheap and authentic), with text-only as the fallback.

### 3.3 Music and sound effects ⬜
Free (CC0) libraries for placeholders, then commissioned or licensed tracks.

### 3.4 Joke writing and review ⬜
You (and your friends) are the comedy writers, since you know the memes. I'll structure the data files and check every line against PRD §8. **Decide who has the final say on jokes.**

### 3.5 Languages at MVP ⬜
Urdu script needs a large font file (Nastaliq) and right-to-left layout. **Recommendation:** Roman Urdu lines, an English UI, and English subtitles for the MVP. Urdu script later.

---

## Phase 4: Release

| # | Decision | Notes |
|---|---|---|
| 4.1 | Final name | See PRD open questions |
| 4.2 | Domain name | e.g. `siyasishowdown.com`. Cheap; decide close to launch |
| 4.3 | Private testing or public launch | Friends-only links until the content review is done |
| 4.4 | Legal review timing | Before the public launch at the latest |
| 4.5 | Analytics | Optional, privacy-light (PRD §9.4) |
