# tiny-svg

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, Self, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components

## Getting Started

First, install the dependencies:

```bash
pnpm install
```


Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see your fullstack application.

## Building and Deployment

**⚠️ 重要提示：** 本项目使用 TanStack Start (SSR 框架)，存在已知的 CSS 加载问题。

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

### 本地预览生产构建的问题

使用 `pnpm run build` + `wrangler dev` 在本地预览生产构建时，**CSS 样式不会加载**。这是 TanStack Start 在本地 Cloudflare Workers 环境中的已知限制。

如果需要测试生产构建，请：
- 使用 `pnpm dev` 进行开发测试
- 或直接部署到 Cloudflare Workers 测试

## Deployment (Cloudflare Wrangler)

Deploy to Cloudflare:

```bash
cd apps/web && pnpm deploy
```

## Project Structure

```
tiny-svg/
├── apps/
│   └── web/         # Fullstack application (React + TanStack Start)
├── packages/
│   ├── api/         # API layer / business logic
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm check-types`: Check TypeScript types across all apps
