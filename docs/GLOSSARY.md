# Game-dev glossary

Plain-language definitions of terms we use. We'll add to it as we go.

## Core ideas

| Term | Meaning |
|---|---|
| **Frame** | One "tick" of the game. At 60 frames per second (fps), one frame is about 16.7 milliseconds. Fighting games measure everything in frames |
| **Game loop** | The heartbeat of the game. Every frame it reads input, updates the game state, and draws the screen |
| **Fixed timestep** | The game logic always advances in identical 1/60-second steps, even if drawing is slower. That keeps the fight identical on fast and slow phones |
| **Game state** | Everything needed to describe the fight at one moment: positions, health, meter, which move each fighter is doing and how far into it, the timer |
| **Simulation (sim)** | The code that turns *state + inputs → next state*. It's the "rules of the universe", separate from drawing |
| **Rendering** | Drawing the state on screen: sprites, effects, UI. It never changes the state |
| **Deterministic** | The same starting state plus the same inputs always gives exactly the same result, on every device. This is essential for online play and replays |
| **Seeded random (PRNG)** | "Random" numbers that come out the same on both phones because they start from the same seed |

## Fighting-game terms

| Term | Meaning |
|---|---|
| **Hitbox** | An invisible rectangle where an attack can hit. Usually shown in red in debug view |
| **Hurtbox** | An invisible rectangle where a fighter can *be* hit. Usually shown in blue or green |
| **Pushbox** | The rectangle that stops two fighters walking through each other |
| **Startup / active / recovery** | A move's three phases: the wind-up before it can hit, the frames where it can hit, and the frames after, where you're vulnerable |
| **Frame data** | The numbers for each move: startup, active and recovery frames, damage, hitstun and so on |
| **Hitstun / blockstun** | How many frames the defender is stuck after being hit or after blocking |
| **Hitstop** | A tiny freeze (a few frames) for both fighters when a hit lands. It makes hits feel powerful |
| **Frame advantage** | Who can act first after a move ends. Positive means your turn, negative means theirs |
| **Combo** | A sequence of hits the opponent can't escape, because each hit lands during the hitstun of the previous one |
| **Cancel** | Interrupting one move to start another, e.g. punch → special |
| **Damage scaling** | Each later hit in a combo does less damage, which prevents brutally long combos |
| **Chip damage** | Small damage taken even while blocking (from specials, in our game) |
| **Anti-air** | A move that's good at hitting someone jumping at you |
| **Zoner / rushdown / grappler** | Play styles: keep away with projectiles / pressure up close / grab and throw |
| **Meter** | The resource bar (our "Jalsa Meter") spent on Supers and Ultimates |
| **Input buffer** | Remembering a button press for a few frames, so it still counts if pressed slightly early |
| **Motion input** | A joystick gesture for a special move, e.g. down → forward + button. We use simpler inputs on touch |

## Online play

| Term | Meaning |
|---|---|
| **Netcode** | The code that keeps two players' games in sync over a network |
| **Latency / ping / RTT** | How long a message takes to reach the other phone. RTT (round-trip time) is there and back |
| **Lockstep** | Both phones advance only when they have both players' inputs for that frame |
| **Input delay** | Deliberately applying your input a few frames later, so the opponent's input has time to arrive |
| **Rollback** | Predict the opponent's input, run ahead, and if the prediction was wrong, rewind and re-simulate. The modern standard for fighting games |
| **Desync** | The two phones' simulations disagree, so the players are effectively in different fights. Prevented by determinism and detected with checksums |
| **Checksum** | A short fingerprint of the game state. Both phones compare fingerprints to catch desyncs |
| **Peer-to-peer (P2P)** | The phones talk directly to each other, without a game server in between |
| **WebRTC** | The browser technology that lets two browsers connect directly (used for video calls, and for us) |
| **Signalling server** | A matchmaker that introduces two browsers so they can connect directly |
| **STUN / TURN** | STUN helps a phone discover its public address. TURN is a relay, used when a direct connection is impossible |
| **NAT** | How routers and mobile networks share one public address among many devices. It's why connecting directly is sometimes hard |

## Tools and the web

| Term | Meaning |
|---|---|
| **Phaser** | Our game engine: drawing, input, sound, scenes |
| **Vite** | The build tool. It bundles our code for the browser and runs a dev server that reloads instantly |
| **npm** | JavaScript's package manager: how we install Phaser, PeerJS and other libraries |
| **PWA** | Progressive Web App: a website that can be installed to the home screen and work offline |
| **Deploy** | Publishing a build to a URL where people can play it |
| **Branch / commit / push** | Git basics: a branch is a line of work, a commit is a saved snapshot, and pushing sends it to GitHub |
| **Atlas** | One image containing many small images (sprite parts), which is faster for the GPU |
| **Cut-out / puppet animation** | Animating a character drawn as separate parts by moving and rotating the parts, rather than redrawing each frame |
| **Rig** | The skeleton (part hierarchy) a cut-out character is attached to |
