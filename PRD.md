# PRD: Imprenta Republicana — Cuidemos el Voto

## Overview

Website for **Imprenta Republicana**, a Colombian political movement. The primary launch initiative is **"Cuidemos el Voto"**, a fundraising campaign to cover transport costs for rural voters to reach polling stations for the second-round presidential election on **June 21, 2026**.

**Domain:** imprentarepublicana.co
**Tech stack:** Astro, hosted on cPanel
**Deadline:** Before June 21, 2026

---

## Goals

1. Collect donations via Nequi / Bancolombia (no payment gateway — every peso goes to transport, not platform fees)
2. Receive structured requests from people who need transport money via a Google Form
3. Display a live transparency dashboard showing funds collected
4. Build trust through transparency reporting (including first-round results)
5. Establish imprentarepublicana.co as a scalable shell for future campaigns

---

## Site Structure

### 1. Home / Hero
- Minimal Imprenta Republicana branding
- Immediately funnels visitors to the Cuidemos el Voto campaign
- Bold, poster-style hero with campaign name and a clear CTA

### 2. Cuidemos el Voto (main campaign page/sections)

#### 2a. Que es / Por que
- Brief explanation of the initiative
- Context: rural voters in Colombia can't afford transport to polling stations
- First-round results as social proof

#### 2b. Como Donar
- Nequi QR code (prominently displayed, scannable)
- Bancolombia account details (account number, type, holder name)
- Trust message: "Cada peso va al transporte, no a comisiones de plataforma"

#### 2c. Transparencia
- **Dashboard with live numbers** (fetched from Google Sheet at build time):
  - **Total recaudado** — big, prominent number (updated daily by team)
  - Phase 2 (last week before election, ~June 14-15): add **Votos pidiendo ayuda** (auto-counted from form responses) and **Total necesitado** (sum of form "monto estimado" field)
- **Primera vuelta report**: downloadable PDF of the transparency report from May 2026
- Link to full Google Sheet for maximum transparency (optional)

#### 2d. Solicitar Apoyo
- Embedded Google Form with the following fields:
  - Nombre completo (text)
  - Cedula (number)
  - Telefono / WhatsApp (text)
  - Departamento (dropdown)
  - Municipio (text)
  - Vereda / corregimiento (text)
  - Puesto de votacion (text)
  - Cuantas personas se benefician? (number)
  - Que tipo de transporte necesitan? (dropdown: bus, lancha, moto, mixto, otro)
  - Monto estimado necesario COP (number)
  - Contexto / situacion (long text)

### 3. Contacto
- Instagram link
- WhatsApp link for general inquiries

### 4. Footer
- Imprenta Republicana branding
- Social media links

---

## Data Architecture

### Google Sheet (single sheet, two tabs)

**Tab 1: "Transparencia"** (manually updated daily by team)

| Fecha | Total recaudado |
|-------|----------------|
| 2026-06-01 | 8000000 |
| 2026-06-02 | 16000000 |

- Post-disbursement phase: add columns for "Total entregado" and "Personas apoyadas"

**Tab 2: "Solicitudes"** (auto-populated from Google Form responses)
- All form fields as columns
- Used to auto-count "Votos pidiendo ayuda" and sum "Total necesitado"

### Build Process
- Astro fetches data from Google Sheet (published as public CSV/JSON) at build time
- cPanel cron job runs `astro build` once or twice daily to regenerate the site
- Phase 2 metrics (votos pidiendo ayuda, total necesitado) are toggled on via a config flag

---

## Design System

### Aesthetic
Latin American political poster tradition meets vintage printing press (imprenta). Bold, unapologetic, popular.

### Color Palette
- **Deep red / carmin** (#8B1A1A) — primary
- **Forest green** (#2D5016) — secondary accent
- **Cream / parchment** (#F5F0E1) — backgrounds
- **Gold / mustard** (#C4961A) — warm accents
- **Black** (#1A1A1A) — text, high contrast
- **White** (#FFFFFF) — sparingly

### Typography
- Bold, condensed, uppercase serif headlines (letterpress/woodblock feel)
- Mixed type sizes within phrases for emphasis
- Candidates: Playfair Display Black, Libre Baskerville, or condensed slab serif
- Body text: clean, readable serif

### Visual Motifs
- Five-pointed stars as dividers and decorations
- Borders and frames around content blocks
- Retro poster layout — text as the primary visual
- Halftone/duotone photo treatments (if photos are used)
- Paper texture on backgrounds

---

## Payment Details (displayed on site)

- **Nequi:** QR code + phone number (to be provided by team)
- **Bancolombia:** Account type, account number, holder name (to be provided by team)
- No payment gateway integration

---

## Phased Rollout

### Phase 1 — Launch (ASAP)
- Full site with: hero, que es, como donar, transparencia (recaudado only), solicitar apoyo (Google Form), contacto, footer
- Google Sheet integration for daily recaudado number
- Primera vuelta transparency report PDF

### Phase 2 — Last week push (~June 14-15)
- Enable "Votos pidiendo ayuda" counter (from form responses)
- Enable "Total necesitado" sum (from form monto field)
- Gap between recaudado and necesitado creates urgency

### Phase 3 — Post-election
- Add disbursement data (total entregado, personas apoyadas)
- Publish second-round transparency report
- Site becomes archive/proof of impact + foundation for future Imprenta campaigns

---

## Assets Needed from Team
- [ ] Nequi QR code image
- [ ] Bancolombia account details
- [ ] Primera vuelta transparency report PDF (from zip already provided)
- [ ] Imprenta Republicana logo (if exists)
- [ ] Google Sheet created and shared (public)
- [ ] Google Form created with specified fields
- [ ] Copy/text for "Que es" section
- [ ] WhatsApp contact number
- [ ] Instagram handle
