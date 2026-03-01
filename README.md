<div align="center">
  <img src="https://github.com/Venumadhavmule.png" alt="LLMate Chat Logo" width="120" />
  <h1>LLMate Chat</h1>
  <p><strong>A highly advanced, beautifully crafted React client engineered to connect seamlessly with the LLMate AI Gateway.</strong></p>
</div>

---

LLMate Chat provides a robust, modern interface supporting ultra-fast real-time streaming, dynamic "Brain Prompt" templating, and capability-based model selection (text, vision, reasoning) across leading AI providers.

## ✨ Core Features

- **Modern & Beautiful UI/UX**: Built with Tailwind CSS and Framer Motion for smooth, dynamic animations, glassmorphism panels, and pristine typography.
- **Theme Awareness**: Native support for both deep Dark Mode and clean Light Mode, with intelligent CSS variables syncing seamlessly to Tailwind classes.
- **Real-Time Streaming**: Custom-built Server-Sent Events (SSE) parsing to handle extremely fast backend AI streaming without chunking glitches.
- **Dynamic System Prompts**: Go beyond simple system contexts—utilize our "Suggested Prompts" to instantly inject highly specialized, rigorous background constraints (e.g., Code Writer, Concept Explainer) directly into the LLM's brain.
- **Advanced Model Selector**: Intelligently switch between Google Gemini, OpenAI, Anthropic, Groq, and local Ollama models with capability-based filtering.
- **Flawless Markdown**: Native structural parsing, syntax highlighting, and copy-to-clipboard functionality for advanced code rendering.

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + Custom CSS Variables
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Markdown**: `react-markdown`, `remark-gfm`, `rehype-highlight`

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

**1. Install Dependencies**

```bash
pnpm install
```

**2. Environment Configuration**

Copy the example environment file and adjust if your backend is running on a different port:

```bash
cp .env.example .env
```
*(Default API URL is `http://localhost:8080` for the LLMate Spring Boot backend)*

**3. Start the Development Server**

```bash
pnpm run dev
```
*The application will be available at `http://localhost:3000`.*

**4. Build for Production**

```bash
pnpm run build
```

## 📂 Architecture Overview

```text
src/
├── api/             # API client services, strict DTO type definitions, and raw streaming parsers
├── components/      # Reusable React components
│   ├── chat/        # Message bubbles, Markdown renderer, Input area
│   ├── layout/      # AppShell, MainPanel, Sidebar
│   ├── model-selector/ # Capability filters, parameter adjustments
│   ├── ui/          # Primitive building blocks (Buttons, Dropdowns, GlassPanels)
│   └── welcome/     # Custom template grid and hero orb animations
├── config/          # Static configurations (models, specialized prompt templates)
├── hooks/           # Custom React hooks (useChat, useKeyboardShortcuts)
├── store/           # Zustand persistent stores (Model state, Chat history, UI preferences)
├── styles/          # Global CSS, theme variables, and custom keyframe animations
└── types/           # Global TypeScript interfaces
```

## 🧠 The "Brain Prompt" Architecture

LLMate Chat doesn't rely solely on user input. It utilizes a highly rigorous default **System Prompt** strictly designed to enforce technical perfection, mandate standardized list formatting, completely prevent emoji usage, and proactively instruct the AI to ask follow-up questions if it lacks necessary context. 

When users select a **Suggested Template** from the Welcome screen, the UI intelligently bypasses the default context and swaps the global system state to a specialized prompt variant. This is tailored specifically for tasks like Fact-Checking, Code Compilation, or Creative Brainstorming—ensuring the AI adopts the exact persona needed for the task before the user even types their first character.
