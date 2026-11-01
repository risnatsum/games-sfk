# games-sfk

Browser-based 2D fighting game featuring caricature parodies of Pakistani political figures and parties.

- [Product Requirements Document](docs/PRD.md)
- [Roster: 11 fighters + boss](docs/ROSTER.md), with [character sheets](design/characters/) and [types](design/type-system.md)
- [Decision log](docs/DECISIONS.md): every decision, with the reasoning
- [Game-dev glossary](docs/GLOSSARY.md)
- [Open-source engine options](docs/ENGINES.md)
- [Pakistan political landscape research](research/pakistan-political-landscape.md)

## Run it

```sh
npm install
npm run dev     # opens on your computer and on any phone on the same Wi-Fi (use the Network URL)
npm test        # fight simulation tests
npm run build   # production build in dist/
```

Code layout: `src/sim` is the deterministic fight logic (no Phaser), `src/data/fighters` holds each fighter's moves as JSON, `src/input` turns keyboard and touch into inputs, `src/ai` is the CPU, and `src/render` draws it all with Phaser.
