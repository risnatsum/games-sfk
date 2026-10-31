# Open-source engine options for a browser fighting game

> **Decision (2026-10-31): Phaser + plain JavaScript + Vite, targeting mobile web.**
> We chose Phaser because players will mostly be on Android phones opening a shared link, so a small, fast web build matters most. The team prefers JavaScript, which rules out Godot (GDScript) and Defold (Lua). App store builds aren't planned. If they're ever wanted, Capacitor can wrap the same code. The comparison below is kept for reference.

What matters most for a browser fighting game:

1. **Runs in the browser** with a small download.
2. **Deterministic, fixed-timestep logic.** You need it for consistent frame data and, later, rollback netcode. Generic physics engines (Arcade, Matter, Box2D) are *not* what you want for fighting-game collision. Nearly every serious fighting game uses its own hitbox and hurtbox code, whatever the engine.
3. **Sprite-sheet animation**, atlases, input (keyboard and gamepad) and audio.
4. **JavaScript ecosystem**, so it's easy to deploy as a static site.
5. **Works well on mobile browsers**: touch input, small downloads, decent performance on budget Android phones.

Licences are listed as best known. Check each project's `LICENSE` before you commit to it.

## Recommendation

**Phaser + JavaScript + Vite, with a hand-written deterministic fight simulation.**

- Phaser handles the rendering (WebGL with Canvas fallback), sprite-sheet animation, scenes, input (touch, keyboard and gamepad), audio, asset loading and scaling to fit any screen. That covers all the "game shell" work.
- You write `step(state, p1Input, p2Input)` yourself, in plain JavaScript with no engine dependency. It's a few hundred lines for movement, hitboxes, hitstun and rounds, and you need it for online play anyway.
- It's the largest ecosystem of HTML5 game examples and tutorials, most of them in JavaScript. The build is small, loads fast on mobile data, and deploys to any static host.
- If app store builds are ever wanted, **Capacitor** (MIT) wraps the same web build into Android and iOS apps.

Godot or Defold would only be better for an app-first game, because they produce true native apps. That isn't the plan, and neither uses JavaScript.

## Main candidates

| Engine | Licence | Language | Browser output | Strengths for this game | Watch-outs |
|---|---|---|---|---|---|
| **[Phaser](https://phaser.io)** (v3; v4 is the newer major) | MIT | JS / TS | Native | Mature, huge community, excellent sprite and animation API, gamepad support, small bundle | No editor. Built-in physics is unsuitable for hitboxes, so write your own (recommended anyway) |
| **[Godot Engine](https://godotengine.org)** (4.x) | MIT | GDScript (C# not supported for web export) | WebAssembly export | Full editor, AnimationPlayer can key hitboxes per frame, scene system, also exports to desktop and mobile | Larger initial download (several MB of WASM). Web export has some audio and threading quirks; use single-threaded export to avoid needing cross-origin isolation headers |
| **[PixiJS](https://pixijs.com)** (v8) | MIT | JS / TS | Native | Fastest 2D WebGL/WebGPU renderer, very lightweight | Renderer only: you build input, audio, scenes and the game loop yourself |
| **[KAPLAY](https://kaplayjs.com)** (community fork of Kaboom.js) | MIT | JS / TS | Native | Fastest to prototype, very beginner friendly | Less suited to tight frame-data control and performance tuning at scale |
| **[Excalibur.js](https://excaliburjs.com)** | BSD-2-Clause | TypeScript-first | Native | Clean TypeScript API, good docs, built-in fixed-update support | Smaller community than Phaser |
| **[melonJS](https://melonjs.org)** | MIT | JS / TS | Native | Lightweight and long-lived, good sprite and tilemap support | Smaller community, fewer recent fighting-game examples |
| **[Defold](https://defold.com)** | Defold License (Apache-2.0-based, source-available, free) | Lua | Very small HTML5 builds | Excellent web performance and tiny builds, full editor | Not strictly OSI open source. Lua plus the engine's message-passing model has a learning curve |
| **[GDevelop](https://gdevelop.io)** | MIT (engine and editor) | No-code events (JS extensions) | Native HTML5 | Build without much code, good for non-programmers | Harder to implement precise frame data and rollback |

## Other options (less suited for v1)

| Engine | Licence | Why it's here | Why not for v1 |
|---|---|---|---|
| **[Bevy](https://bevyengine.org)** + **[GGRS](https://github.com/gschup/ggrs)** + **[matchbox](https://github.com/johanhelsing/matchbox)** | MIT / Apache-2.0 | Rust ECS engine, plus a ready-made **browser rollback netcode stack** (GGRS is a Rust GGPO, matchbox is WebRTC). The strongest out-of-the-box rollback option | Rust learning curve, larger WASM, younger tooling |
| **[Three.js](https://threejs.org)** / **[Babylon.js](https://babylonjs.com)** | MIT / Apache-2.0 | For a 2.5D look (3D models on a 2D plane) | 3D art pipeline is much more expensive |
| **[Cocos Creator](https://www.cocos.com/en/creator)** | Free, source on GitHub (custom licence) | Strong 2D editor, good web and mobile output | Check licence terms. English docs and community are thinner |
| **[Castagne](https://castagneengine.com)** | Open source (check licence) | A fighting-game framework built **on Godot**: frame data, hitboxes, state machines | Small project. Check maturity and how well its web export works |
| **[Ikemen GO](https://github.com/ikemen-engine/Ikemen-GO)** | MIT | Open-source MUGEN-compatible fighting engine, useful as a design and mechanics reference | Desktop only, not a browser engine |

## Networking (for online PvP, v1.2)

| Library | Licence | Use |
|---|---|---|
| **[PeerJS](https://peerjs.com)** | MIT | Simple WebRTC peer-to-peer data channels. Includes a signalling server |
| **[NetplayJS](https://github.com/rameshvarun/netplayjs)** | Permissive (check) | Rollback netcode for browser games over WebRTC. Good reference implementation |
| **[geckos.io](https://github.com/geckosio/geckos.io)** | BSD-3-Clause | UDP-like client-to-server messaging over WebRTC (for a server-authoritative model) |
| **[Colyseus](https://colyseus.io)** | MIT | Multiplayer room and matchmaking server (Node.js). Useful later for quick match |
| **[GGPO](https://github.com/pond3r/ggpo)** | MIT | The original rollback SDK (C++). Read it to understand the algorithm |
| **coturn** | BSD-3-Clause | Self-hosted TURN server for players behind strict NATs |

## Art and audio tools (free and open source)

| Tool | Use |
|---|---|
| **Krita** | Painting character art and frame-by-frame animation |
| **LibreSprite** | Pixel and sprite-sheet animation (open-source fork of Aseprite) |
| **Inkscape** | Vector caricatures, UI, parody party logos |
| **Blender** | Grease Pencil 2D animation, or render 3D models to sprites |
| **DragonBones** (runtime) | Skeletal 2D animation. Cheaper than redrawing every frame |
| **Audacity** / **Tenacity** | Voice line and sound effect editing |
| **LMMS** | Music production |
| **jsfxr** | Quick retro sound effects for prototyping |
| **TexturePacker alternatives:** `free-tex-packer` | Building sprite atlases |

## Proposed project skeleton (Phaser path)

```
src/
  sim/            # deterministic, engine-free fight logic (plain JS, unit-tested)
    state.js      #   game state shape and initial state
    step.js       #   step(state, inputs) → state
    collision.js  #   hitbox/hurtbox overlap
    rng.js        #   seeded PRNG
  data/
    fighters/     # per-fighter JSON: stats, moves, frame data, hitboxes
    stages/
  render/         # Phaser scenes that draw the game state (no game logic here)
  input/          # touch/keyboard/gamepad → per-frame input bitmask, input buffer
    touch.js      #   virtual joystick + buttons
  net/            # (v1.1) PeerJS/WebRTC friend matches
public/assets/    # sprite atlases, audio
public/manifest   # PWA manifest + icons (via vite-plugin-pwa)
```
