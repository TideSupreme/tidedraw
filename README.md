# TideDraw

## Why use it

Every major brand running a sweepstakes eventually gets accused of rigging the draw. The winner was hand-picked. The list was manipulated. The random number wasn't random. And you know what? They're right to be suspicious — because today, someone always holds the full list and pushes the button.

We built TideDraw. Companies and event hosts run perk drawings, customer raffles, and sweepstakes where the winner is chosen by the Tide network itself — not the organizer.

Here's how it works. Entrants prove eligibility through TideCloak without ever revealing their identity. Their entry is sealed with doEncrypt — the organizer literally cannot read it. When it's time to draw, we execute under a DPoP-bound session, so even if that token is stolen, it's useless for rigging. The outcome is cryptographically verifiable by any outsider afterward. No custodian, no auditor, no possibility of interference.

What makes this possible only with Tide? Self-encryption means we never possess the plaintext — that's the doEncrypt primitive. DPoP-bound tokens mean session theft is a non-event — that's the device-binding primitive. No other auth or encryption stack gives you both in one token lifecycle.

The market? Every Fortune 500 running employee perks, every conference running prize drawings, every government running public lotteries. They're already spending six figures on auditors. We cut that to zero while increasing trust.

## What it is

A [Next.js](https://nextjs.org) app secured with [TideCloak](https://tidecloak.com) — decentralized identity where keys are split across a network, so **no single server (not even this app) ever holds a usable copy**. Login, sessions, and the app's sensitive data are protected by that model.

## Prerequisites

- **Node.js 20+**
- **Docker** (to run TideCloak locally)
- **`jq`** and **`curl`** (used by the init script)

## Run it locally

**1. Start TideCloak** (the public dev image — has a pre-configured entrypoint, do *not* append `start-dev`):

```bash
docker run -d --name tidecloak -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=password \
  tideorg/tidecloak-dev:latest

# wait until it answers:
until curl -sf http://localhost:8080 >/dev/null; do sleep 3; done
```

**2. Install and initialise** (the init script wires up TideCloak — see below):

```bash
cd app
npm install
npm run init
```

**3. Start the app:**

```bash
npm run dev
```

Open **http://localhost:3000**.

## Initialising TideCloak (what `npm run init` does)

`npm run init` runs [`init/tcinit.sh`](app/init/tcinit.sh) against your local TideCloak and:

- creates the **`nextjs-test`** realm and the **`myclient`** client,
- enables the **Tide IdP** and **IGA** (identity governance),
- creates an **`admin`** user and prints an account-link invite,
- writes the adapter config to **`tidecloak.json`**, which the app reads.

TideCloak admin console: **http://localhost:8080** (`admin` / `password`).

## Using it

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

---

Built on [TideCloak](https://tidecloak.com). The product story is in **[pitch.md](pitch.md)**.
