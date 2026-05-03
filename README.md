# LLMate Chat

**The frontend for LLMate — talk to any AI model through one interface.**

A React client that connects to the [LLMate](../LLMate) gateway. Pick a model, type a message, get streaming responses. Supports OpenAI, Anthropic, Google Gemini, Ollama, Groq, and every other provider LLMate supports — all from the same chat window.

---

## See It In Action

<!-- Add a screenshot or GIF of the chat interface here -->
<!-- ![LLMate Chat dark mode](./docs/screenshot-dark.png) -->
<!-- ![LLMate Chat light mode](./docs/screenshot-light.png) -->

The interface ships with a dark theme (charcoal + emerald accents) and a light theme (white + violet accents). Theme switching is instant via `Cmd+Shift+L`.

---

## Features

- **Real-time SSE streaming** — custom `ReadableStream` parser handles fast token delivery without chunking glitches
- **16+ AI models** — switch between GPT-4o, Claude 3.5 Sonnet, Gemini 2.5, Llama 3.2, Groq, and more from a single dropdown
- **Brain Prompts** — six pre-built system prompt templates (Code Expert, Concept Explainer, Code Reviewer, Creative Writer, Tech Docs, Bug Hunter) that reconfigure the AI's persona before your first message
- **Full Markdown rendering** — syntax-highlighted code blocks with copy-to-clipboard, GFM tables, and nested lists via `react-markdown` + `rehype-highlight`
- **Dark/Light themes** — CSS variable-driven theming with smooth transitions, custom scrollbars, and grain texture overlay
- **Keyboard-first navigation** — 12 shortcuts including `Cmd+K` (model selector), `Cmd+N` (new chat), `Cmd+B` (toggle sidebar), `/` (focus input)
- **Persistent state** — conversations, model selection, and preferences survive page reloads via Zustand + localStorage
- **File attachments, voice input, voice output** — drag-and-drop files, speak your message, hear the response

---

## Tech Stack

| Layer            | Technology                                                    |
|------------------|---------------------------------------------------------------|
| Framework        | React 18 + Vite 7                                             |
| Language         | TypeScript 5.5                                                |
| Styling          | Tailwind CSS v3 + CSS Variables + `@tailwindcss/typography`   |
| State            | Zustand 4 with Immer middleware + localStorage persistence    |
| Data Fetching    | TanStack React Query 5 + custom SSE stream parser             |
| Animations       | Framer Motion 11                                              |
| UI Primitives    | Radix UI (Dialog, Dropdown, Select, Slider, Switch, Tabs, Toast, Tooltip, ScrollArea) |
| Markdown         | react-markdown + remark-gfm + rehype-highlight + highlight.js |
| Icons            | react-icons (Lucide + Simple Icons)                           |
| Fonts            | Sora (display), DM Sans (body), JetBrains Mono (code)        |
| Routing          | React Router DOM v7                                           |

---

## Quick Start

### Prerequisites

| Tool    | Version | Link                          |
|---------|---------|-------------------------------|
| Node.js | 18+     | https://nodejs.org            |
| pnpm    | 8+      | https://pnpm.io               |
| LLMate  | running | See [LLMate README](../LLMate/README.md) |

The LLMate Spring Boot backend must be running on `http://localhost:8080` before starting the frontend.

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

The `.env` file is already present with working defaults:

```bash
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=LLMate
VITE_DEFAULT_MODEL=fast
VITE_DEFAULT_PROVIDER=openai
VITE_ENABLE_VOICE=true
VITE_ENABLE_FILES=true
VITE_ENABLE_EMBED=true
VITE_MAX_FILE_SIZE_MB=10
VITE_MAX_ATTACHMENTS=5
VITE_ENABLED_PROVIDERS="openai,anthropic,google,ollama"
```

If your backend runs on a different port, change `VITE_API_BASE_URL`.

To show models from additional providers (Groq, DeepSeek, etc.), add them to `VITE_ENABLED_PROVIDERS`.

### 3. Start Development Server

```bash
pnpm run dev
```

Open **http://localhost:3000**. The Vite dev server proxies `/api` and `/actuator` requests to `localhost:8080` automatically.

### 4. Build for Production

```bash
pnpm run build
```

Output lands in `dist/`. Serve with any static file server. The production build uses manual chunk splitting:

| Chunk      | Contents                                            |
|------------|-----------------------------------------------------|
| `vendor`   | react, react-dom                                    |
| `ui`       | react-icons, class-variance-authority, clsx, tailwind-merge |
| `state`    | zustand, @tanstack/react-query                      |
| `markdown` | react-markdown, remark-gfm, rehype-highlight        |

---

## Environment Variables

| Variable                | Default                  | Description                                      |
|-------------------------|--------------------------|--------------------------------------------------|
| `VITE_API_BASE_URL`     | `http://localhost:8080`  | LLMate backend URL                               |
| `VITE_APP_NAME`         | `LLMate`                | App name shown in UI                             |
| `VITE_DEFAULT_MODEL`    | `fast`                  | Default model alias on first load                |
| `VITE_DEFAULT_PROVIDER` | `openai`                | Default provider on first load                   |
| `VITE_ENABLE_VOICE`     | `true`                  | Enable voice input/output buttons                |
| `VITE_ENABLE_FILES`     | `true`                  | Enable file attachment drag-and-drop             |
| `VITE_ENABLE_EMBED`     | `true`                  | Enable embedding mode in input toolbar           |
| `VITE_MAX_FILE_SIZE_MB` | `10`                    | Max file size for attachments (MB)               |
| `VITE_MAX_ATTACHMENTS`  | `5`                     | Max number of files per message                  |
| `VITE_ENABLED_PROVIDERS`| `openai,anthropic,google,ollama` | Comma-separated provider filter for model list |

---

## Architecture

### Directory Structure

```
src/
├── api/                          API client layer
│   ├── client.ts                 Axios instance with base URL config
│   ├── chat.api.ts               chatBlocking(), chatStream(), embed()
│   ├── stream.ts                 Async generator SSE parser (handles fragmented chunks)
│   └── providers.api.ts          Fetch provider list from backend
│
├── components/
│   ├── chat/                     Message rendering
│   │   ├── ChatArea.tsx          Scrollable message container
│   │   ├── MessageList.tsx       Message iterator
│   │   ├── MessageItem.tsx       User/Assistant router
│   │   ├── UserMessage.tsx       User bubble
│   │   ├── AssistantMessage.tsx  Assistant bubble with provider badge
│   │   ├── MarkdownRenderer.tsx  Full Markdown + syntax highlighting + copy button
│   │   ├── StreamingIndicator.tsx Animated dots during generation
│   │   ├── TypingCursor.tsx      Blinking cursor
│   │   ├── UsageBadge.tsx        Token count + latency display
│   │   ├── MessageActions.tsx    Copy, delete, retry actions
│   │   └── AttachmentPreview.tsx File thumbnail in messages
│   │
│   ├── input/                    Message input area
│   │   ├── InputArea.tsx         Textarea with auto-resize + submit logic
│   │   ├── InputToolbar.tsx      Mode buttons (text, voice, image-gen, embed)
│   │   ├── ModeSelector.tsx      Input mode switching
│   │   ├── SendButton.tsx        Animated send/stop button
│   │   ├── VoiceButton.tsx       Web Speech API microphone
│   │   ├── AttachButton.tsx      File picker trigger
│   │   ├── AttachedFileChip.tsx  Pending attachment chip
│   │   ├── FileDropZone.tsx      Drag-and-drop overlay
│   │   └── SavedPromptsMenu.tsx  User's saved prompt library
│   │
│   ├── layout/                   App shell
│   │   ├── AppShell.tsx          Sidebar + main panel resizable layout
│   │   └── MainPanel.tsx         Welcome screen or active chat
│   │
│   ├── sidebar/                  Conversation history sidebar
│   ├── topbar/                   Model display + action buttons
│   ├── model-selector/           Model picker with capability filtering
│   ├── settings/                 Settings modal (API, Appearance, Shortcuts, Export)
│   ├── welcome/                  Landing screen
│   │   ├── WelcomeScreen.tsx     Container
│   │   ├── HeroOrb.tsx           Animated gradient orb
│   │   ├── GreetingText.tsx      Time-based greeting
│   │   └── SuggestedPromptGrid.tsx Brain Prompt template cards
│   │
│   └── ui/                       13 primitive components
│       ├── Button, Input, Modal, GlassPanel, Avatar, Badge,
│       │   Dropdown, ScrollArea, Separator, Skeleton, Spinner,
│       │   Tooltip, OrbGlow
│
├── config/
│   ├── api.config.ts             Base URL from env
│   ├── app.config.ts             App-wide constants
│   ├── models.config.ts          16 model definitions with capabilities + colors
│   └── prompts.config.ts         6 Brain Prompt templates
│
├── hooks/
│   ├── useChat.ts                Core chat orchestrator (send, stream, error handling)
│   ├── useConversation.ts        Active conversation accessor
│   ├── useAutoScroll.ts          Scroll-to-bottom on new messages
│   ├── useKeyboardShortcuts.ts   12 global keyboard shortcuts
│   ├── useFileUpload.ts          Drag-and-drop + file validation
│   ├── useVoiceInput.ts          Web Speech API recording
│   ├── useVoiceOutput.ts         SpeechSynthesis playback
│   └── useProviders.ts           Fetch + cache provider availability
│
├── store/                        Zustand stores (all persisted to localStorage)
│   ├── chat.store.ts             Conversations, messages, CRUD, search
│   ├── model.store.ts            Selected model, parameters, system prompt
│   ├── settings.store.ts         Theme, font size, preferences
│   └── ui.store.ts               Sidebar, modals, attachments, generating state
│
├── styles/
│   ├── globals.css               CSS variables (dark/light), scrollbar, highlight.js themes
│   └── animations.css            Custom keyframe animations
│
├── types/                        TypeScript interfaces
│   ├── api.types.ts              DTO shapes matching backend
│   ├── chat.types.ts             Conversation, Message
│   ├── model.types.ts            ModelConfig, ModelParameters
│   └── settings.types.ts         SavedPrompt, UserSettings
│
└── utils/
    └── cn.ts                     clsx + tailwind-merge utility
```

### Data Flow

```
User types message
       │
       ▼
  useChat.ts hook
       │
       ├─── Creates user Message in chat.store
       ├─── Creates empty assistant Message (status: "sending")
       ├─── Reads model + parameters from model.store
       ├─── Prepends system prompt to message history
       │
       ▼
  chatApi.chatStream()
       │
       ├─── fetch() to /api/v1/chat/stream/json (SSE)
       ├─── readStream() async generator parses SSE events
       │    (handles fragmented UTF-8 chunks, double-newline boundaries)
       │
       ▼
  onChunk callback
       │
       ├─── Accumulates delta text
       ├─── Updates assistant message in chat.store
       ├─── Tracks provider/model from response metadata
       │
       ▼
  Message complete → status: "complete", latencyMs recorded
```

### The Brain Prompt System

When the app loads with no active conversation, the **Welcome Screen** shows six template cards. Selecting one:

1. Swaps the global system prompt in `model.store` to a specialized variant (e.g., "You are a pedantic but constructive Lead Architect...")
2. Pre-fills the user input with a starter message
3. Sets `activeTemplateId` for visual indication

After the first message is sent, `activeTemplateId` is cleared so the template does not persist across conversations. The default system prompt enforces: no filler, no emojis, structured output, step-by-step reasoning, and proactive follow-up questions.

---

## Keyboard Shortcuts

| Shortcut               | Action                    |
|------------------------|---------------------------|
| `Cmd/Ctrl + K`         | Open model selector       |
| `Cmd/Ctrl + N`         | New conversation          |
| `Cmd/Ctrl + B`         | Toggle sidebar            |
| `Cmd/Ctrl + ,`         | Open settings             |
| `Cmd/Ctrl + Shift + L` | Toggle dark/light theme   |
| `Cmd/Ctrl + Shift + P` | Toggle markdown preview   |
| `Cmd/Ctrl + Shift + ⌫` | Clear current conversation|
| `Cmd/Ctrl + Shift + D` | Delete current conversation|
| `/`                    | Focus chat input          |
| `Alt + 1`              | Text mode                 |
| `Alt + 2`              | Voice mode                |
| `Alt + 3`              | Image generation mode     |
| `Alt + 4`              | Embedding mode            |
| `Esc`                  | Close modal / exit preview|

---

## Theming

The design system uses CSS custom properties. All colors, radii, shadows, and fonts are defined in `src/styles/globals.css` under `:root[data-theme="dark"]` and `:root[data-theme="light"]`.

**Dark theme:** Charcoal background (`#212121`), emerald primary (`#10a37f`), warm neutrals.

**Light theme:** White background, violet primary (`#6D28D9`), cool slate neutrals.

Tailwind is bridged to CSS variables via the `llm` color namespace in `tailwind.config.ts`:

```typescript
colors: {
  llm: {
    bg: 'var(--color-bg)',
    surface: 'var(--color-surface)',
    primary: 'var(--color-primary)',
    // ...
  }
}
```

Typography uses three font families loaded from Google Fonts: **Sora** (headings), **DM Sans** (body), **JetBrains Mono** (code).

Code blocks use a custom highlight.js theme (Kanagawa-inspired for dark, One Light-inspired for light).

---

## Available Scripts

| Command            | Description                                         |
|--------------------|-----------------------------------------------------|
| `pnpm run dev`     | Start Vite dev server on port 3000 with HMR         |
| `pnpm run build`   | TypeScript check + production build to `dist/`       |
| `pnpm run preview` | Preview production build locally                     |
| `pnpm run lint`    | Run ESLint across the codebase                       |

---

## Connecting to the Backend

The Vite dev server proxies two paths to the backend:

```typescript
// vite.config.ts
proxy: {
  '/api':      { target: 'http://localhost:8080', changeOrigin: true },
  '/actuator': { target: 'http://localhost:8080', changeOrigin: true }
}
```

In production, configure your reverse proxy (Nginx, Caddy, etc.) to route `/api/*` and `/actuator/*` to the LLMate backend, and serve the `dist/` folder for everything else.

---

## Known Limitations

- No user authentication — anyone with access to the URL can chat. Add auth at the reverse proxy or backend level for production.
- Chat history is stored in the browser's localStorage. Clearing browser data deletes all conversations.
- Voice input uses the Web Speech API — browser support varies (works best in Chrome).
- File attachments are sent as metadata only; the backend must support multimodal inputs for the selected provider.
- No mobile-optimized layout yet — works but the sidebar experience is not ideal on small screens.

---

## License

Apache 2.0 — free to use, modify, and redistribute.

---

*LLMate Chat — the frontend for [LLMate](../LLMate)*
