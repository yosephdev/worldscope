# 🌍 REST Countries Explorer with Theme Switcher

A modern and responsive country search app powered by the [REST Countries API](https://restcountries.com/). Built with **Vite**, **React**, **TypeScript**, **TailwindCSS**, **shadcn/ui**, and **Radix UI**. Includes a dark/light theme toggle and country detail pages.

![Preview](./public/desktop-preview.png)

## ✨ Features

- 🔍 Search for countries by name
- 🌐 Filter by region
- 🧭 View detailed country information
- 🌙 Toggle between light and dark themes
- ⚡ Fast and performant with Vite + React + TypeScript
- ♿ Accessible UI components from Radix UI & shadcn/ui
- 📱 Fully responsive (Mobile: 375px / Desktop: 1440px)

---

## 📦 Tech Stack

| Technology | Description |
|------------|-------------|
| [Vite](https://vitejs.dev/) | Lightning-fast development and build tooling |
| [React](https://react.dev/) | UI library for building user interfaces |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | Styled component library using Tailwind + Radix UI |
| [Radix UI](https://www.radix-ui.com/) | Unstyled, accessible UI primitives |
| [React Hook Form](https://react-hook-form.com/) | Flexible forms with validation |
| [Zod](https://zod.dev/) | Type-safe schema validation |
| [React Router](https://reactrouter.com/) | Declarative routing for React |
| [TanStack Query](https://tanstack.com/query/v5) | Data fetching and caching |
| [Lucide](https://lucide.dev/) | Icon set for modern interfaces |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yosephdev/worldscope
cd rest-countries-api
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the app locally

```bash
npm run dev
# or
yarn dev
```

Open <http://localhost:5173> in your browser.

## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint to check code quality |

## 🧰 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Page-level components (Home, Details)
├── themes/           # Theme config and dark/light switch logic
├── hooks/            # Custom React hooks
├── lib/              # API fetchers and helpers
├── routes/           # Route definitions
└── main.tsx          # App root & provider setup

```

## 🎨 Design System

### Fonts

- **Nunito Sans**
- Font weights: 300, 600, 800

### Color Palette

#### Light Mode

- Background: hsl(0, 0%, 98%)
- Text: hsl(200, 15%, 8%)
- Input: hsl(0, 0%, 52%)

#### Dark Mode

- Background: hsl(207, 26%, 17%)
- Elements: hsl(209, 23%, 22%)
- Text: hsl(0, 0%, 100%)

## 📄 License

This project is licensed under the MIT License.

## 🙌 Acknowledgments

- [Frontend Mentor Challenge](https://www.frontendmentor.io/)
- [REST Countries API](https://restcountries.com/)
- Radix UI & shadcn/ui teams

## ✍️ Author

**Yoseph Berhane**  

- 🌐 [yoseph.dev](https://yoseph.dev)
- 🐦 [@yosephbet](https://twitter.com/yosephbet)
- 💼 [LinkedIn](https://linkedin.com/in/yosephberhane)
