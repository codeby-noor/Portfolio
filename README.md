# Mahenoor Shaikh — Full Stack Developer Portfolio

A responsive React portfolio presenting selected projects, technical skills, experience, education, and contact links.

---

## Overview

This repository contains the source code for the personal developer portfolio of **Mahenoor Shaikh**, a Full Stack Developer based in Navsari, Gujarat, India.

The portfolio provides a concise overview of full-stack development work, a BCA degree, and direct contact and resume links.

---

## Features

- **Selected projects**: Three full-stack project summaries with clearly labelled illustrative previews and links shown only when available.
- **Interactive skills**: Keyboard-accessible grouped skill tabs.
- **Experience, education, and languages**: Separate professional and academic history sections, plus a languages list.
- **Light and dark themes**: Theme choice is stored locally when browser storage is available.
- **Responsive and accessible**: Semantic sections, active anchor navigation, keyboard controls, reduced-motion support, and responsive layouts.

---

## Tech Stack

### Frontend
- **React.js 18** (Functional components, custom hooks, Context API)
- **Vanilla CSS3** (Custom properties design system, Flexbox, CSS Grid)
- **React Icons** (FontAwesome, SimpleIcons)

---

## Featured Projects

1. **Full Stack E-Commerce Platform** — Product listings, shopping cart functionality, React interface, REST APIs, and MySQL-backed product data.
2. **CodeQuest** — Gamified coding-learning platform with six worlds, 97 missions, progress, XP, levels, and achievements. No public demo or source link is available.
3. **AI Jamin — Real Estate Marketplace** — Property listings, search, detailed pages, API integrations, and authentication. [Live project](https://www.aijamin.in/).

Project screenshot assets are not currently included. The project covers are illustrative SVG artwork, not screenshots. Add verified images under `public/projects/` and set each project's `image` field in `src/data/projects.js` when screenshots are available.

---

## Project Structure

```text
Portfolio/
├── public/
│   ├── index.html          # Document metadata and application root
│   ├── resume.pdf          # Downloadable PDF resume
│   └── projects/           # Project screenshots and assets
├── src/
│   ├── components/          # Portfolio sections and interactive UI components
│   ├── data/                # Project and skill data
│   ├── styles/              # Component and global stylesheets
│   ├── three/               # React Three Fiber scenes and 3D helpers
│   ├── App.jsx              # Main layout
│   └── index.js             # React DOM entry point
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

The current portfolio does not require environment variables. `.env` files are ignored and private; `.env.example` is retained as a safe template for optional local configuration.

### Production Build

To create a production build:

```bash
npm run build
```

This writes the generated files to the `build/` directory.

---

## Contact & Links

- **Developer**: Mahenoor Shaikh
- **Email**: [Mahenoorshaikh0408@gmail.com](mailto:Mahenoorshaikh0408@gmail.com)
- **Phone / WhatsApp**: +91 79840 78653
- **GitHub**: [github.com/codeby-noor](https://github.com/codeby-noor)
- **LinkedIn**: [linkedin.com/in/mahenoor-shaikh](https://www.linkedin.com/in/mahenoor-shaikh)
- **Location**: Navsari, Gujarat, India (Open to Remote opportunities worldwide)
