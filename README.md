# EduTrack — A Modern Educational Platform Frontend

**EduTrack** is a fully-featured, responsive frontend for a modern educational management platform. Built with **React.js** and bundled with **Vite**, this project demonstrates a production-ready frontend with role-based access control, dynamic content, and full CRUD functionality for managing courses and assignments.

---

##  About The Project

This repository contains the frontend implementation of an educational platform built to showcase modern React development patterns:

* Component-based architecture
* Client-side routing with React Router
* Global state management using the Context API
* Role-based permissions (Student, Instructor, Admin)
* Responsive, mobile-first design
* Simulated authentication (login/signup flow) with persisted sessions
* Full CRUD for courses & assignments using interactive modals
* Dark / Light theme with local persistence

Designed to be easy to run locally and to serve as a reference for building production-quality frontends.

---

##  Features

* **Responsive Design:** Mobile-first layout that adapts across screen sizes.
* **Role-Based Access Control (RBAC):**

  * **Student** — view courses, assignments, and personal activity.
  * **Instructor** — student permissions + full CRUD for courses and assignments.
  * **Admin** — same as Instructor.
* **Simulated Authentication:** Login/Sign-up flow that sets user role and persists session using React Context.
* **Full CRUD:** Create, read, update and delete courses & assignments via modals.
* **Dynamic Activity Feed:** Personalized "Recent Activity" on the dashboard based on user role.
* **Dark & Light Themes:** Toggle theme in the header; preference saved locally.
* **Client-Side Routing:** Smooth single-page application (SPA) experience with React Router.

---

##  Tech Stack

* **Framework:** React.js
* **Language:** JavaScript (ES6+) & JSX
* **Build Tool:** Vite
* **Routing:** React Router
* **State Management:** React Hooks + Context API
* **Styling:** CSS Modules (scoped, component-based)
* **Icons:** React Feather
* **Version Control:** Git & GitHub

---

##  Getting Started

Follow these steps to get a local copy running.

### Prerequisites

* Node.js (which includes npm) installed on your machine.

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/tanishka84/edutrack-website.git

# Move into the project folder
cd edutrack-website

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open your browser and visit: `http://localhost:5173`

---

##  Test User Credentials

Use these predefined accounts on the login page to test role-based behavior.

* **Student**

  * Email: `student@edutrack.com`
  * Password: any password with at least 8 characters

* **Instructor**

  * Email: `instructor@edutrack.com`
  * Password: any password with at least 8 characters

* **Admin**

  * Email: `admin@edutrack.com`
  * Password: any password with at least 8 characters

> These accounts are simulated for frontend testing purposes and do not connect to a real backend by default (unless you integrate one).

---

##  Project Structure (example)

```
edutrack-website/
├─ public/
├─ src/
│  ├─ components/    # Reusable UI components
│  ├─ pages/         # Route pages (Dashboard, Courses, Login, etc.)
│  ├─ context/       # React Context providers (Auth, Theme, etc.)
│  ├─ styles/        # CSS Modules
│  ├─ utils/         # Helpers and utilities
│  └─ main.jsx       # App entry
├─ package.json
└─ vite.config.js
```

---

##  Available Scripts

From the project directory, run:

* `npm run dev` — start Vite dev server
* `npm run build` — build for production
* `npm run preview` — preview the production build locally

---

##  Customization & Extensibility

This frontend is intentionally modular. Common extension points include:

* Hooking a real backend API for persistent authentication and data storage
* Replacing simulated auth with JWT/OAuth flows
* Integrating a database (Firebase, Supabase, or custom REST/GraphQL API)
* Adding tests (Jest + React Testing Library)
* Migrating styling to Tailwind, CSS-in-JS, or a design system

---

##  Contributing

Contributions are welcome. Please open issues or pull requests with a clear description of changes and rationale. Follow existing code style and component patterns when possible.

---

##  License

This project is provided as-is for learning and demonstration purposes. Add a license file (e.g., MIT) if you want to publish or allow others to reuse the code.

---

##  Author

**Tanishka Badnaware** — GitHub: [@tanishka84](https://github.com/tanishka84)

Project developed as of **September 5, 2025**.

---
