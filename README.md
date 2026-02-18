# PakFactory Project Brief

A React application built with Vite, TypeScript, and Tailwind CSS featuring the Elite Design System.

## Features

- ⚡️ Vite for fast development and builds
- ⚛️ React 18 with TypeScript
- 🎨 Tailwind CSS with Elite Design System (Dark Mode)
- 🎯 Lucide React icons
- 📦 Context API for state management (BriefContext)
- 🏗️ Modular component architecture

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── DashboardLayout.tsx  # Main layout with sidebar and header
│   ├── Header.tsx           # Top header component
│   └── Sidebar.tsx          # Left sidebar navigation
├── contexts/
│   └── BriefContext.tsx     # React Context for brief data
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Global styles with Tailwind
```

## Design System

The Elite Design System uses:
- **Primary Background**: Deep charcoal/black (`#0a0a0a`)
- **Surface**: Slightly lighter (`#141414`)
- **Borders**: Thin, light gray (`#2a2a2a`)
- **Typography**: Inter font family (clean sans-serif)

## BriefContext

The `BriefContext` provides:
- `fullName`: User's full name
- `email`: User's email
- `productType`: Selected product type

Use the `useBrief()` hook to access and update these values.

