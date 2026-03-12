<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/-Lucide Icons-FD4D4D?style=for-the-badge&logo=lucide" alt="Lucide Icons" />
    <img src="https://img.shields.io/badge/-React Icons-E91E63?style=for-the-badge&logo=react&logoColor=white" alt="React Icons" />
    <img src="https://img.shields.io/badge/-tsParticles-7B2FBE?style=for-the-badge" alt="tsParticles" />
  </div>
</div>

# Portfolio — Pierre Prudhomme

Personal portfolio built with React and Tailwind CSS. Highlights my background as a Data Scientist and AI Engineer, featuring projects, skills, and contact info — with a polished, fully responsive design and light/dark mode support.

---

## 🌐 Live Demo

Hosted on **Vercel**:
🔗 [portfolio-pierreprudh.vercel.app](https://portfolio-pierreprudh.vercel.app)

---

## 🚀 Preview

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light Mode](./src/assets/light-mode.png) | ![Dark Mode](./src/assets/dark-mode.png) |
| ![Light Mode](./src/assets/mobile-light.png) | ![Dark Mode](./src/assets/mobile-dark.png) |

---

## ✨ Features

- Fully responsive layout for all screen sizes
- Smooth light/dark theme toggle with animated transitions
- Animated splash screen on first load
- Floating pill navbar with scroll-aware active section tracking and mobile accordion menu
- Scroll progress bar
- Scroll-reveal animations on section entry
- Hero section with animated role cycling and particle background
- Skills section organized by category (Data Science, Visualization, Big Data, Web Dev, AI/LLM)
- Projects section with live and GitHub links
- Contact section with email, phone, location, and LinkedIn
- Aurora background (light mode) and starfield background (dark mode)

---

## 🛠️ Tech Stack

- **React 19** with hooks
- **Tailwind CSS v4**
- **Vite 7** for bundling and dev server
- **react-router-dom** for routing
- **tsparticles** for particle animations
- **lucide-react** and **react-icons** for icons
- **clsx** + **tailwind-merge** for conditional class utilities
- Custom CSS keyframe animations

---

## 📁 Folder Structure

```
src/
├── assets/            # Static images
├── components/        # All UI components (sections, navbar, backgrounds, effects)
├── lib/               # Utility functions (cn helper)
├── pages/             # Page-level containers (Home, NotFound)
├── App.jsx            # Root layout and routing
└── main.jsx           # App entry point
```

---

## ▶️ Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 🏗️ Production Build

```bash
npm run build
npm run preview
```
