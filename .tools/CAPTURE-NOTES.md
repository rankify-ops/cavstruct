# Cavstruct Projects — Framer Migration Capture Notes

Source: https://cavstructprojects.com.au/ (Framer f353506)
Captured: 2026-08-04

## Site structure
Single page + anchors: #solutions, #services, #faq, #quote
Page height ~10,281px desktop.

Sections in order:
1. Header nav (Solutions, Services, Why Cavstruct, FAQ + CTA "Book Free On-Site Quote")
2. Hero — "Carpenter Gold Coast", urgency line "Book before 4pm today for next-day site inspection", phone 0432 073 632, "Available 7 Days", + quote form (Name, Email, Phone, Suburb, Brief Job Description)
3. Trust strip — Transparent pricing / Highly Rated / Reliable & Organised / Free On-Site Quote
4. Solutions (3 cards) — Residential Carpentry, Commercial Projects, Outdoor Living & Structures
5. Services grid (9 cards, lottie icons) — Framing, Lock-Up & Fix, Decking, Pergolas, Renovations, Extensions, Cladding, Commercial Fit-Outs, New Builds
6. CTA band — "Ready to start your next building project?" + Free Quotes / Fully Insured / Highly Rated
7. "YOUR LOCAL TEAM — Proud to build for our community" (images, High Quality / Full Insured)
8. Comparison — "Why Cavstruct Projects is the Smart Choice": With Cavstruct (7 green ticks) vs With other Companies (7 red crosses) — uses approved-checked + error-cross lotties
9. "BUILDING MADE SIMPLE — Reliable support from start to finish" + 3 checkmarks
10. Testimonials — "See what our customers are saying" (NEED TO CAPTURE CARDS)
11. Local coverage — map/area section "Gold Coast & Northern NSW"
12. FAQ accordion (6 questions — ANSWERS NEED CAPTURING, collapsed)
13. Footer form section — NOTE different phone 0449 506 223 + "Available 24/7" (inconsistent with hero's 0432 073 632 / "7 Days" — flag to Tom)

## Design tokens
- Brand blue: #00458A (rgb 0,69,138)
- Light blue tint bg: #F0F4FA
- Text grays: #444, #555, #767676, #888, #999, borders #DDD
- Body bg: #FFF
- H1: Figtree 600, 60px, white (on hero)
- Fonts: Figtree (headings), Geist + Inter (body/UI). 4 custom woff2 downloaded + Google-hosted Figtree/Geist.

## Assets downloaded
- assets/lottie/ — 14 Lordicon wired-outline JSONs (430x430): approved-checked, neighbourhood, review, square-footage, garage, project-estimate, wooden-floor x2, meter-measure, toolbox, real-estate-building, reliable-alt, house-lock, error-cross
- assets/images/ — 12 files incl. logo qZYE3aGnAvzVsEHMMcR3JIlBw.png (2966x584), hero/team webps, svg bg pattern
- assets/fonts/ — 4 woff2

## Solved
- FAQ: all 6 Q&A pairs extracted from JS bundle → faq-final.md
- All body copy extracted → content-dump.txt (incl. form messages "Thanks, We will contact you soon" / "Something went wrong")
- Testimonials = Wally widget (Google reviews embed), id 68f94fd8366cc000144d43d3
  → reuse: <script src="https://embed.getwally.net/embed.js"> + widget div. Platform-independent, works on any host.
- Map = standard Google Maps embed iframe (Cavstruct Projects place) — copy verbatim
- Static icons = Phosphor icons (Check, House, Building, Hammer, Phone, Shield, Seal, ArrowDown) — free, self-hostable SVGs
- Animated icons = 14 Lordicon lotties downloaded; play with lottie-web (lightweight player, self-hosted)

## Flags for Tom
- ⚠️ Phone inconsistency on live site: hero says 0432 073 632 / "Available 7 Days"; footer says 0449 506 223 / "Available 24/7". Which is right?
- Bundle contains leftover template junk ("Other Electrical Companies", SaaS FAQ, "Business Consultancy") — not rendered, ignore.
- ⚠️ Form currently POSTs to Framer's form backend — dies when leaving Framer. Need replacement (Web3Forms/Formspree free tier → email notification).

## Still to capture
- [ ] Full-page screenshots desktop + mobile (Browser pane must be visible on Tom's screen)
- [ ] Scroll/hover animation behavior (fade-ins, staggers) — visual pass during build
