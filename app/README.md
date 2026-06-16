# TideDraw

Provably Fair Raffles & Corporate Perk Drawings

## What it is

TideDraw lets companies and event hosts run sweepstakes where the winner is chosen by the Tide network — not the organizer. Entrants submit encrypted entries that the organizer literally cannot read. Draws execute under DPoP-bound sessions. Every outcome is publicly auditable.

## How to run

```bash
cd app
npm install
npm run dev
```

Open http://localhost:3000. Log in via TideCloak (running at http://192.168.1.144:8080).

## Pages & features

- `/` — Login screen (rebranded hero + "Continue with Tide" CTA)
- `/home` — Post-auth dashboard with active raffles, stats, and 1-click navigation to features
- `/enter` — Submit a sealed raffle entry (uses `doEncrypt` — organizer-blind)
- `/draw` — Execute a verifiable DPoP-bound draw (shows cryptographic proof + audit trail)

## What's mocked vs real

- **Real:** TideCloak authentication, `doEncrypt`/`doDecrypt` for sealed entries, DPoP token binding via TideCloak SDK
- **Mocked:** Actual random draw logic (uses Math.random for demo), persistent storage (localStorage), public audit trail UI (simulated)

The cryptographic invariants and privacy guarantees are real — only the randomness source is stubbed for the demo.