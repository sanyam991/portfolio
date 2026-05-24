# Sanyam Sachan — Developer Portfolio

A cinematic, Doctor Strange–themed developer portfolio built with Next.js 15, React 19, Framer Motion, and Tailwind CSS v4. Features a solar system hero, animated skills, real project showcases, and a working contact form.

## Author

**Sanyam Sachan** — Junior Software Engineer  
[GitHub](https://github.com/sanyam991) · [LinkedIn](https://linkedin.com/in/sanyam991) · sachansanyam203@gmail.com

## Features

- **Solar System Hero** — Profile photo as the sun, 12 tech skills as orbiting planets
- **Animated Skills** — 7-category tabbed skill bars (Languages, Backend, Big Data, Cloud/DevOps, Databases, AI/ML, Tools)
- **Projects Showcase** — 4 real projects with GitHub links and modal detail view
- **Experience Timeline** — Alternating left/right timeline with work and education entries
- **Contact Form** — Functional email via Nodemailer + Gmail SMTP
- **Fully Responsive** — Mobile, tablet, and desktop layouts with hamburger navigation
- **Custom Cursor** — Gold dot + purple ring + 8-particle trail (desktop only)
- **Smooth Scroll** — Lenis scroll library integration

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, Framer Motion 12, Tailwind CSS v4 |
| Email | Nodemailer + Gmail SMTP |
| Fonts | Cinzel, Space Grotesk, JetBrains Mono, Orbitron |
| Animation | CSS keyframes, Framer Motion, Lenis smooth scroll |
| Language | TypeScript |

## Getting Started

```bash
# Install dependencies
npm install

# Create environment file
# Fill in GMAIL_USER and GMAIL_APP_PASSWORD in .env.local
cp .env.local .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```env
GMAIL_USER=your_gmail@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
```

> Generate a Gmail App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requires 2-Step Verification enabled).

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Theme tokens, keyframes, responsive utilities
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Main page
│   └── api/contact/         # Nodemailer email endpoint
├── components/
│   ├── core/                # WebBackground, WebNav, SpiderHand
│   ├── layout/              # Footer
│   ├── sections/            # Hero, About, Skills, Projects, Experience, Achievements, Contact
│   └── ui/                  # LoadingScreen, CursorEffect
├── hooks/                   # Custom React hooks
└── lib/                     # Utilities (cn)
```

## Deployment

The portfolio is optimized for deployment on [Vercel](https://vercel.com). Set the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## License

MIT © 2025 Sanyam Sachan
