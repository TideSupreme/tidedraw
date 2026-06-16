Hello, Sharks!

Every major brand running a sweepstakes eventually gets accused of rigging the draw. The winner was hand-picked. The list was manipulated. The random number wasn't random. And you know what? They're right to be suspicious — because today, someone always holds the full list and pushes the button.

We built TideDraw. Companies and event hosts run perk drawings, customer raffles, and sweepstakes where the winner is chosen by the Tide network itself — not the organizer.

Here's how it works. Entrants prove eligibility through TideCloak without ever revealing their identity. Their entry is sealed with doEncrypt — the organizer literally cannot read it. When it's time to draw, we execute under a DPoP-bound session, so even if that token is stolen, it's useless for rigging. The outcome is cryptographically verifiable by any outsider afterward. No custodian, no auditor, no possibility of interference.

What makes this possible only with Tide? Self-encryption means we never possess the plaintext — that's the doEncrypt primitive. DPoP-bound tokens mean session theft is a non-event — that's the device-binding primitive. No other auth or encryption stack gives you both in one token lifecycle.

The market? Every Fortune 500 running employee perks, every conference running prize drawings, every government running public lotteries. They're already spending six figures on auditors. We cut that to zero while increasing trust.

Sharks, we're raising your vote to bring verifiable fairness to every draw on earth. Who's in?