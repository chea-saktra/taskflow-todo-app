# Task Management & Productivity App

A modern, fast, and responsive Task Management Web Application built with vanilla JavaScript, modern CSS design tokens, and modular state architecture. This application features a customizable layout, dark/light theme switching, accent color customizer, tablet & mobile responsive design, and local storage persistence.

---

## 🌟 Features

- **Responsive Architecture**: Smooth transitions across Mobile, Tablet, and Desktop views using custom CSS grid layouts.
- **Dynamic Router**: Light, hash/path-based navigation without heavy external framework dependencies.
- **Theme & Accent Customization**: Built-in support for Dark Mode, Light Mode, and customizable primary accent colors (`data-accent`).
- **Interactive UI Components**: Custom toasts, dialogs, loaders, sidebars, and bottom mobile navigation bars.
- **State & Service Layers**: Decoupled state management using reactive event channels and centralized business logic services.
- **Local Storage Persistence**: Automatically saves user preferences, task configurations, and theme settings locally.

---

## 🛠️ Built With

- **JavaScript (ES6+)**: Modular code with no heavy frontend framework dependencies.
- **CSS3 / Modern Layout System**: CSS Grid, Flexbox, CSS Custom Properties (Variables), and BEM methodology.
- **Lucide Icons**: Dynamic icon rendering for clean and accessible design.

---

### 📂 Project Structure

```text
taskflow-todo-app/
├── src/
│   ├── assets/       # Static assets like images, icons, and fonts
│   ├── components/   # Reusable UI components (Buttons, Modals, Cards, etc.)
│   ├── constants/    # Global constants, navigation routes, and options
│   ├── data/         # Mock data and initial sample tasks
│   ├── features/     # Feature-based modules (Dashboard, Tasks, Settings, Search, Archive)
│   ├── layouts/      # Application shell and structural layouts (Header, Sidebar, Footer, Page)
│   ├── page/         # Top-level page views and page wrapper components
│   ├── router/       # View routing logic and page component mapping
│   ├── services/     # Global core services (StorageService, ThemeService, RouterService, etc.)
│   ├── state/        # State stores and reactive state management logic
│   ├── styles/       # Global CSS variables, reset stylesheets, and theme styling
│   ├── utils/        # DOM utility functions and BEM class name helpers
│   ├── app.js        # Main application layout initialization and global event binding
│   └── main.js       # Application entry point
├── .gitignore        # Files and directories ignored by Git tracking
├── index.html        # HTML entry template
├── package-lock.json # Locked versions of installed npm dependencies
├── package.json      # Project dependencies, scripts, and configuration
└── README.md         # Project documentation

```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have a modern web browser and a local development server (e.g., Live Server, Vite, or Node.js with http-server).

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/chea-saktra/taskflow-todo-app.git
   cd taskflow-todo-app
   ```

2. **Run Locally**
   - **Using Live Server (VS Code Extension):** Open the project folder in VS Code and click "Go Live".
   - **Using Node/NPM (if applicable):**

   ```bash
    npm install
    npm run dev
   ```

---

## 🎨 Customization

### Themes & Accent Colors

The application uses global CSS variables to handle theming. Accent colors can be set using the `data-accent` attribute on the root html element:

```html
<html data-accent="purple"></html>
```

### Adding New Routes

Define routes inside `src/router/routes.js` and update `ROUTE_TITLE` and `ROUTE_ICON` inside `constants.js`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
