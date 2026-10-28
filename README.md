# Mahenoor Shaikh — Full Stack Developer Portfolio

A responsive React portfolio presenting selected projects, technical skills, experience, education, and contact links.

---

## Overview

This repository contains the source code for the personal developer portfolio of **Mahenoor Shaikh**, a Full Stack Developer based in Navsari, Gujarat, India.

The portfolio provides a concise overview of full-stack development work, a BCA degree, and direct contact and resume links.

---

## Features

- **Selected projects**: SHOPERA and CodeQuest, with project previews, verified live demos, and detailed case studies.
- **Interactive skills**: Keyboard-accessible grouped skill tabs.
- **Experience, education, and languages**: Separate professional and academic history sections, plus a languages list.
- **Light and dark themes**: Theme choice is stored locally when browser storage is available.
- **Merlot & Porcelain identity**: Porcelain backgrounds, merlot calls to action, restrained dusty-rose accents, serif display typography, and ink project and contact sections.
- **Custom monogram favicon**: An original SVG M with a PNG browser fallback and Apple touch icon.
- **Responsive and accessible**: Semantic sections, active anchor navigation, keyboard controls, reduced-motion support, and responsive layouts.
- **Subtle motion**: Motion for React powers the brief hero entrance and in-view project reveals, with reduced-motion preferences respected.
- **Search-ready delivery**: The production React page is rendered into the initial HTML, with a canonical URL, structured profile data, sitemap, robots file, share image, and custom 404 response.
- **Optional measurement**: Google Analytics 4 and webmaster verification are disabled unless deployment environment variables are provided.

---

## Tech Stack

### Frontend
- **React.js 18** (Functional components, custom hooks, Context API)
- **Motion for React** (Motion One-style React APIs from `motion/react`, for opt-in, reduced-motion-aware interface transitions)
- **Vanilla CSS3** (Custom properties design system, Flexbox, CSS Grid)
- **React Icons** (FontAwesome, SimpleIcons)

---

## Featured Projects

1. **SHOPERA** — Full-stack e-commerce platform for product discovery, shopping functionality, and backend integration. [Live demo](https://shopera-ecommerce-frontend.vercel.app/).
2. **CodeQuest** — Gamified coding-learning platform with coding challenges, progression, and achievements. [Live demo](https://codequest-virid.vercel.app/).

SHOPERA uses the captured storefront screenshot in `public/images/shopera/`. CodeQuest uses a genuine screenshot of its live application in `public/images/codequest/`.

---

## Project Structure

```text
Portfolio/
├── public/
│   ├── 404.html            # Custom not-found response
│   ├── index.html          # Document metadata and application root
│   ├── robots.txt          # Crawler rules and sitemap reference
│   ├── sitemap.xml         # Canonical indexable URLs
│   ├── site.webmanifest    # Browser app metadata
│   ├── social-card.png     # Open Graph / X share image
│   ├── favicon.svg         # Custom Merlot & Porcelain M monogram
│   ├── favicon-32.png      # PNG browser icon fallback
│   ├── apple-touch-icon.png # iOS home-screen icon
│   └── resume.pdf          # Downloadable PDF resume
├── src/
│   ├── components/          # Portfolio sections and interactive UI components
│   ├── data/                # Project and skill data
│   ├── styles/              # Component and global stylesheets
│   ├── three/               # React Three Fiber scenes and 3D helpers
│   ├── App.jsx              # Main layout
│   ├── analytics.js         # Optional GA4 page and interaction events
│   └── index.js             # React DOM entry point
├── scripts/
│   ├── generate-favicons.ps1
│   ├── generate-social-card.ps1 # Regenerates the Open Graph / X image
│   └── prerender.js         # Server-renders the app during production builds
├── vercel.json              # Filesystem delivery and actual 404 status
├── .env.example             # Safe environment variable template
├── .gitignore               # Strict version control ignore rules
├── package.json             # Project dependencies and build scripts
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites

- **Node.js** (v16.x or higher recommended)
- **npm** (v8.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codeby-noor/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

The portfolio does not require environment variables to build. `.env` files are ignored and private; `.env.example` lists optional Analytics and webmaster verification configuration.

### Production Build

To create a production build:

```bash
npm run build
```

This writes the generated files to the `build/` directory.

The build also runs `scripts/prerender.js`, which server-renders the existing React homepage into `build/index.html` and adds Search Console/Bing verification tags when configured. The app hydrates this markup in the browser; no separate content page or rendering framework is used.

## Search visibility and deployment

- The provided Vercel production URL, `https://portfolio-two-rosy-34.vercel.app/`, is the canonical origin used by the HTML metadata, structured data, sitemap, and robots file. The custom `mahenoorshaikh.com` domain did not resolve when this configuration was audited. If a verified custom domain is attached later, update the canonical origin consistently in `public/index.html`, `public/robots.txt`, and `public/sitemap.xml` before submitting the sitemap.
- This is one indexable homepage with section anchors. Project summaries remain on that page because no separate project pages currently have sufficiently distinct documentation and screenshots to justify standalone search URLs.
- `public/404.html` and `vercel.json` serve an actual 404 status for unknown paths; project paths are not routed to duplicate copies of the homepage.
- Regenerate the 1200 × 630 Open Graph / X card after changing its design with `powershell -ExecutionPolicy Bypass -File scripts/generate-social-card.ps1`.
- Regenerate the 32 × 32 browser PNG fallback and 180 × 180 Apple touch icon with `powershell -ExecutionPolicy Bypass -File scripts/generate-favicons.ps1`. The SVG source is maintained in `public/favicon.svg`.
- In Google Search Console, add the verified production property and submit `https://portfolio-two-rosy-34.vercel.app/sitemap.xml`. To use HTML-tag verification, set `REACT_APP_GOOGLE_SITE_VERIFICATION` to the token from Search Console in the Vercel production environment, then deploy a new build. Set `REACT_APP_BING_SITE_VERIFICATION` similarly for Bing Webmaster Tools.
- To enable GA4, set `REACT_APP_GA_MEASUREMENT_ID` to the measurement ID from the GA4 web data stream in the Vercel production environment, then deploy a new build. Analytics remains disabled when the variable is blank. When enabled, the site sends one page view and non-identifying resume-download, project-demo, and email-contact events; it does not send email addresses or clicked URLs.
- The build does not claim that Google has indexed the site. Search Console submission and Analytics property setup require the site owner’s accounts and verification.

---

## Contact & Links

- **Developer**: Mahenoor Shaikh
- **Email**: [Mahenoorshaikh0408@gmail.com](mailto:Mahenoorshaikh0408@gmail.com)
- **Phone / WhatsApp**: +91 79840 78653
- **GitHub**: [github.com/codeby-noor](https://github.com/codeby-noor)
- **LinkedIn**: [linkedin.com/in/mahenoor-shaikh](https://www.linkedin.com/in/mahenoor-shaikh)
- **Location**: Navsari, Gujarat, India (Open to Remote opportunities worldwide)
