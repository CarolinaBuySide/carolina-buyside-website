# Firm logos

These power the "Where our members have worked" marquee on the homepage.
The marquee is currently **on** (`data-logos="on"` on the `.marquee` div in
`index.html`). Set it to `"off"` to fall back to text wordmarks.

## Current files

| Firm            | File                  |
| --------------- | --------------------- |
| Millennium      | `millennium.svg`      |
| Bank of America | `bank-of-america.svg` |
| Roark Capital   | `roark-capital.svg`   |
| Guggenheim      | `guggenheim.svg`      |
| Jefferies       | `jefferies.svg`       |
| Level Equity    | `level-equity.svg`    |
| J.P. Morgan     | `jp-morgan.svg`       |
| Houlihan Lokey  | `houlihan-lokey.svg`  |
| Deutsche Bank   | `deutsche-bank.svg`   |

Any firm whose file is missing quietly falls back to its text wordmark, so you
can replace them one at a time.

## IMPORTANT: these are recreations, not official logos

The pack these came from stated it plainly: *"lightweight web-ready SVG
recreations intended for website layout/prototyping... For production use,
replace with each firm's official brand asset."*

They are firm names set in **system fonts** (Georgia, Arial, Arial Black) with
approximated brand colours and simplified marks. They read correctly at a glance
but they are not the real trademarks, and the letterforms are visibly wrong up
close.

Two local fixes were applied on install:

- `bank-of-america.svg` - the flag mark sat on top of the final "A" (text runs to
  x=971, flag started at x=887). Flag moved to x=1020, canvas widened to 1270.
- `level-equity.svg` - the pack's version was only the word "LEVEL". Replaced with
  a rebuild from Marc's reference image: navy plate with white "LEVEL", followed by
  "EQUITY" in navy on transparent.

**Recommended:** replace these with official assets from each firm's newsroom or
brand/media page before treating the site as final. Drop the real file in using
the same filename and it swaps automatically - no code change needed. If a
replacement is a `.png`, update that firm's `data-logo` attribute in `index.html`.

## Specs

- Transparent background. Logos display in **full brand colour at all times** -
  no grayscale filter and no hover colour change.
- Rendered at 34px tall, capped at 170px wide, `object-fit: contain`.
- The strip scrolls continuously and does **not** pause on hover.

## Trademark note

Using a firm's logo to state factually that a member worked there is normal for a
club placements page, but the marks remain their trademarks. Keep them
unmodified, don't recolour them, and don't arrange them to imply the firm
sponsors or endorses Carolina BuySide.
