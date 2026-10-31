# Type System

Every character has one or two **types**. Types decide matchups the way they do in classic monster-battler games: an attack can be super-effective, normal, or resisted.

**Assumed battle format** (change this if the game goes another way): turn-based 1v1 battles, a team of 3, switching allowed, and each character has 4 moves plus a Signature.

---

## The six types

| Type | Icon | What it represents | Example powers |
|---|---|---|---|
| **Khaki** | Gate No. 4 | The establishment: force, agencies, "Same Page" | Containers, Section 144, press releases from ISPR |
| **Qanoon** (Law) | Gavel | Courts, the ECP, amendments, procedure | Disqualification, stay orders, contempt notices |
| **Jor-Tor** (Deals) | Handshake on a briefcase | Horse-trading, fixers, defections, coalitions | NROs, extension votes, midnight coalition-building |
| **Mic** (Airwaves) | Microphone | Speeches, TV, social media, leaks | Talk shows, trends, audio leaks, phone-in addresses |
| **Jalsa** (Street) | Crowd | Rallies, dharnas, long marches | Sit-ins, "final calls", D-Chowk |
| **Khandaan** (Dynasty) | Family tree | Inherited power and vote banks | "Bhutto zinda hai", the party as family business |

## Type chart

Rows are the **attacking** move's type, columns are the **defender's** type. ×2 = super-effective, ×½ = resisted.

| Attack ↓ / Defender → | Khaki | Qanoon | Jor-Tor | Mic | Jalsa | Khandaan |
|---|---|---|---|---|---|---|
| **Khaki** | 1 | 1 | ½ | ½ | **2** | **2** |
| **Qanoon** | 1 | 1 | ½ | **2** | ½ | **2** |
| **Jor-Tor** | **2** | **2** | 1 | ½ | 1 | ½ |
| **Mic** | **2** | ½ | **2** | 1 | ½ | 1 |
| **Jalsa** | ½ | **2** | 1 | **2** | 1 | ½ |
| **Khandaan** | ½ | ½ | **2** | 1 | **2** | 1 |

It is balanced by construction: every type is strong against two types, weak against two, and neutral with one.

### Why each matchup works

| Matchup | The joke / real-world logic |
|---|---|
| Khaki beats **Jalsa** | Containers on every road. Section 144. |
| Khaki beats **Khandaan** | 1977, 1999. Ask any family in exile in London or Jeddah. |
| Qanoon beats **Khandaan** | Disqualification: Panama, the iqama, Gilani's contempt case. |
| Qanoon beats **Mic** | Contempt of court: say the wrong thing on a stage and lose your seat. |
| Jor-Tor beats **Qanoon** | NROs and NAB amendments make cases disappear. |
| Jor-Tor beats **Khaki** | Every chief's extension needs a vote in Parliament, and votes can be arranged. |
| Mic beats **Khaki** | "Neutral to janwar hota hai." A hashtag outlasts a press release. |
| Mic beats **Jor-Tor** | Leaks: Panama Papers, audio leaks, sting videos. |
| Jalsa beats **Qanoon** | The Lawyers' Movement brought a chief justice back. |
| Jalsa beats **Mic** | The talk shows called it off and the crowd turned up anyway. |
| Khandaan beats **Jalsa** | Inherited vote banks turn up on schedule, every time. |
| Khandaan beats **Jor-Tor** | Fixers come and go. The family stays. |
| Khaki ↔ Qanoon neutral | The Doctrine of Necessity: they always end up on the same bench. |
| Jor-Tor ↔ Jalsa neutral | Every dharna ends in a signed deal, and every deal ends in a dharna. |
| Mic ↔ Khandaan neutral | Every dynasty runs a media cell, and every channel is owned by a family. |

### Rules

- **Dual types:** multiply both columns. A move can deal ×4 or ×¼.
- **Home Turf bonus:** a move that matches one of the user's own types gets ×1.5.

---

## Stats

Each stat is scored 1–10. A normal playable character has a **budget of 36** (an average of 6). Boss characters can go over budget.

| Stat | Battle role | What it means in-world |
|---|---|---|
| **Awaam** (Support) | HP | Public support. When it hits 0, you're out of office. |
| **Muscle** | Physical attack | Crowds, force, machinery |
| **Cover** | Physical defence | Legal and institutional protection |
| **Rhetoric** | Special attack | Speeches, spin, narrative |
| **Thick Skin** | Special defence | Resistance to scandal and ridicule |
| **Speed** | Turn order | How fast you act (or U-turn) |

**Move categories:**
- **Power** moves use Muscle against Cover.
- **Rhetoric** moves use Rhetoric against Thick Skin.
- **Status** moves deal no damage.

---

## Status effects

A character can have one status at a time.

| Status | Effect | Based on |
|---|---|---|
| **Muted** | Can't use Mic moves for 2 turns. | Internet shutdowns, broadcast bans |
| **Selected** | Loses 1/16 of Awaam each turn. Passes to whoever knocks them out. | "Selected, not elected", passed from PM to PM |
| **U-Turn** | 1 in 3 chance each turn that the move hits its own user. | "A leader who doesn't take U-turns isn't a leader" |
| **Container'd** | Can't switch out and Speed is halved, for 2–4 turns. | Container blockades on every route |
| **Contempt Notice** | The next Rhetoric move deals no damage and gives the user recoil damage. | Contempt convictions for things said on stage |

## Field effects

A field effect covers the whole arena for a few turns.

| Field | Effect | Based on |
|---|---|---|
| **Load-shedding** (3 turns) | Mic moves lose half their power. The screen goes dark for a moment each turn. | Power cuts |
| **Same Page** (5 turns) | Khaki moves get ×1.5. Any character allied with Khaki gets +1 Cover. | The "Same Page" boast |

---

## Provisional type assignments

This is a first pass for review. It will be confirmed sheet by sheet.

| Character | Type 1 | Type 2 |
|---|---|---|
| Altaf Hello-sain | Mic | Jalsa |
| Imran U-Khan | Jalsa | Mic |
| Mian Nashtaaz Sharif | Khandaan | Jor-Tor |
| Speedbaz Sharif | Khandaan | Khaki |
| Maryam Nawazish Sharif | Khandaan | Mic |
| Asif Ali Bhari | Jor-Tor | Khandaan |
| Barishwal Bhutto Zardari | Khandaan | Mic |
| Maulana Fazl-e-Hukumat | Jor-Tor | Jalsa |
| Field Marshal Aseem Lamehdood (boss) | Khaki | Qanoon |
| Mohsin Naka-vi | Khaki | Jor-Tor |
| Qazi Faisla Isa | Qanoon | (none) |
| Sikandar Saintaalis Raja | Qanoon | (none) |
