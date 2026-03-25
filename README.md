# nasri-porto

Personal portfolio website for **Nasri Adzlani** — Full-stack, Blockchain & Data Engineer.

## Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v4
- **Animations** — Framer Motion
- **3D** — React Three Fiber / Three.js
- **State** — Zustand
- **Email** — Resend

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `CMS_USERNAME` | CMS login username |
| `CMS_PASSWORD` | CMS login password |
| `JWT_SECRET` | Secret key for JWT signing |
| `RESEND_API_KEY` | Resend API key for contact form |
| `CONTACT_TO_EMAIL` | Recipient email for contact form |

## CMS

Protected dashboard at `/cms`. Manage projects, experience, about text, and skills — all stored in `data/*.json` and reflected immediately on the site.

## License

MIT
