# PRD: *Siyasi Showdown* (working title)

A browser-based 2D versus fighting game with caricature parodies of Pakistani political figures and parties.

| | |
|---|---|
| **Status** | Draft v0.1 |
| **Owner** | TBD |
| **Last updated** | 2026-10-31 |
| **Platform** | Desktop web browsers first. Mobile web after launch |

---

## 1. Summary

*Siyasi Showdown* is a 1v1 fighting game that runs in the browser with nothing to install. It uses the genre's familiar mechanics (light/heavy attacks, special moves, blocking, a super meter, best-of-three rounds), with exaggerated, big-headed caricatures of Pakistani politicians. Each fighter belongs to an obvious **parody party** that has its own name, colours and symbol. The humour comes from well-known political memes, slogans and quirks, delivered as slapstick (pies, chappals, flying microphones) rather than realistic violence.

The pitch: **"Pakistani politics already looks like a fighting game. We added health bars."**

## 2. Goals and non-goals

### Goals
1. **Instantly playable.** Open a link and be in a match within 10 seconds, with no account, download or install.
2. **Fun local PvP.** Two players on one keyboard, or with gamepads, at a stable 60 fps.
3. **Shareable.** Short, funny matches (60–90 seconds) that people want to clip and post to WhatsApp, TikTok and X.
4. **Even-handed satire.** Every major party gets roasted equally. The game doesn't take sides.
5. **Online PvP** after launch, with netcode good enough for players on Pakistani home broadband and 4G.

### Non-goals (for v1)
- Esports-level depth: frame-perfect links, a deep combo system, tournament balance.
- 3D graphics, a story mode, or cutscenes.
- Native mobile or console apps.
- Accounts, ranked ladders, monetisation, or user-generated content.
- Any political message or endorsement.

## 3. Target audience

| Segment | Description | What they want |
|---|---|---|
| **Primary** | Pakistanis aged 16–35, at home and in the diaspora, who follow politics through memes | Quick laughs, in-jokes, bragging rights over friends |
| **Secondary** | Casual browser gamers | A simple, polished fighting game |
| **Tertiary** | Political commentators and content creators | Clip-worthy moments for videos and streams |

**Devices:** mid-range laptops and desktops on Chrome, Edge or Firefox. Many players will be on low-end hardware or slow connections, so load size and performance matter.

## 4. Core gameplay

### 4.1 Match structure
- 1v1, **best of 3 rounds**, with a **60-second round timer**. If time runs out, the fighter with more health wins.
- Health bar per fighter, plus a **"Jalsa Meter"** (super meter) with 3 bars. It fills when you deal or take damage.
- The round starts with an announcer line (*"Round 1… Dharna shuru!"*). A KO triggers a comedic, non-violent knockout animation: the loser gets "disqualified", "sent into exile", "taken off-air" and so on.

### 4.2 Controls (keyboard defaults, rebindable)

| Action | Player 1 | Player 2 | Gamepad |
|---|---|---|---|
| Move / jump / crouch | `W A S D` | Arrow keys | D-pad / left stick |
| Light attack | `F` | `K` (or Numpad 1) | X / Square |
| Heavy attack | `G` | `L` (or Numpad 2) | Y / Triangle |
| Special | `H` | `;` (or Numpad 3) | B / Circle |
| Throw | `F`+`G` | `K`+`L` | A / Cross |

- **Block:** hold *back*, as is standard in the genre. Crouch-block stops low attacks.
- **Special moves** use simple motion inputs (down→forward + Special, back→forward + Special). There's also a **"Simple mode"** where *Special + direction* performs the move, so beginners and mobile players can use them.
- **Super move:** spend 1–3 Jalsa bars with down, down + Special.

### 4.3 Combat systems (MVP)
- **Hitboxes and hurtboxes** defined for each animation frame. The game logic runs on a fixed 60 Hz tick.
- Each move has **startup, active and recovery frames**, plus hitstun, blockstun and pushback.
- **Chip damage** on blocked specials only.
- **Throws** beat blocking, and can be escaped in a short window by pressing throw at the same time.
- **Light combos:** light → light → heavy chains, and cancelling a normal into a special. No juggle system for v1.
- **Input buffer:** about 8 frames, so motion inputs feel forgiving.
- **Projectiles:** one each for characters who have one, and projectiles that collide cancel each other out.

### 4.4 Game modes

| Mode | Release | Notes |
|---|---|---|
| Local Versus (2P) | MVP | One keyboard or two gamepads |
| Versus CPU | MVP | 3 difficulty levels, rule-based AI |
| Training | MVP | Dummy opponent, hitbox display, input display |
| Arcade ("Election Campaign") | v1.1 | Beat 5 opponents, then the secret boss. Ending card per character ("You won the election… recount pending") |
| Online PvP | v1.2 | Private room code link. Peer-to-peer WebRTC with rollback netcode |
| Online quick match | v2 | Matchmaking server |

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
- Move list: 4–6 normals, 3 specials, 1 super, 1 throw
- Colour palette, plus a mirror-match alternate palette
- Voice lines: intro, 3 attack shouts, hurt, KO, win

**Not in the launch roster:** figures whose satire relies on religious themes. See §8.

## 6. Stages (launch: 4)

| Stage | Setting | Background gag |
|---|---|---|
| **D-Chowk Dharna** | Islamabad protest with shipping containers | Container sways, tear-gas clouds drift past, a chai wala keeps serving |
| **Minar Jalsa** | Huge rally at a Lahore landmark | Crowd waves flags of whoever is winning. DJ on the stage |
| **Prime-Time Studio** | TV talk show set | 6 guests shouting in split screen, "BREAKING NEWS" ticker |
| **Sea View, Karachi** | Beach at sunset | Camel rides, kites, waves, sudden load-shedding |

Stages are flat, with walls at both edges and no hazards that affect gameplay in v1.

## 7. Art, audio and UX direction

### 7.1 Visual style
- **Caricature, big head with small body** (roughly 1:2 head-to-body ratio). Bold outlines, flat colours, lots of expression. Think editorial cartoons brought to life.
- **Hand-drawn 2D sprite sheets or skeletal 2D animation.** Each character is about 180–220 px tall at 1280×720.
- **Comedy combat effects:** stars, "DHISHOOM!" text bursts, chappals and tomatoes. No blood or gore, and no realistic weapons.
- **Parody party branding:** every party gets an *altered* colour scheme and symbol (e.g. a cricket ball instead of a bat, a nihari pot instead of a tiger). **Do not use real party logos, flags or ECP election symbols as-is.**

### 7.2 Audio
- Music: dhol, qawwali-inspired and Pakistani pop-chiptune tracks. All original or properly licensed.
- Announcer in Urdu/English code-switching ("Round 2… *Fight karo*!").
- Voices: sound-alike impressionists are fine as parody, but **no clips of real speeches or broadcasts**.

### 7.3 UX and screens
Title → Mode Select → Character Select (2 cursors) → Stage Select → VS splash → Fight → Results → Rematch.

- **Languages:** English, Urdu (right-to-left support for menus) and Roman Urdu.
- A disclaimer splash on first launch (see §8), plus an always-visible "Parody" tag on the title screen.
- Shareable result card. **Stretch:** clip the last 10 seconds of a round to WebM.

## 8. Content, legal and ethics guidelines (must-have)

Political satire of public figures is a long tradition, but Pakistan's legal environment is risky. That includes PECA 2016 and its 2025 amendments, defamation law, and the blasphemy provisions of the Penal Code. The rules below are **requirements**, not suggestions. **Before public launch, have a lawyer who knows Pakistani media and cyber law review the roster, names, art and dialogue.**

1. **Parody, clearly labelled.** Disclaimer on launch: *"This is a work of satire and fiction. Characters are caricatures and do not represent the views or actions of any real person or party."*
2. **No real photos, footage, audio clips, official logos, flags or ECP election symbols.** Every asset is original artwork.
3. **Even-handed.** Every major party is included and mocked with equal intensity. Balance changes must never favour one party. Consider publishing the win rates by character.
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
| Browsers | Latest 2 versions of Chrome, Edge, Firefox and Safari (desktop) |
| Frame rate | 60 fps on a 2018-era integrated-GPU laptop |
| Simulation | Fixed 60 Hz logic tick, separated from rendering |
| Input latency | 3 frames or less from input to on-screen response, locally |
| Initial download | 15 MB or less before the title screen. Lazy-load fighters and stages |
| Resolution | 1280×720 logical, scaled with letterboxing |
| Input devices | Keyboard and the Gamepad API (XInput/DualShock). Touch controls in v1.3 |
| Offline | Optional PWA caching so local matches can be played offline |

### 9.2 Architecture principles
- **The game simulation is deterministic and isolated from rendering.** Game state is a plain serialisable object. `step(state, inputsP1, inputsP2) → state` uses no `Math.random()` (use a seeded PRNG) and preferably integer or fixed-point positions. This is what makes rollback netcode, replays and training-mode frame data possible later.
- **Data-driven characters.** Move frame data, hitboxes and properties live in JSON or YAML per character, so they can be tuned without code changes.
- **Rendering and audio are a thin layer** over the game state, provided by the chosen engine (see [ENGINES.md](./ENGINES.md)).
- **Netcode (v1.2):** peer-to-peer WebRTC data channels with rollback (GGPO-style). A small signalling server handles room codes, with STUN/TURN for NAT traversal.

### 9.3 Suggested stack
**TypeScript + Vite + Phaser 3** for rendering, input, audio and scenes. The deterministic fight simulation is written in-house. Online play adds a **WebRTC (PeerJS or plain RTCPeerConnection)** and **rollback** layer. Static hosting on Cloudflare Pages, Netlify or GitHub Pages. See [ENGINES.md](./ENGINES.md) for the alternatives and the reasoning.

### 9.4 Analytics (privacy-light)
Anonymous, cookie-less event counts: sessions, matches played, character picks, win rates by character, match length and rematch rate. No personal data.

## 10. Milestones

| Milestone | Scope | Exit criteria |
|---|---|---|
| **M0: Prototype** (2–3 wks) | 2 grey-box fighters, 1 stage, local 2P, hitboxes, health, rounds | Feels responsive, and playtesters want "one more round" |
| **M1: Vertical slice** (4–6 wks) | 2 fully art-complete fighters, 1 final stage, audio, menus, disclaimer | Shareable build. Legal review of the first 2 characters started |
| **M2: MVP launch** (8–12 wks) | 6 fighters, 4 stages, Versus, CPU, Training, English and Urdu | Legal sign-off. 60 fps on target hardware. Public launch |
| **v1.1** | Arcade mode, boss (if cleared), result share cards | — |
| **v1.2** | Online private rooms with rollback netcode | Playable at up to 120 ms RTT |
| **v1.3** | Mobile touch controls, PWA | — |

## 11. Success metrics (first 30 days after launch)

| Metric | Target |
|---|---|
| Unique players | 50k |
| Median matches per session | 4 or more |
| Rematch rate | 50% or more |
| Day-7 return rate | 15% or more |
| Character pick share | No character above 25% or below 10% (a check on balance and on fairness) |
| Social shares per 100 sessions | 5 or more |

## 12. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Legal complaint, takedown or blocking by the PTA | Medium | High | Rules in §8, legal review, hosting outside Pakistan, takedown process |
| Perceived partisanship leads to backlash or brigading | High | Medium | Even-handed roster, published balance data, equal joke intensity |
| Art pipeline is the bottleneck (most fighting-game effort is animation) | High | High | Big-head style with fewer frames (~6–10 per move). Skeletal animation as a fallback. Reuse base rigs |
| Online netcode is complex | Medium | Medium | Deterministic sim from day one. Ship local play first |
| Poor performance on low-end devices | Medium | Medium | Texture atlases, a WebGL renderer with Canvas fallback, a performance budget in CI |
| Political events date the jokes quickly | High | Low | Data-driven quips, so voice lines and win quotes are easy to update |

## 13. Open questions

1. Final title: *Siyasi Showdown*, *Jalsa Fighters* or *Dharna Dhamaka*?
2. Should the launch roster be limited to 4 fighters, to reduce art cost and legal exposure?
3. Is *The Hidden Hand* boss in or out? This depends on legal advice.
4. Should the art be hand-drawn frame by frame (more charm, more cost) or use skeletal animation (cheaper, stiffer)?
5. Monetisation: none, donations, or cosmetic skins later?
6. Which of Urdu or English is the default language for players in Pakistan?
