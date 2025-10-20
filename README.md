# Tiny SVG

<div align="center">

![Tiny SVG Logo](./docs/images/logo.svg)

**A modern, lightning-fast SVG optimizer and code generator**

[![Demo](https://img.shields.io/badge/demo-live-success)](https://tiny-svg.actnow.dev)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-SSR-orange.svg)](https://tanstack.com/start)

[Live Demo](https://tiny-svg.actnow.dev) · [Features](#features) · [Quick Start](#quick-start) · [Documentation](#documentation)

</div>

---

## 📖 Overview

**Tiny SVG** is a powerful web application for optimizing SVG files and generating framework-specific code. Built with modern web technologies, it provides a seamless experience for developers and designers working with SVG assets.

### ✨ Key Features

- **🚀 SVG Optimization**: Powered by SVGO with 40+ configurable plugins
- **📦 Code Generation**: Generate React (JSX/TSX), Vue, Svelte, React Native, and Flutter code
- **⚡ Web Workers**: Non-blocking optimization using multi-threaded processing
- **🎨 Visual Preview**: Real-time preview with multiple background styles
- **💾 Persistent Settings**: Your preferences saved across sessions
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🌓 Dark Mode**: Full dark mode support
- **⚡ Lightning Fast**: Optimized bundle with lazy loading and code splitting

---

## 📸 Screenshots

### Home Page
![Home Page](./docs/images/home.png)

Simple, intuitive interface to get started quickly.

### Optimize Page
![Optimize Page](./docs/images/optimize.png)

Powerful optimization tools with real-time preview and code generation.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: >= 18.x
- **pnpm**: >= 9.x (recommended package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/tiny-svg.git
cd tiny-svg

# Install dependencies
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build

**⚠️ 重要提示：**for 本项目使用 TanStack Start (SSR 框架)，存在已知的 CSS 加载问题。production

### 推荐的工作流程

1. **开发阶段** - 使用开发服务器（CSS 完全正常）：
```bash
pnpm dev
```
访问 [http://localhost:3001](http://localhost:3001)

2. **部署** - 直接部署到 Cloudflare（生产环境 CSS 正常）：
```bash
cd apps/web && pnpm deploy
```

###### 本地预览生产构建的问题Deployment

使用Deploy to Cloudflare Workers:

```bash
cd apps/web && pnpm deploy
```

---

## 🏗️ Tech Stack

### Core Framework
- **[TanStack Start](https://tanstack.com/start)** - Modern SSR framework with file-based routing
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component collection
- **[Iconify](https://iconify.design/)** - Unified icon framework

### State Management & Data
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Optimization & Processing
- **[SVGO](https://github.com/svg/svgo)** - SVG optimization engine
- **[Prettier](https://prettier.io/)** - Code formatter for generated code
- **[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)** - Multi-threaded processing

### Code Quality
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Ultracite](https://ultracite.dev/)** - Strict TypeScript configuration

### Build & Deploy
- **[Vite 7](https://vite.dev/)** - Next-generation build tool
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Serverless deployment platform
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - CLI for Cloudflare Workers

---

## 📚 Features in Detail

### SVG Optimization

- **40+ SVGO Plugins**: Fine-grained control over optimization
- **Global Settings**: Configure precision, multipass, and prettify options
- **Real-time Preview**: See changes instantly with zoom controls
- **Compression Statistics**: View file size reduction and compression rate
- **Batch Processing**: Optimize multiple SVGs efficiently

### Code Generation

Generate optimized code for your favorite framework:

- **React JSX** - JavaScript components
- **React TSX** - TypeScript components with full type safety
- **Vue** - Single File Components (.vue)
- **Svelte** - Svelte components
- **React Native** - react-native-svg components
- **Flutter** - flutter_svg widgets

### Preview & Visualization

- **4 Background Styles**:
  - Transparent Light (checkerboard)
  - Transparent Dark (dark checkerboard)
  - Solid Light (white)
  - Solid Dark (dark gray)
- **Zoom Controls**: 10% - 200% zoom range
- **Side-by-Side Comparison**: Compare original vs optimized
- **Code Diff View**: Monaco-powered diff editor

### Performance Optimizations

- **Web Workers**: SVGO, Prettier, and code generation run in separate threads
- **Lazy Loading**: Components load on-demand
- **Code Splitting**: Optimized bundle chunking (monaco, prettier, svgo, ui)
- **Result Caching**: Smart LRU cache with 5-minute TTL
- **Optimized Bundle**: Main optimize route only 15.79 KB (97.4% reduction)

---

## 🗂️ Project Structure

```
tiny-svg/
├── apps/
│   └── web/                      # Main web application
│       ├── src/
│       │   ├── components/       # React components
│       │   │   ├── lazy/        # Lazy-loaded wrappers
│       │   │   ├── optimize/    # Optimize page components
│       │   │   └── ui/          # Reusable UI components
│       │   ├── hooks/           # Custom React hooks
│       │   │   ├── use-auto-compress.ts
│       │   │   ├── use-code-generation.ts
│       │   │   ├── use-local-storage.ts
│       │   │   └── ...
│       │   ├── lib/             # Utility functions
│       │   │   ├── svgo-config.ts      # SVGO configuration
│       │   │   ├── svg-to-code.ts      # Code generators
│       │   │   └── worker-utils/       # Worker utilities
│       │   ├── routes/          # File-based routing
│       │   │   ├── index.tsx    # Home page
│       │   │   └── optimize.tsx # Optimize page
│       │   ├── store/           # Global state (Zustand)
│       │   └── workers/         # Web Workers
│       │       ├── svgo.worker.ts
│       │       ├── code-generator.worker.ts
│       │       └── prettier.worker.ts
│       ├── public/              # Static assets
│       └── vite.config.ts       # Vite configuration
├── docs/
│   └── images/                  # Documentation images
├── package.json                 # Root package.json
└── README.md                    # This file
```

---

## 🔧 Configuration

### SVGO Plugins

Configure SVGO optimization through the UI or modify `lib/svgo-plugins.ts`:

```typescript
export const DEFAULT_PLUGINS: SvgoPluginConfig[] = [
  { name: 'removeDoctype', enabled: true },
  { name: 'removeXMLProcInst', enabled: true },
  { name: 'removeComments', enabled: true },
  // ... 40+ plugins
];
```

### Vite Configuration

Customize build settings in `apps/web/vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['@monaco-editor/react', 'monaco-editor'],
          prettier: ['prettier/standalone', /* ... */],
          svgo: ['svgo'],
          ui: ['@radix-ui/*'],
        },
      },
    },
  },
});
```

---

## 📝 Usage Examples

### Optimizing an SVG

1. **Upload** or **paste** your SVG code
2. **Configure** SVGO plugins in the sidebar
3. **Preview** the optimized result
4. **Download** or **copy** the optimized SVG

### Generating Framework Code

1. Optimize your SVG first
2. Switch to **code generation tabs** (React JSX/TSX, Vue, etc.)
3. **Prettify** the code if needed
4. **Copy** or **download** the generated code

### Customizing Preview

1. Click the **background button** to cycle through styles
2. Use **zoom controls** to adjust preview size
3. Compare **original vs optimized** in side-by-side view

---

## 🚀 Deployment

### Cloudflare Workers (Recommended)

```bash
# Build and deploy
cd apps/web
pnpm deploy
```

Your app will be deployed to: `https://your-app.workers.dev`

### Custom Domain

Configure in `wrangler.toml`:

```toml
name = "tiny-svg"
compatibility_date = "2024-01-01"

[env.production]
routes = [
  { pattern = "tiny-svg.actnow.dev", custom_domain = true }
]
```

### Environment Variables

Create `.env` file in `apps/web/`:

```env
# Optional: Analytics, error tracking, etc.
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Follow **Biome** linting rules
- Write **TypeScript** with strict mode
- Use **conventional commits** format
- Add **tests** for new features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[SVGO](https://github.com/svg/svgo)** - The powerful SVG optimizer
- **[TanStack](https://tanstack.com/)** - Amazing React ecosystem
- **[Cloudflare](https://www.cloudflare.com/)** - Serverless infrastructure
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **All contributors** who have helped improve this project

---

## 📞 Support

- **Live Demo**: [https://tiny-svg.actnow.dev](https://tiny-svg.actnow.dev)
- **Issues**: [GitHub Issues](https://github.com/your-username/tiny-svg/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/tiny-svg/discussions)

---

<div align="center">

Made with ❤️ by developers, for developers

**[⬆ Back to Top](#tiny-svg)**

</div>
