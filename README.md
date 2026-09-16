# FullStack-Developer-Portfolio



# MicroZee Solutions Portfolio

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
- **Backend:** Python, FastAPI, Pydantic, Uvicorn
- **Database:** MongoDB (Motor async driver)
- **Authentication:** JWT (PyJWT) + Bcrypt
- **AI Integration:** Google Gemini API (RAG-powered chatbot)
- **Email:** SMTP (Gmail App Password)
- **Deployment:** Vercel (frontend + backend)

## Project Structure

```text
MicroZee-Solutions/
├── frontend/                        # React (Vite) frontend
│   ├── public/
│   │   └── api-config.js            # API base URL config
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
└── backend/                         # Python FastAPI backend
    ├── app.py                       # Main API entry
    ├── config.py                    # MongoDB & JWT config
    ├── requirements.txt
    ├── models/                      # Pydantic models
    │   ├── project.py
    │   ├── service.py
    │   ├── contact.py
    │   ├── certificate.py
    │   ├── settings.py
    │   └── user.py
    ├── routes/                      # API routes
    │   ├── projects.py
    │   ├── services.py
    │   ├── contacts.py
    │   ├── certificates.py
    │   ├── settings.py
    │   ├── analytics.py
    │   ├── auth.py
    │   └── chat.py
    ├── utils/
    │   └── email_service.py
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
<!-- 
## Environment Variables

**Frontend (`public/api-config.js`):**

```js
window.API_BASE = 'https://your-backend-url.com';
```

**Backend (`.env`):**

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
GEMINI_API_KEY=your_gemini_api_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
ADMIN_EMAIL=your-admin-email@gmail.com
JWT_SECRET=your-secret-key
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python seed_admin.py      # Creates first admin account
python app.py             # Runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev               # Runs on http://localhost:5173
```

Then log in to `http://localhost:5173/admin/login` with the account created by `seed_admin.py`. -->

## Project Goal

To deliver a modern, AI-enhanced portfolio platform where all content is fully controllable from an admin panel, visitor engagement is powered by an intelligent support agent, and the developer can manage projects, services, and certifications without ever touching code.

## Author

- **Arham Raza**
- Full-Stack Developer
- IBM Professional Certificate
- @ MicroZee Solutions

---

⭐ If you find this project useful, consider giving it a star on GitHub!