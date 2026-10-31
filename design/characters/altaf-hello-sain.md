# Altaf Hello-sain

*Sample sheet. Filled in from `design/character-template.md`.*

## 1. Identity

| Field | Value |
|---|---|
| Parody name | Altaf Hello-sain |
| Alt name / nickname | "Bhai-Fi" |
| Based on (internal) | Altaf Hussain, MQM founder and leader of MQM-London |
| Faction | London Office (MQM-Landline) |
| Types | **Mic / Jalsa** |
| Class / role | Remote Summoner |
| Home arena | Karachi. He fights from a picture-in-picture window and never sets foot on the battlefield. |

**Bio.** He founded his party and has been in London since 1992, and he runs it by telephone and nothing else. His call-in addresses are legendary: they last for hours, while crowds in Karachi stand in disciplined silence as he sings, sobs, changes voices and sometimes changes his mind. A 2015 court order bars Pakistani media from airing him, so in the game he is muted on state TV and loud everywhere else. His old party broke away in 2016. London Office kept the phone.

## 2. Taglines

- **Main tagline:** "Live from London. Still on line one."
- **Alternates:**
  - "Your call is important to him. Please hold."
  - "Banned on every channel. Heard on all of them."
  - "6,000 km away. Speech length: also roughly 6,000 km."
- **Loading-screen tip:** "Altaf Hello-sain's Phone-In Address runs for 2–5 turns. Bring snacks. Do not leave the jalsa."

## 3. Stats

| Awaam | Muscle | Cover | Rhetoric | Thick Skin | Speed | Total |
|---|---|---|---|---|---|---|
| 6 | 3 | 7 | 10 | 7 | 3 | **36** |

**Why these numbers:** his Rhetoric is the best in the game. He is hard to reach (Cover 7) because he is in another country. His Speed is low because no speech of his has ever been short.

## 4. Moveset

| Move | Type | Category | Power | Accuracy | Uses | Effect | Anchor |
|---|---|---|---|---|---|---|---|
| **Hello? Hello?** | Mic | Status | – | – | 20 | +1 Rhetoric. He moves last next turn while he checks the line. | Famously opened his calls by checking whether the crowd could hear him. |
| **Phone-In Address** | Mic | Rhetoric | 40 per turn | 100% | 5 | He is locked in for 2–5 turns (random) and hits every turn. The opponent loses 1 Speed each turn as the crowd stands frozen, and can't switch out while it runs. | Hours-long telephone speeches to silent, disciplined crowds. |
| **Ek Gaana Sunata Hoon** (Let me sing you a song) | Mic | Status | – | 100% | 10 | Adds 2 turns to an active Phone-In Address and heals 15% Awaam as the crowd sings along. Fails if no Phone-In is running. | He sang during his addresses. |
| **Rehnuma Chahiye** (We want the leader) | Jalsa | Power | 70 | 90% | 10 | Gains +20 power for each turn the current Phone-In has been running, up to 150. | The party slogan "Hum ko manzil nahin, rehnuma chahiye". |
| ★ **Line One from London** | Mic | Rhetoric | 120 | 100% | 1 per battle | Turn 1: he goes off-screen ("Connecting to London…") and can't be targeted. Turn 2: he strikes. Ignores Load-shedding. | In self-exile in London since 1992 and still addressing Karachi. |

## 5. Abilities

- **Passive: Already Banned.** He is immune to the **Muted** status, and his Mic moves ignore **Load-shedding** because the call is on a UK line. *Anchor:* the 2015 Lahore High Court order barring Pakistani media from airing him.
- **Weakness: Dropped Call.** At the end of every third turn there's a 30% chance the line drops. Any Phone-In Address in progress ends at once and his Rhetoric boosts reset. *Anchor:* hours-long calls on international lines.

## 6. Matchups

**From types (Mic / Jalsa):**
- **Takes ×2 from:** Jalsa ("the street he built walked away") and Khandaan.
- **Resists (×½):** Jor-Tor and Mic. You can't leak a man who says everything live.
- **Neutral (×1):** Khaki and Qanoon. Each of his two types cancels the other out.
- **Strong attacking into:**
  - With Mic moves: Khaki and Jor-Tor.
  - With Jalsa moves: Qanoon and Mic.

**Rivals:**

| Rival | Modifier | Pre-battle exchange |
|---|---|---|
| Mustafa Kamaal-Hai (MQM-Partially) | His Jalsa moves deal ×½: they kept the crowd and he kept the phone. | **Altaf:** "Hello? Mustafa? Mere hi microphone se mere khilaaf?" (Hello? Mustafa? Against me, on my own microphone?)<br>**Kamaal:** "Bhai, ab microphone ka bill hum bharte hain." (Bhai, we pay the mic bill now.) |
| Farooq Ek-Ghanta Sattar (MQM-Partially) | His Jalsa moves deal ×½. | **Farooq:** "Bhai, main siyasat chhor raha hoon." (Bhai, I'm quitting politics.)<br>**Altaf:** "Theek hai. Ek ghante baad call karna." (Fine. Call me back in an hour.) |
| Kamran Khan Tessurili (MQM-Partially) | His Jalsa moves deal ×½. | **Tessurili:** "Governor House mein aap ka swagat hai!" (Welcome to Governor House!)<br>**Altaf:** "Main to London mein hoon. Speaker pe daal do." (I'm in London. Put me on speaker.) |

**Allies:** none in Pakistan. His tag-team partner is an NPC, the **Loyal Speakerphone**, which doesn't fight but gives +1 Awaam to any ally on the same team.

## 7. Visual design

- **Silhouette:** a small seated figure in an armchair beside a huge rotary phone. A very long phone cord trails out of frame. It should read instantly even in black and white.
- **Battle presentation:** he never stands on the battlefield. A giant phone receiver stands on a Karachi stage, and he appears in a picture-in-picture window above it with VHS scanlines. Through the window behind him: London drizzle and a red phone box.
- **Palette:** drizzle grey and phone-box red, the faction colours.
- **Outfit:** a cosy cardigan over a shirt.
- **Signature props:** a rotary phone with an impossibly long cord stretching across a world map, a headset mic, and a mug of tea.
- **Exaggerations:** oversized glasses and a bigger moustache. Both are chosen features, so they're fair game.
- **Expressions:** a conspiratorial whisper, a sudden roar, tearful, mid-song with eyes closed, and squinting at a bad line.

**Animations**

| State | Description |
|---|---|
| Idle | He paces inside the window while the cord slowly wraps around the armchair. |
| Attack | The window grows to stadium-screen size, and crowd sprites freeze mid-motion. |
| Signature | The window goes black with "Connecting to London…" and an old dial-up spinner, then bursts back to fill the screen. |
| Hit | The picture breaks up into static and the audio crackles. |
| Knocked out | The screen shows "Call Ended", with a call timer reading 4h 37m. |
| Victory | He sings into the receiver while the crowd stays frozen and doesn't dare move. |

## 8. Audio

- **Voice direction:**
  - Theatrical, with long pauses, swinging from a whisper to a shout without warning, and the occasional burst into song.
  - **All lines go through a telephone filter** (narrow EQ and light crackle).
  - Cast a voice impressionist, never an AI voice clone.
- **Theme motif:** a hold-music arrangement of a rousing anthem-style melody, like lift music. When a Jalsa move lands, it cuts to full dhol and crowd.
- **Signature sound effects:** rotary-dial clicks used as a rhythm, international-call pips, a dial tone, line crackle, and an old answering-machine beep.

**Voice lines**

| Trigger | Line |
|---|---|
| Select | "Hello? Hello? Saathiyon, awaaz aa rahi hai?" (Hello? Hello? Comrades, can you hear me?) |
| Move use (Phone-In Address) | "Ab main aap ko ek baat batata hoon… phir doosri… phir teesri." (Now let me tell you one thing… then a second… then a third.) |
| Signature | "London se, line number ek." (From London, line one.) |
| Hit | "Line mein disturbance hai." (There's disturbance on the line.) |
| Low Awaam | "Koi hai? Karachi? Koi to bolo!" (Anyone there? Karachi? Somebody say something!) |
| Knocked out | "Hello?… Hello?…" *[dial tone]* |
| Victory | "Ab main aap ko ek gaana sunata hoon." (Now I'll sing you a song.) *[the hold music swells]* |
| Taunt | "Main band hoon? Nahin bhai, TV band hai. Main to bol raha hoon." (I'm banned? No, brother, the TV's switched off. I'm still talking.) |
| Taunt 2 | "Yeh prepaid call hai, jaldi khatam karna hai." (This is a prepaid call, I have to wrap up quickly.) *[Phone-In gets +2 turns]* |

## 9. Sensitivity and fact-check

- **Out of bounds:**
  - Health, hospital visits or illness.
  - Any violence or extortion allegations, and the UK murder and money-laundering investigations.
  - The content of the 22 August 2016 speech. Only the fact that the party split may be referenced.
  - Religious honorifics or the "Pir Sahib" mystique.
  - The Nine Zero headquarters as a set.
- **Facts to recheck before release:**
  - The 2015 Lahore High Court media ban is still in force.
  - He is still in London and still leads MQM-London.
  - "Bhai-Fi" doesn't clash with any existing use of the nickname.
- **Distribution flag:** the media ban may affect marketing that features him in Pakistan. Check with a lawyer.
