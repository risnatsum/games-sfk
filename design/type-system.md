# Type System

The game is a 2D one-on-one fighter. Types work the way they do in classic monster-battler games: an attack can be super-effective, normal or resisted. Here the effect is smaller, because a fight in real time can't survive ×2 damage.

## How types work in a fight

- **Every character has one type**, their *defensive type*. It decides which attacks hurt them more or less.
- **Every special move, Super and Ultimate has a type.** Most of a character's moves are their own type. Some use a second "flavour" type, so characters have options in bad matchups.
- **Normal attacks and throws have no type.**

| Result | Damage | Other effects | On screen |
|---|---|---|---|
| **Super-effective** | ×1.2 | Attacker gains +25% meter | Hit flash plus an announcer callout (see below) |
| **Normal** | ×1 | – | – |
| **Resisted** | ×0.8 | No chip damage when blocked | A grey "shrug" spark |

---

## The six types

| Type | Icon | What it represents |
|---|---|---|
| **Khaki** | Gate No. 4 | The establishment: force, agencies, "Same Page" |
| **Qanoon** (Law) | Gavel | Courts, the Election Commission, amendments, procedure |
| **Jor-Tor** (Deals) | Handshake on a briefcase | Horse-trading, fixers, defections, coalitions |
| **Mic** (Airwaves) | Microphone | Speeches, TV, social media, leaks |
| **Jalsa** (Street) | Crowd | Rallies, dharnas, long marches |
| **Khandaan** (Dynasty) | Family tree | Inherited power and vote banks |

## Type chart

Each type is strong against two types, weak against two, and neutral with one. The "Callout" column is what the announcer shouts on a super-effective hit.

| Attacker | Super-effective against | Resisted by | Neutral with |
|---|---|---|---|
| **Khaki** | Jalsa, Khandaan | Jor-Tor, Mic | Qanoon |
| **Qanoon** | Khandaan, Mic | Jor-Tor, Jalsa | Khaki |
| **Jor-Tor** | Khaki, Qanoon | Mic, Khandaan | Jalsa |
| **Mic** | Khaki, Jor-Tor | Qanoon, Jalsa | Khandaan |
| **Jalsa** | Qanoon, Mic | Khaki, Khandaan | Jor-Tor |
| **Khandaan** | Jalsa, Jor-Tor | Khaki, Qanoon | Mic |

### Why each matchup works

| Matchup | The joke / real-world logic | Callout |
|---|---|---|
| Khaki beats **Jalsa** | Containers on every road. Section 144. | **"CONTAINER'D!"** |
| Khaki beats **Khandaan** | 1977, 1999. Ask any family in exile. | **"EXILED!"** |
| Qanoon beats **Khandaan** | Disqualification: Panama, the iqama, Gilani's contempt case. | **"DISQUALIFIED!"** |
| Qanoon beats **Mic** | Contempt of court: say the wrong thing on a stage and lose your seat. | **"CONTEMPT!"** |
| Jor-Tor beats **Qanoon** | NROs and NAB amendments make cases disappear. | **"NRO!"** |
| Jor-Tor beats **Khaki** | Every chief's extension needs a vote in Parliament. | **"EXTENSION!"** |
| Mic beats **Khaki** | "Neutral to janwar hota hai." A hashtag outlasts a press release. | **"TRENDING!"** |
| Mic beats **Jor-Tor** | Leaks: Panama Papers, audio leaks, sting videos. | **"LEAKED!"** |
| Jalsa beats **Qanoon** | The Lawyers' Movement brought a chief justice back. | **"RESTORED!"** |
| Jalsa beats **Mic** | The talk shows called it off and the crowd turned up anyway. | **"FINAL CALL!"** |
| Khandaan beats **Jalsa** | Inherited vote banks turn up on schedule. | **"ZINDA HAI!"** |
| Khandaan beats **Jor-Tor** | Fixers come and go. The family stays. | **"FAMILY FIRST!"** |

The three neutral pairs:
- **Khaki and Qanoon:** the Doctrine of Necessity. They always end up on the same bench.
- **Jor-Tor and Jalsa:** every dharna ends in a signed deal, and every deal ends in a dharna.
- **Mic and Khandaan:** every dynasty runs a media cell, and every channel belongs to a family.

---

## Core fight systems

| System | In-game name | Notes |
|---|---|---|
| Health bar | **Awaam** (public support) | Standard health is 1,000. Characters range from 900 to 1,100. |
| Super meter | **Political Capital** | 3 bars. Spend 1 on a Super, 3 on an Ultimate, ½ on an enhanced (EX) special. |
| Round win | "Elected" | The loser's portrait gets a ballot-box stamp. |
| Time-out win | "Form 47" | The winner is whoever the screen says it is. |
| Character gauge | Unique to each character | e.g. Altaf's Call Duration |

## Debuffs

Debuffs are short and time-based, and they come from specific moves.

| Debuff | Effect | Default length | Based on |
|---|---|---|---|
| **Muted** | Can't use Mic specials. | 3 s | Internet shutdowns, broadcast bans |
| **Container'd** | Can't back-dash or jump backwards. | 3 s | Container blockades |
| **U-Turn** | Left and right controls are swapped. | 2 s | "A leader who doesn't take U-turns isn't a leader" |
| **Contempt Notice** | The next special whiffs and gives the user recoil damage. | Until used | Contempt convictions for things said on stage |
| **Selected** | Slow Awaam drain. It passes to the opponent the next time you land a hit. | Until passed | "Selected, not elected", passed from PM to PM |

## Stage hazards

Hazards are optional, and can be switched off for competitive play.

| Hazard | Effect |
|---|---|
| **Load-shedding** | Every 30 seconds the stage goes dark for 2 seconds and only projectiles are visible. |
| **Same Page** | A giant sheet of A4 slides onto the floor for 10 seconds. Whoever stands on it does +10% damage with Khaki moves. |
| **Midnight Price Change** | The super meter's cost changes at random for 5 seconds. A calm voice says "Global factors." |

---

## Provisional types

This is a first pass for review.

| Character | Type | Flavour type for some moves | Archetype |
|---|---|---|---|
| Altaf Hello-sain | Mic | Jalsa | Zoner / Stance |
| Imran U-Khan | Jalsa | Mic | Rushdown |
| Mian Nashtaaz Sharif | Khandaan | Jor-Tor | Setplay |
| Speedbaz Sharif | Khandaan | Khaki | Rushdown |
| Maryam Nawazish Sharif | Khandaan | Mic | Zoner |
| Asif Ali Bhari | Jor-Tor | Khandaan | Trap / Counter |
| Barishwal Bhutto Zardari | Khandaan | Mic | All-rounder |
| Maulana Fazl-e-Hukumat | Jor-Tor | Jalsa | Grappler |
| Mohsin Naka-vi | Khaki | Jor-Tor | Setplay (containers) |
| Qazi Faisla Isa | Qanoon | – | Counter |
| Sikandar Saintaalis Raja | Qanoon | – | Time-control |
| Field Marshal Aseem Lamehdood (boss) | Khaki | Qanoon | Boss |
