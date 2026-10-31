# PRD: *Siyasi Showdown* (working title)

A silly, browser-based 2D versus fighting game with caricature parodies of Pakistani political figures and parties. It's built mobile-first, to play in a phone's browser.

| | |
|---|---|
| **Status** | Draft v0.2 |
| **Owner** | TBD |
| **Last updated** | 2026-10-31 |
| **Platform** | **Mobile web** (Android Chrome first, then iOS Safari). Desktop browsers also supported |
| **Engine** | **Phaser + plain JavaScript + Vite** (decided, see [ENGINES.md](./ENGINES.md)) |
| **Project spirit** | A fun side project. Keep scope small and the jokes good. It may grow |

---

## 1. Summary

*Siyasi Showdown* is a 1v1 fighting game you play **in your phone's browser** with nothing to install. Someone sends a link on WhatsApp, you tap it, and you're punching a cartoon politician within seconds. It uses the genre's familiar mechanics (light/heavy attacks, special moves, blocking, a super meter, best-of-three rounds), simplified for touchscreens. The fighters are exaggerated, big-headed caricatures of Pakistani politicians, each from an obvious **parody party** with its own name, colours and symbol. The humour comes from well-known political memes, slogans and quirks, delivered as slapstick (pies, chappals, flying microphones) rather than realistic violence.

The pitch: **"Pakistani politics already looks like a fighting game. We added health bars."**

## 2. Goals and non-goals

### Goals
1. **Instantly playable from a shared link.** Open the link on a phone and be in a match within 10 seconds, with no account, download or app store.
2. **Feels good on a touchscreen.** On-screen controls that are easy to learn, with special moves that don't need precise joystick motions.
3. **Runs on budget Android phones** at a smooth frame rate, with a small download.
4. **Shareable and silly.** Short, funny matches (60–90 seconds) that people want to screenshot or clip for WhatsApp, TikTok and X.
5. **Even-handed satire.** Every major party gets roasted equally. The game doesn't take sides.
6. **Play friends online** through a room link, soon after the first release.

### Non-goals (for now)
- **App store apps.** Not planned. If the project grows, Capacitor can wrap the same code later (see §10).
- Esports-level depth: frame-perfect links, a deep combo system, tournament balance.
- 3D graphics, a story mode, or cutscenes.
- Accounts, ranked ladders, monetisation, or user-generated content.
- Any political message or endorsement.

## 3. Target audience

| Segment | Description | What they want |
|---|---|---|
| **Primary** | Pakistanis aged 16–35, at home and in the diaspora, who follow politics through memes, **mostly on Android phones** | Quick laughs, in-jokes, bragging rights over friends |
| **Secondary** | Casual mobile and browser gamers | A simple, polished fighting game they can play in a spare minute |
| **Tertiary** | Political commentators and content creators | Clip-worthy moments for videos and streams |

**Devices:** budget and mid-range Android phones (2–4 GB RAM) on Chrome are the main target, with iPhones on Safari second and desktop browsers third. Many players will be on mobile data, so download size and performance really matter.

## 4. Core gameplay

### 4.1 Match structure
- 1v1, **best of 3 rounds**, with a **60-second round timer**. If time runs out, the fighter with more health wins.
- Health bar per fighter, plus a **"Jalsa Meter"** (super meter) with 3 bars. It fills when you deal or take damage.
- The round starts with an announcer line (*"Round 1… Dharna shuru!"*). A KO triggers a comedic, non-violent knockout animation: the loser gets "disqualified", "sent into exile", "taken off-air" and so on.

### 4.2 Controls

**Touch (primary).** Landscape only.

```
 ┌──────────────────────────────────────────────────────────┐
 │  [P1 health ▓▓▓▓▓]      60      [▓▓▓▓▓ P2 health]        │
 │                                                          │
 │                    (fight area)                          │
 │                                                          │
 │     ╭───╮                                  (H)   (S)     │
 │    │  ●  │  ← joystick / d-pad          (L)  (T)  [SUPER]│
 │     ╰───╯                                                │
 └──────────────────────────────────────────────────────────┘
   L = Light   H = Heavy   S = Special   T = Throw
```

- **Left thumb:** a floating virtual joystick (it appears wherever you touch on the left half), or an optional fixed d-pad. Hold *back* to block and *down* to crouch.
- **Right thumb:** Light, Heavy, Special and Throw buttons, plus a **Super** button that lights up when the meter has enough bars.
- **Simple specials (default on touch):** **Special** alone, **forward + Special** and **back + Special** give the three special moves. No quarter-circle motions are needed.
- Buttons are large (at least 56 px), semi-transparent, and give haptic feedback via `navigator.vibrate` where it's supported. Layout and size can be adjusted in settings.

**Keyboard (desktop), rebindable**

| Action | Player 1 | Player 2 |
|---|---|---|
| Move / jump / crouch | `W A S D` | Arrow keys |
| Light / Heavy / Special | `F` / `G` / `H` | `K` / `L` / `;` |
| Throw | `F`+`G` | `K`+`L` |
| Super | `S` `S` + `H` (down, down + Special) | `↓` `↓` + `;` |

**Gamepad:** standard layout through the Gamepad API (D-pad or stick, plus face buttons). It also works for Bluetooth controllers paired to a phone.

**Classic motion inputs** (down→forward + Special and so on) are available on keyboard and gamepad as an alternative to Simple specials.

### 4.3 Combat systems (MVP)
- **Hitboxes and hurtboxes** defined for each animation frame. The game logic runs on a fixed 60 Hz tick.
- Each move has **startup, active and recovery frames**, plus hitstun, blockstun and pushback.
- **Chip damage** on blocked specials only.
- **Throws** beat blocking, and can be escaped in a short window by pressing throw at the same time.
- **Light combos:** light → light → heavy chains, and cancelling a normal into a special. No juggle system.
- **Generous input buffer** (about 8–10 frames), because touch input is less precise than a keyboard.
- **Projectiles:** one each for characters who have one, and projectiles that collide cancel each other out.

### 4.4 Game modes

| Mode | Release | Notes |
|---|---|---|
| Versus CPU | MVP | **The main mode on phones.** 3 difficulty levels, rule-based AI |
| Training | MVP | Dummy opponent, hitbox display, input display |
| Local Versus (2P) | MVP | One keyboard or two gamepads on desktop. On phones, best effort on a tablet with split-screen buttons |
| Online friend match | v1.1 | Tap "Challenge a friend" to get a link to share on WhatsApp. Peer-to-peer WebRTC. Delay-based netcode first, rollback later |
| Arcade ("Election Campaign") | v1.2 | Beat 5 opponents, then the secret boss. Ending card per character ("You won the election… recount pending") |
| Online quick match | Maybe later | Needs a matchmaking server. Only worth it if the game takes off |

## 5. Roster (launch: 6 fighters + 1 boss)

> All names below are **placeholder parodies**. The final names, designs and jokes must pass the content review in §8. Each fighter is an *archetype* that players will recognise, not a copy of a real person's photo, name or official party branding.

| # | Fighter (working name) | Parody party | Archetype and comedy angle | Signature moves (examples) |
|---|---|---|---|---|
| 1 | **Kaptaan** | *Tehreek-e-Tabdeeli* (PTT) | Cricketer-turned-politician. Sporty, charismatic, famous for changes of direction | **Bouncer** (cricket-ball projectile), **U-Turn Dash** (dash that reverses direction mid-move), **Container Speech** (super: rises on a container, sound waves stun) |
| 2 | **Sher Mian** | *Muslim League (Nihari)* (PML-Nihari) | Lahore lion. Loves food, infrastructure and staying abroad | **Motorway Rush** (fast charging lunge), **Nihari Pot Toss** (arcing projectile), **Return from London** (super: leaves the screen, lands from a plane) |
| 3 | **Jiyala Junior** | *Awami Party Zindabad* (APZ) | Heir of a political dynasty. Inherited charisma, famous slogans | **Zinda Hai!** (one-time revival from KO with low health), **Teer-andaz** (arrow-style projectile), **Sindh Card** (super: a card trick that confuses the opponent) |
| 4 | **Patang Bhai** | *Muttahida Patang Front* (MPF) | Karachi party. Kites, long-distance phone speeches | **Kite Glide** (aerial float), **Phone-In Address** (long-range delayed hit from a giant phone), **Strike Call** (super: city shuts down and the opponent freezes) |
| 5 | **Anchor Sahib** | *Breaking News Party* | Not a politician: the TV talk-show host who referees every fight | **Breaking News Ticker** (low sweeping projectile), **Mute Button** (disables the opponent's specials briefly), **Prime Time** (super: split-screen shouting match) |
| 6 | **Aam Aadmi** | *Party-less* | The ordinary voter. Underdog, load-shedding, petrol prices | **Load-Shedding** (stage goes dark for both fighters), **Petrol Price Hike** (projectile that grows over time), **Vote ka Haq** (super) |
| Boss | **The Hidden Hand** | *None* | Faceless, never named, always in control. **Legal review required before including this one** | **Selection** (pulls a fighter back into the round), **Hybrid Regime** (copies the opponent's moveset) |

**Template for each fighter** (to fill in per character later):
- Bio and one-line intro quip, plus a win quote and a lose quote (in Urdu, Roman Urdu and English)
- Stats: health, walk speed, jump arc, weight
- Move list: 4–6 normals, 3 specials (mapped to Simple inputs: neutral, forward and back + Special), 1 super, 1 throw
- Colour palette, plus a mirror-match alternate palette
- Voice lines: intro, 3 attack shouts, hurt, KO, win

**Not in the launch roster:** figures whose satire relies on religious themes. See §8.

**Start small:** the first playable build ships with **2 fighters**. More are added once the core feels fun.

## 6. Stages (launch: 4)

| Stage | Setting | Background gag |
|---|---|---|
| **D-Chowk Dharna** | Islamabad protest with shipping containers | Container sways, tear-gas clouds drift past, a chai wala keeps serving |
| **Minar Jalsa** | Huge rally at a Lahore landmark | Crowd waves flags of whoever is winning. DJ on the stage |
| **Prime-Time Studio** | TV talk show set | 6 guests shouting in split screen, "BREAKING NEWS" ticker |
| **Sea View, Karachi** | Beach at sunset | Camel rides, kites, waves, sudden load-shedding |

Stages are flat, with walls at both edges and no hazards that affect gameplay. Backgrounds use a few parallax layers at most, to keep memory use low on phones.

## 7. Art, audio and UX direction

### 7.1 Visual style
- **Caricature, big head with small body** (roughly 1:2 head-to-body ratio). Bold outlines, flat colours, lots of expression. Think editorial cartoons brought to life. Big heads also **read well on small phone screens**.
- **Hand-drawn 2D sprite sheets**, with about 6–10 frames per move to keep art work manageable. Characters are drawn for a 1280×720 logical screen, and the game scales to fit the device.
- **Comedy combat effects:** stars, "DHISHOOM!" text bursts, chappals and tomatoes. No blood or gore, and no realistic weapons.
- **Parody party branding:** every party gets an *altered* colour scheme and symbol (e.g. a cricket ball instead of a bat, a nihari pot instead of a tiger). **Do not use real party logos, flags or ECP election symbols as-is.**

### 7.2 Audio
- Music: dhol, qawwali-inspired and Pakistani pop-chiptune tracks. All original or properly licensed. Compressed small (OGG/M4A, mono for sound effects).
- Announcer in Urdu/English code-switching ("Round 2… *Fight karo*!").
- Voices: sound-alike impressionists are fine as parody, but **no clips of real speeches or broadcasts**.
- Audio starts on the first tap ("Tap to start"), because mobile browsers block sound until the player interacts with the page.

### 7.3 UX and screens
Tap to Start → Mode Select → Character Select → Stage Select (or random) → VS splash → Fight → Results → Rematch / Share.

- **Mobile-first UI:** large thumb-friendly buttons, no hover-only interactions, and every menu reachable by touch.
- **Landscape only:** show a "rotate your phone" screen in portrait. On Android, request fullscreen and landscape lock on the first tap.
- **Installable PWA:** "Add to Home Screen" gives a full-screen, app-like icon without an app store, and caches assets for faster repeat visits.
- **Pause** when the tab is hidden, for example when a phone call or WhatsApp notification interrupts.
- **Languages:** English, Urdu (right-to-left support for menus) and Roman Urdu.
- A disclaimer splash on first launch (see §8), plus an always-visible "Parody" tag on the title screen.
- **Sharing:** a result card image, shared through the native share sheet via the Web Share API, so it goes straight to WhatsApp. **Stretch:** clip the last 10 seconds of a round to video.

## 8. Content, legal and ethics guidelines (must-have)

Even as a fun side project, these rules matter. Political satire of public figures is a long tradition, but Pakistan's legal environment is risky. That includes PECA 2016 and its 2025 amendments, defamation law, and the blasphemy provisions of the Penal Code. The rules below are **requirements**, not suggestions. **If the game starts getting real traction, have a lawyer who knows Pakistani media and cyber law review the roster, names, art and dialogue.**

1. **Parody, clearly labelled.** Disclaimer on launch: *"This is a work of satire and fiction. Characters are caricatures and do not represent the views or actions of any real person or party."*
2. **No real photos, footage, audio clips, official logos, flags or ECP election symbols.** Every asset is original artwork.
3. **Even-handed.** Every major party is included and mocked with equal intensity. Balance changes must never favour one party.
4. **Mock public conduct, not private life.** Jokes target public statements, slogans, policies and well-known memes. Never family members who are private individuals, health conditions, sexuality, ethnicity or sect.
5. **No religion.** No religious figures, symbols, scripture, prayer or sectarian references, whether in characters, stages or dialogue.
6. **No real-world violence references.** No jokes about assassinations, terrorist attacks, real killings or custodial abuse. Combat is cartoon slapstick and KOs are comedic ("disqualified!", "sent abroad!").
7. **No false factual claims.** Avoid jokes that could be read as factual allegations of specific crimes, such as "X stole Rs 500 crore". Keep to exaggeration that is clearly absurd.
8. **Armed forces, judiciary and intelligence services** are especially high risk. Any character based on them (e.g. *The Hidden Hand*) must be faceless, unnamed, have no insignia, and pass legal review, or be cut.
9. **Takedown process.** A contact email and a documented process for responding to complaints.
10. **Hosting.** Host outside Pakistan on a mainstream CDN, and be prepared for the site being blocked in some regions.
11. **Fighting-game IP.** Use genre mechanics freely, but never another game's character designs, move names, sound effects, UI layout, fonts or logos.

## 9. Technical requirements

### 9.1 Platform and performance

| Requirement | Target |
|---|---|
| Primary browsers | Chrome on Android 10+ and Safari on iOS 16+ |
| Secondary browsers | Latest Chrome, Edge, Firefox and Safari on desktop |
| Reference low-end device | A budget Android phone with about 3 GB RAM (around 2020–21 era). **Test on one from the first prototype onward** |
| Frame rate | 60 fps on mid-range phones. At least 30 fps rendering on the low-end reference device, while the game logic still runs at a fixed 60 Hz |
| Simulation | Fixed 60 Hz logic tick, separated from rendering |
| Touch latency | No noticeable delay. Use `pointerdown` events, never click handlers. Disable browser zoom and scroll gestures on the game canvas |
| Initial download | **5 MB or less** before the title screen. About 1.5 MB or less per fighter and per stage, loaded on demand |
| Memory | Texture atlases of 2048×2048 or smaller. Unload fighters and stages that aren't in use |
| Resolution | 1280×720 logical, scaled to fit with letterboxing. Respect notches and safe areas |
| Input devices | Touch (primary), keyboard, and the Gamepad API |
| Offline | PWA service worker caches assets, so CPU and Training modes work offline after the first visit |

### 9.2 Architecture principles
- **The game simulation is deterministic and isolated from rendering.** Game state is a plain serialisable object. `step(state, inputsP1, inputsP2) → state` uses no `Math.random()` (use a seeded PRNG) and preferably integer positions. This keeps frame data consistent and makes online play, replays and training mode much easier.
- **Input is abstracted.** Touch, keyboard and gamepad all produce the same per-frame input bitmask, so the game logic never knows which device is in use.
- **Data-driven characters.** Move frame data, hitboxes and properties live in JSON per character, so they can be tuned without code changes.
- **Rendering and audio are a thin Phaser layer** over the game state.
- **Netcode (v1.1):** peer-to-peer WebRTC data channels using PeerJS, with room links. Start with delay-based input sync. Because the simulation is deterministic, upgrading to rollback later doesn't require a rewrite.

### 9.3 Stack (decided)

| Layer | Choice |
|---|---|
| Language | **Plain JavaScript** (ES modules). ESLint, and optional `// @ts-check` with JSDoc in tricky files for editor type hints |
| Engine | **Phaser**: latest stable release at project start, with the version pinned |
| Build tool / dev server | **Vite**. The dev server can be opened on a phone over local Wi-Fi for testing |
| PWA | `vite-plugin-pwa` (manifest and service worker) |
| Online play | PeerJS (WebRTC), plus a public STUN server. Add a TURN server only if needed |
| Hosting | Static hosting: Cloudflare Pages, Netlify or GitHub Pages |
| Future app wrapper (optional) | Capacitor, only if the project grows. No code changes needed to adopt it |

### 9.4 Analytics (optional, privacy-light)
If added: anonymous, cookie-less event counts covering sessions, matches, character picks, win rates by character and device type. No personal data.

## 10. Milestones

This is a fun project, so milestones are about scope rather than deadlines.

| Milestone | Scope | Exit criteria |
|---|---|---|
| **M0: Prototype** | 2 placeholder (grey-box) fighters, 1 stage, touch controls plus keyboard, hitboxes, health, rounds, simple CPU | Feels fun on a **real budget Android phone**, and playtesters want "one more round" |
| **M1: First playable** | 2 fully drawn fighters, 1 finished stage, audio, menus, disclaimer, PWA | Shareable link that friends actually play |
| **M2: Launch** | 4–6 fighters, 2–4 stages, CPU, Training, local versus, English and Urdu | Smooth on the reference phone. Content rules in §8 checked |
| **v1.1** | Online friend match through a WhatsApp link | Playable between two phones on 4G |
| **v1.2** | Arcade mode, boss (if cleared), share cards, more fighters | — |
| **Someday, maybe** | Rollback netcode, quick match, Capacitor app store builds | Only if people love it |

## 11. How we'll know it's working

No hard targets. It's a silly game. Signs that it's working:
- Friends ask for the link, and then send it to *their* friends.
- People hit **Rematch** more often than not.
- It runs smoothly on the cheapest phone in the friend group.
- Character picks are spread out (nobody thinks the game favours their party).
- Someone makes a meme or TikTok out of it.

## 12. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Touch controls feel bad, a classic problem for mobile fighting games | High | High | Simple specials by default, a generous input buffer, a floating joystick, and early testing with real players |
| Poor performance on budget phones | Medium | High | Test on the reference device from M0. Texture atlases, small backgrounds, few particles, lazy loading |
| Art becomes the bottleneck (most fighting-game effort is animation) | High | Medium | Big-head style with few frames, start with 2 fighters, reuse base poses |
| Perceived partisanship leads to backlash | Medium | Medium | Even-handed roster and equal joke intensity |
| Legal complaint, or the site gets blocked | Low–Medium | High | Rules in §8, hosting outside Pakistan, takedown process, legal review if it grows |
| Mobile browser quirks (audio unlock, fullscreen, iOS Safari) | High | Low | "Tap to start" screen, test on both Android Chrome and iOS Safari early |
| Online play is complex | Medium | Medium | Deterministic simulation from day one. Delay-based netcode before rollback |
| Political events date the jokes quickly | High | Low | Data-driven quips, so voice lines and win quotes are easy to update |

## 13. Open questions

1. Final title: *Siyasi Showdown*, *Jalsa Fighters* or *Dharna Dhamaka*?
2. Which 2 fighters go in the first playable build?
3. Is *The Hidden Hand* boss in or out?
4. Who's doing the art, and in what style: hand-drawn frames, or cut-out (paper-doll) animation?
5. Should the default language in Pakistan be Urdu or English?
