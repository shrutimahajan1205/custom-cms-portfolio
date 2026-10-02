# Full-Stack Portfolio with Custom-Built Headless CMS & REST API

> A complete, production-ready, submission-grade portfolio ecosystem built entirely from scratch with **Python Flask**, **React**, **Vite**, and **Tailwind CSS**. No third-party CMS platforms (Strapi, Sanity, Contentful) used — everything including content models, JWT authentication, file upload pipeline, admin dashboard, and public portfolio frontend is custom-coded.

---

## 🌟 Key Highlights

- **Custom-Built CMS (Zero Vendor Lock-in)**: Custom content schema and full CRUD interface modeled after modern headless CMS workflows.
- **RESTful Python Flask Backend**: Modular blueprints, JWT-secured mutations, CORS support, static file hosting, and automatic SQLite database seeding.
- **Interactive CMS Admin Panel (`cms-admin/`)**: React-powered dashboard running on port 5174 with real-time analytics, CRUD modals, image file uploader, and message inbox.
- **Modern Public Portfolio Frontend (`portfolio-frontend/`)**: High-performance, dark-mode glassmorphic interface on port 5173 fetching dynamic data live from the CMS backend.
- **Instant Out-of-the-Box Setup**: Pre-seeded with rich, realistic developer data (projects, skills, blogs, timeline, testimonials, services, and inquiries).
- **One-Click Startup Script**: Single double-click `.bat` file to launch all three applications simultaneously.

---

## 📐 Architecture & System Flow

```
+-------------------------------------------------------------------------------+
|                                CLIENT LAYER                                   |
|                                                                               |
|   +----------------------------+             +----------------------------+   |
|   |  Public Portfolio Frontend |             |   Custom CMS Admin Panel   |   |
|   |  React + Tailwind CSS      |             |   React + Tailwind CSS     |   |
|   |  http://localhost:5173     |             |   http://localhost:5174    |   |
|   +--------------+-------------+             +--------------+-------------+   |
+------------------|------------------------------------------|-----------------+
                   | Public Content APIs                      | JWT Authenticated
                   | & POST /api/contact                      | CRUD & /upload
                   v                                          v
+-------------------------------------------------------------------------------+
|                      BACKEND REST API & CMS ENGINE                            |
|                      Python 3.13 + Flask 3.1                                  |
|                      http://127.0.0.1:5000                                    |
|                                                                               |
|   - Flask-JWT-Extended (Token Generation & Protected Endpoints)               |
|   - Flask-CORS (Cross-Origin Resource Sharing for Dev Ports)                  |
|   - Flask-SQLAlchemy (ORM & Model Relationships)                              |
|   - Static Upload Handler (/uploads/<filename>)                               |
+--------------------------------------|----------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
|                          CUSTOM DATABASE LAYER                                |
|                          SQLite / PostgreSQL                                  |
|                                                                               |
|   [users]         [about]        [skills]         [projects]      [blogs]     |
|   [experience]    [testimonials] [services]       [messages]      [media]     |
+-------------------------------------------------------------------------------+
```

---

## 🚀 Quick Start Guide (One-Click Launch)

### Option A: The Fast 1-Click Method (Recommended)
Simply double-click:
```bash
run-all.bat
```
This script will:
1. Start the Flask Backend on `http://127.0.0.1:5000`
2. Start the Custom CMS Admin on `http://localhost:5174`
3. Start the Portfolio Frontend on `http://localhost:5173`
4. Automatically open your browser to both applications!

---

### Option B: Running Individually

#### 1. Start the Backend API
```powershell
cd backend
python run.py
```
> The backend runs on `http://127.0.0.1:5000`. On first start, it automatically generates `portfolio_cms.db` and seeds all tables with demo developer data.

#### 2. Start the Custom CMS Admin
```powershell
cd cms-admin
npm run dev
```
> Runs on `http://localhost:5174`.

#### 3. Start the Public Portfolio
```powershell
cd portfolio-frontend
npm run dev
```
> Runs on `http://localhost:5173`.

---

## 🔑 Default CMS Admin Credentials

| Parameter | Value |
| :--- | :--- |
| **Username** | `admin` |
| **Email** | `admin@example.com` |
| **Password** | `admin123` |
| **JWT Access** | 24 Hours validity token |

> *Tip*: On the CMS login screen, click **"Autofill"** to instantly test the login with 1 click!

---

## 📚 Complete REST API Documentation

### 1. Authentication Endpoints
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/login` | No | Submit `{username, password}` to get JWT token |
| `GET` | `/api/auth/me` | **Yes (Bearer)** | Returns current authenticated user |
| `POST` | `/api/auth/refresh` | **Yes (Bearer)** | Refreshes access token |

### 2. Content & CRUD Endpoints
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/about` | No | Retrieve public profile bio & social info |
| `PUT` | `/api/about` | **Yes (Bearer)** | Update about profile details & metrics |
| `GET` | `/api/skills` | No | List all skills sorted by order |
| `POST` | `/api/skills` | **Yes (Bearer)** | Create a new skill entry |
| `PUT` | `/api/skills/<id>` | **Yes (Bearer)** | Update skill name, category, proficiency |
| `DELETE`| `/api/skills/<id>` | **Yes (Bearer)** | Remove skill |
| `GET` | `/api/projects` | No | List all projects |
| `GET` | `/api/projects/<id>` | No | Get single project detail |
| `POST` | `/api/projects` | **Yes (Bearer)** | Add new project case study |
| `PUT` | `/api/projects/<id>` | **Yes (Bearer)** | Update project details, images, tags |
| `DELETE`| `/api/projects/<id>` | **Yes (Bearer)** | Remove project |
| `GET` | `/api/blogs` | No | List published articles |
| `GET` | `/api/blogs/<id>` | No | Read article content & increment view count |
| `POST` | `/api/blogs` | **Yes (Bearer)** | Publish or draft a new article |
| `PUT` | `/api/blogs/<id>` | **Yes (Bearer)** | Edit blog post |
| `DELETE`| `/api/blogs/<id>` | **Yes (Bearer)** | Delete blog post |
| `GET` | `/api/experience` | No | List career history milestones |
| `POST` | `/api/experience` | **Yes (Bearer)** | Add experience milestone |
| `PUT` | `/api/experience/<id>` | **Yes (Bearer)** | Edit experience entry |
| `DELETE`| `/api/experience/<id>` | **Yes (Bearer)** | Delete experience entry |
| `GET` | `/api/testimonials` | No | Get client reviews |
| `POST` | `/api/testimonials` | **Yes (Bearer)** | Create new testimonial |
| `PUT` | `/api/testimonials/<id>`| **Yes (Bearer)** | Edit testimonial |
| `DELETE`| `/api/testimonials/<id>`| **Yes (Bearer)** | Delete testimonial |
| `GET` | `/api/services` | No | Get service packages |
| `POST` | `/api/services` | **Yes (Bearer)** | Add service offering |
| `PUT` | `/api/services/<id>` | **Yes (Bearer)** | Edit service offering |
| `DELETE`| `/api/services/<id>` | **Yes (Bearer)** | Delete service offering |
| `GET` | `/api/stats` | **Yes (Bearer)** | Summary metrics for CMS Dashboard |

### 3. Contact Form & Messages Endpoints
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/contact` | No | Visitor submits message `{name, email, subject, message}` |
| `GET` | `/api/messages` | **Yes (Bearer)** | List inquiries in CMS Inbox |
| `PUT` | `/api/messages/<id>/read` | **Yes (Bearer)** | Mark message as read |
| `DELETE`| `/api/messages/<id>` | **Yes (Bearer)** | Delete message |

### 4. Media Upload Endpoints
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/upload/image` | **Yes (Bearer)** | Multipart upload, returns hosted URL |
| `GET` | `/api/media` | **Yes (Bearer)** | List all uploaded media assets |
| `DELETE`| `/api/media/<id>` | **Yes (Bearer)** | Delete file from disk & record |
| `GET` | `/uploads/<filename>` | No | Public direct static file serving |

---

## 🗄️ Database Schema Details

All 10 tables are mapped using SQLAlchemy:
1. **`users`**: Authentication table with hashed passwords using SHA-256 / Werkzeug.
2. **`about`**: Personal bio, title, avatar, downloadable resume, location, contact coordinates, and key metrics.
3. **`skills`**: Skill name, category (`Frontend`, `Backend`, `Database`, `DevOps`, `Tools`), proficiency percentage (0-100), and display order.
4. **`projects`**: Title, synopsis, full markdown case study, tags JSON array, demo URL, github repo, featured flag.
5. **`blogs`**: Title, URL slug, summary excerpt, markdown article body, cover image, read time, view counter, published status.
6. **`experience`**: Role, company, location, employment period, description, tech stack tags, current job boolean flag.
7. **`testimonials`**: Client name, company, position, testimonial quote, star rating (1-5), avatar photo.
8. **`services`**: Offering title, scope description, deliverables JSON list, starting price, display order.
9. **`messages`**: Inquiries sent from the portfolio contact form, sender name, email, subject, body, read status, timestamp.
10. **`media`**: Uploaded image filenames, disk path, public URL, MIME type, file size in bytes, upload timestamp.

---

## 📁 Repository Directory Structure

```
custom-cms-portfolio/
│
├── backend/                        # Python Flask REST API & CMS Core
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth_routes.py      # JWT login & token verification
│   │   │   ├── content_routes.py   # Full CRUD for all 8 content models
│   │   │   ├── contact_routes.py   # Contact form submission & message inbox
│   │   │   └── upload_routes.py    # File uploads & static CDN serving
│   │   ├── config.py               # Database URL, JWT secrets, upload folders
│   │   ├── models.py               # 10 custom SQLAlchemy database models
│   │   ├── seed.py                 # Initial seed data for out-of-the-box demo
│   │   └── __init__.py             # Flask application factory & CORS setup
│   ├── uploads/                    # Local storage for uploaded media assets
│   ├── portfolio_cms.db            # Auto-generated SQLite database
│   ├── requirements.txt            # Python dependencies list
│   └── run.py                      # Flask entrypoint (Port 5000)
│
├── cms-admin/                      # Custom-Built Admin Panel (Port 5174)
│   ├── src/
│   │   ├── components/             # ImageUploader, Navbar, Sidebar
│   │   ├── pages/                  # Dashboard, About, Skills, Projects,
│   │   │                           # Blogs, Experience, Testimonials,
│   │   │                           # Services, Messages Inbox, Media Manager
│   │   ├── services/api.js         # JWT interceptor and API client
│   │   ├── App.jsx                 # Authenticated layout and view router
│   │   └── index.css               # Tailwind CSS styling
│   ├── package.json
│   └── vite.config.js              # Strict Port 5174
│
├── portfolio-frontend/             # Public Portfolio Website (Port 5173)
│   ├── src/
│   │   ├── components/             # Hero, About, Skills, Projects,
│   │   │                           # Experience, Services, Testimonials,
│   │   │                           # Blog, Contact Form, Navbar, Footer
│   │   ├── services/api.js         # Live CMS fetcher with fallback cache
│   │   ├── App.jsx                 # Master application controller
│   │   └── index.css               # Glassmorphism & custom scrollbars
│   ├── package.json
│   └── vite.config.js              # Strict Port 5173
│
├── TWO_WEEK_PLAN.md                # 14-Day project timeline implementation log
├── README.md                       # Comprehensive project documentation
├── start-backend.bat               # Starts Flask server
├── start-cms.bat                   # Starts Admin Panel
├── start-portfolio.bat             # Starts Portfolio
└── run-all.bat                     # Master 1-click startup script
```

---

## 🧪 Verification & Testing Results

- **Backend Smoke Tests**: Passed 100% (Auth, JWT generation, protected CRUD routes, file uploads, contact submission).
- **CMS Admin Build**: Vite production build generated `dist/` with 0 warnings/errors.
- **Portfolio Frontend Build**: Vite production build generated `dist/` with 0 warnings/errors.
- **Live Sync Verification**: Creating or updating projects, skills, or blogs in the CMS Admin panel immediately reflects on the public portfolio upon page refresh.
- **Contact Pipeline**: Submitting the form on the public portfolio instantly delivers the message to the CMS Inbox and logs simulated email dispatch.
