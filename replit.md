# Houidi.com Landing Page

## Overview

A modern, conversion-focused landing page for Houidi.com - a company that helps small business owners launch their first website using AI. The application is built as a full-stack TypeScript project with a React frontend and Express backend, designed to generate leads through WhatsApp contact rather than traditional forms.

The primary goal is to build credibility, filter unserious leads, and encourage qualified business owners to contact via WhatsApp. The design emphasizes a dark mode, professional aesthetic with WhatsApp-green accents.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: Shadcn/ui component library (New York style) with Radix UI primitives
- **Animations**: Framer Motion for scroll animations and entry effects
- **Build Tool**: Vite with path aliases (`@/` for client/src, `@shared/` for shared)

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # UI components (Shadcn + custom)
│   │   ├── hooks/        # React hooks
│   │   ├── lib/          # Utilities and query client
│   │   └── pages/        # Page components
├── server/           # Express backend
│   ├── db.ts         # Database connection
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Data access layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client/server
│   ├── routes.ts     # API route definitions with Zod schemas
│   └── schema.ts     # Drizzle database schema
└── migrations/       # Database migrations
```

### Design Patterns
- **Monorepo Structure**: Single repository with client, server, and shared code
- **Type Safety**: End-to-end TypeScript with shared types between frontend and backend
- **Schema-First API**: Routes defined with Zod schemas for input/output validation
- **Component Library**: Shadcn/ui components customized with project-specific theming

### Database Schema
- **inquiries**: Stores contact form submissions (name, message, isSerious flag)
  - Note: Currently unused as the UI uses WhatsApp-only workflow, but prepared for future use

### Key Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push schema changes to database

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database toolkit with migration support
- **connect-pg-simple**: PostgreSQL session store (available for session management)

### Frontend Libraries
- **Radix UI**: Accessible component primitives (dialogs, menus, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **TanStack Query**: Data fetching and caching

### Development Tools
- **Vite**: Frontend build tool with HMR
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)
- **esbuild**: Server bundling for production
