# Sudeep Tharu — Full-Stack Developer & 3D Web Designer Portfolio

A modern, high-contrast, responsive developer portfolio engineered with **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18.0 or higher
- **npm** or **yarn** or **pnpm**

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` (or the port indicated in your console) to preview the live application.

### 4. Build for Production
```bash
npm run build
```
This produces an optimized production build inside the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 📁 Project Architecture

```
├── public/                 # Static assets & downloadable files
│   └── portfolio-sudeep-tharu.zip
├── src/
│   ├── components/         # Modular UI components
│   │   ├── Navbar.tsx      # Top bar navigation with theme & download triggers
│   │   ├── Hero.tsx        # Hero section with 3D badges and CV download
│   │   ├── About.tsx       # Personal biography and milestone metrics
│   │   ├── WhatIDo.tsx     # 4 Core Capability Pillars
│   │   ├── Certifications.tsx # Verified industry credentials
│   │   ├── Skills.tsx      # Filterable skills with animated progress bars
│   │   ├── Projects.tsx    # Filterable project gallery with carousel
│   │   ├── ProjectModal.tsx # Full-screen case study lightbox modal
│   │   ├── Contact.tsx     # Client inquiry form with pre-filled email dispatch
│   │   ├── Footer.tsx      # Unboxed footer with social links
│   │   ├── EditToolbar.tsx # In-page visual editing controls & export tools
│   │   ├── EditableText.tsx # Inline click-to-edit text utility
│   │   └── ImageSwitcherModal.tsx # Curated image picker & canvas compressor
│   ├── context/            # Global portfolio state & IndexedDB sync
│   ├── data/               # Default profile data, skills, and presets
│   ├── utils/              # Resilient storage & image compression
│   ├── types.ts            # TypeScript data model schemas
│   ├── index.css           # Tailwind CSS imports & custom typography
│   └── main.tsx            # Application entry point
├── index.html              # HTML shell & font definitions
├── package.json            # Scripts & project dependencies
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build & plugin configuration
```

---

## ✨ Features Included

1. **High-Contrast Design**: Clean, razor-sharp light mode and dark mode theme toggle.
2. **On-Page Visual Editor**: Click any text, headline, or photo camera overlay to edit live in the browser.
3. **Verified Certifications & Skills**: Showcase credentials from Google, Meta, Coursera, and AWS.
4. **Interactive Case Studies**: Lightbox modals with project architecture, tech stacks, and quantitative metrics.
5. **Direct Client Email Dispatch**: Inquiry form pre-fills client scope, budget, and details directly to `zentratech11@gmail.com` with Gmail webmail and copy-to-clipboard fallbacks.
6. **One-Click Export**: Download your full source code ZIP or JSON data backup directly from the UI.
