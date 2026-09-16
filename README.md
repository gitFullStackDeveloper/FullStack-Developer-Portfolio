# FullStack-Developer-Portfolio

MicroZee Solutions Portfolio is a full-stack, dynamically managed portfolio website with a powerful admin panel. All content — projects, services, certifications, contacts, and settings — is managed through the admin panel and served to visitors in real time from a MongoDB database.

## Features

- Fully dynamic portfolio powered by a real-time admin panel
- AI customer support agent (ZeeBot) powered by Google Gemini with RAG
- Project showcase with filtering, preview, and buy/contact modes
- Service listings with categories and detailed pages
- Certifications section with offline/online upload and fullscreen viewer
- Multi-step contact form with meeting scheduling
- Email notifications on contact submissions and meeting reminders
- Admin analytics dashboard with page views, top services, projects, and trends
- JWT-based authentication with role support (admin / superadmin)
- Floating AI chat widget on all public pages
- Global page loader with animated branding
- Custom SVG logo and brand identity
- Responsive glassmorphism UI with Framer Motion animations
- Hidden/visible project toggle without deleting data

## Tech Stack

- **Frontend:** React, Vite, Framer Motion, React Router, Font Awesome
- **Backend:** Python, FastAPI
- **Database:** MongoDB 
- **Authentication:** JWT (PyJWT) + Bcrypt
- **AI Integration:** Google Gemini API (RAG-powered chatbot)
- **Email:** SMTP (Gmail App Password)
- **Deployment:** Vercel (frontend + backend)

## Project Structure

```text
MicroZee-Solutions/
├── react/                        # React (Vite) frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Website/
│   │   │   │   ├── admin/           # Admin panel pages
│   │   │   │   ├── home/            # Home page sections
│   │   │   │   ├── about/           # About page sections
│   │   │   │   ├── services/        # Services pages
│   │   │   │   ├── projects/        # Projects pages
│   │   │   │   ├── project-detail/  # Project detail components
│   │   │   │   ├── portfolio/       # Portfolio page sections
│   │   │   │   ├── contact/         # Contact form funnel
│   │   │   │   ├── funnel-home/     # Funnel home page
│   │   │   │   ├── SupportChatWidget.jsx
│   │   │   │   └── GlobalLoader.jsx
│   │   ├── css/
│   │   ├── js/
│   │   └── App.jsx
│   └── index.html
│
└── python/                         # Python FastAPI backend
    ├── app.py                       # Main API entry
    ├── config.py                    # MongoDB & JWT config
    ├── requirements.txt
    ├── models/
    ├── routes/                      # API routes
    ├── utils/
    ├── memory.py                    # Chat memory manager
    ├── rag.py                       # RAG context fetcher
    ├── seed_admin.py                # First admin seeder
    └── .env
```

## System Requirements

- Public portfolio accessible from any modern browser
- Admin panel secured with email/password login
- All content managed from the admin panel without touching code
- AI chatbot available on every public page for visitor questions
- Automatic email notifications for contact form submissions
- Automated meeting reminder emails sent 1 hour before scheduled meetings
- Certifications can be stored as URLs or uploaded images
- Projects can be hidden from the public site without deletion
- Full analytics tracking (pages, services, projects, contacts)
- Responsive interface for desktop and mobile

## Admin Panel Modules

| Module | Purpose |
|--------|---------|
| **Dashboard** | Overview with charts and recent activity |
| **Projects** | Full CRUD, image upload, hide/show, For Sale / Showcase toggle |
| **Services** | Full CRUD with categories, features, process, images |
| **Certifications** | Add certificates with online URL or offline image |
| **Contacts** | View, filter, update status (new / read / responded) |
| **Settings** | Social links, meeting availability, time slots |
| **Analytics** | Page view statistics with daily/monthly filters |
| **Profile** | Edit personal info, change password, manage admins |
| **Add Admin** | Create new admin accounts with roles |

## AI Customer Support Agent

The floating chat widget on the portfolio is powered by **ZeeBot**, a RAG-enabled support agent:

- Uses **Google Gemini** for natural language generation
- Fetches live data from MongoDB (services, projects, contacts, settings) via the RAG module
- Maintains conversation memory per session
- Answers visitor questions about services, pricing, projects, and experience
- Gracefully suggests contacting the developer when unsure

## Project Goal

To deliver a modern, AI-enhanced portfolio platform where all content is fully controllable from an admin panel, visitor engagement is powered by an intelligent support agent, and the developer can manage projects, services, and certifications without ever touching code.

## Author

- **Arham Raza**
- Full-Stack Developer
- IBM Professional Certificate
- @ MicroZee Solutions

---

⭐ If you find this project useful, consider giving it a star on GitHub!