
# ╔══════════════════════════════════════════════════════════════════════════════════════╗
# ║         LLMATE REACT CHAT APPLICATION — COMPLETE AGENTIC BUILD PLAN                 ║
# ║         Ultra-Structured Implementation Blueprint for AI Coding Agents               ║
# ║         Stack: React 18 + Vite + TypeScript + Tailwind CSS + Zustand + Axios        ║
# ╚══════════════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 0 — PROJECT IDENTITY & DESIGN VISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  App Name        : LLMate Chat
  Root Directory  : llmate-chat/
  Design System   : Dark-first. Deep void blacks (#0A0A0F) with electric violet accents
                    (#7C3AED → #A78BFA gradient). Glassmorphism panels with
                    backdrop-blur. Subtle grain noise texture overlay. Orb/glow effects.
  Typography      : Display → "Sora" (Google Fonts). Body → "DM Sans". Mono → "JetBrains Mono"
  Backend URL     : http://localhost:8080  (LLMate Spring Boot — llmate.com project)
  Target Devices  : Desktop-first (1440px), responsive down to 768px (tablet)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 1 — TECHNOLOGY STACK (EXACT VERSIONS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Runtime & Build:
    - node                 >= 20.x
    - vite                 ^5.4.0      (bundler, dev server with HMR)
    - typescript           ^5.5.0      (strict mode enabled)
    - react                ^18.3.0
    - react-dom            ^18.3.0

  Styling:
    - tailwindcss          ^3.4.0      (utility-first CSS)
    - @tailwindcss/typography ^0.5.0  (prose markdown rendering)
    - autoprefixer         ^10.4.0
    - postcss              ^8.4.0
    - class-variance-authority ^0.7.0  (CVA — variant-based component styling)
    - clsx                 ^2.1.0      (conditional classnames)
    - tailwind-merge       ^2.5.0      (merge without conflicts)
    - framer-motion        ^11.3.0     (animations, layout transitions, gestures)

  State Management:
    - zustand              ^4.5.0      (global state — lightweight, no boilerplate)
    - immer                ^10.1.0     (immutable state updates in zustand)

  API & Data:
    - axios                ^1.7.0      (HTTP client — REST calls to LLMate backend)
    - @tanstack/react-query ^5.51.0    (server state, caching, loading states)
    - eventsource-parser   ^3.0.0      (SSE streaming parser for /chat/stream)

  UI Components:
    - @radix-ui/react-dialog         ^1.1.0   (modal dialogs)
    - @radix-ui/react-dropdown-menu  ^2.1.0   (model selector dropdown)
    - @radix-ui/react-tooltip        ^1.1.0   (hover tooltips)
    - @radix-ui/react-scroll-area    ^1.1.0   (custom scrollbars)
    - @radix-ui/react-select         ^2.1.0   (select inputs)
    - @radix-ui/react-slider         ^1.2.0   (temperature slider)
    - @radix-ui/react-switch         ^1.1.0   (toggle switches)
    - @radix-ui/react-tabs           ^1.1.0   (settings tabs)
    - @radix-ui/react-toast          ^1.2.0   (notifications)
    - lucide-react         ^0.400.0    (icon system — 1000+ icons)
    - react-hot-toast      ^2.4.0      (toast notifications)

  Content & Files:
    - react-markdown       ^9.0.0      (render LLM markdown output)
    - rehype-highlight     ^7.0.0      (syntax highlighting in code blocks)
    - remark-gfm           ^4.0.0      (GitHub-flavored markdown — tables, strikethrough)
    - highlight.js         ^11.10.0    (code highlighting themes)
    - react-dropzone       ^14.2.0     (drag-and-drop file uploads)

  Voice & Audio:
    - (native Web APIs only)          (SpeechRecognition, MediaRecorder — no extra deps)

  Utilities:
    - date-fns             ^3.6.0      (timestamp formatting)
    - uuid                 ^10.0.0     (conversation/message IDs)
    - react-resizable-panels ^2.1.0   (resizable sidebar)
    - react-virtualized-auto-sizer ^1.0.24  (large list performance)
    - react-window         ^1.8.10     (virtualized message list for long histories)

  Dev Tools:
    - eslint               ^9.8.0
    - @typescript-eslint/parser ^8.0.0
    - prettier             ^3.3.0
    - vite-plugin-svgr     ^4.2.0      (SVG as React components)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 2 — COMPLETE DIRECTORY STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  llmate-chat/
  ├── public/
  │   ├── favicon.ico
  │   ├── logo.svg                          # LLMate orb SVG logo
  │   └── fonts/                            # Self-hosted fallback fonts
  │
  ├── src/
  │   │
  │   ├── main.tsx                          # App entry — ReactDOM.createRoot
  │   ├── App.tsx                           # Root router + providers wrapper
  │   ├── vite-env.d.ts                     # Vite env type declarations
  │   │
  │   ├── assets/
  │   │   ├── grain.png                     # Noise texture overlay (low opacity)
  │   │   └── orb-gradient.svg              # Animated hero orb graphic
  │   │
  │   ├── styles/
  │   │   ├── globals.css                   # Tailwind directives, CSS variables, scrollbar styles
  │   │   ├── animations.css                # Keyframe animations (orb pulse, shimmer, typing)
  │   │   └── highlight-theme.css           # Code block syntax highlight theme (One Dark Pro)
  │   │
  │   ├── config/
  │   │   ├── models.config.ts              # MASTER model registry (all providers + models)
  │   │   ├── prompts.config.ts             # Saved/suggested prompt templates
  │   │   ├── api.config.ts                 # API base URLs, timeout, headers
  │   │   └── app.config.ts                 # Feature flags, default settings
  │   │
  │   ├── types/
  │   │   ├── chat.types.ts                 # Message, Conversation, Attachment types
  │   │   ├── model.types.ts                # Provider, Model, ModelCapability types
  │   │   ├── api.types.ts                  # Request/Response shapes (mirrors LLMate DTOs)
  │   │   └── settings.types.ts             # UserSettings, Theme types
  │   │
  │   ├── api/
  │   │   ├── client.ts                     # Axios instance with interceptors
  │   │   ├── chat.api.ts                   # chat(), chatStream(), embed()
  │   │   ├── providers.api.ts              # getProviders(), getModels(), getHealth()
  │   │   └── stream.ts                     # SSE stream reader/parser utility
  │   │
  │   ├── store/
  │   │   ├── index.ts                      # Re-exports all stores
  │   │   ├── chat.store.ts                 # Conversations, messages, active chat
  │   │   ├── model.store.ts                # Selected provider/model, parameters
  │   │   ├── ui.store.ts                   # Sidebar open/closed, modals, panels
  │   │   └── settings.store.ts             # User preferences, theme, API keys
  │   │
  │   ├── hooks/
  │   │   ├── useChat.ts                    # Send message, stream response, abort
  │   │   ├── useProviders.ts               # Fetch + cache provider list (react-query)
  │   │   ├── useStreamingMessage.ts        # SSE stream → state accumulation hook
  │   │   ├── useVoiceInput.ts              # Web SpeechRecognition API hook
  │   │   ├── useVoiceOutput.ts             # Web SpeechSynthesis TTS hook
  │   │   ├── useFileUpload.ts              # File validation, base64 encode, preview
  │   │   ├── useConversation.ts            # CRUD for conversations (localStorage)
  │   │   ├── useKeyboardShortcuts.ts       # Global hotkey bindings
  │   │   └── useAutoScroll.ts              # Auto-scroll to bottom on new message
  │   │
  │   ├── components/
  │   │   │
  │   │   ├── layout/
  │   │   │   ├── AppShell.tsx              # Root layout — sidebar + main area
  │   │   │   ├── Sidebar.tsx               # Left panel (collapsible, resizable)
  │   │   │   ├── MainPanel.tsx             # Right content area
  │   │   │   └── TopBar.tsx                # Header bar with model selector + actions
  │   │   │
  │   │   ├── sidebar/
  │   │   │   ├── SidebarHeader.tsx         # Logo + "New Chat" button
  │   │   │   ├── SearchBar.tsx             # Fuzzy-search conversations
  │   │   │   ├── NavLinks.tsx              # Explore / Library / Files / History links
  │   │   │   ├── ConversationList.tsx      # Grouped conversation history (Today/Yesterday/7days)
  │   │   │   ├── ConversationItem.tsx      # Single chat row with hover actions
  │   │   │   └── UserProfile.tsx           # Bottom user avatar + settings link
  │   │   │
  │   │   ├── topbar/
  │   │   │   ├── ModelSelector.tsx         # PRIMARY: Provider + model picker dropdown
  │   │   │   ├── ModelBadge.tsx            # Colored badge showing active model
  │   │   │   ├── TopBarActions.tsx         # Share / Export / Settings / Upgrade buttons
  │   │   │   └── ProviderStatusDot.tsx     # Live green/red dot per provider
  │   │   │
  │   │   ├── chat/
  │   │   │   ├── ChatArea.tsx              # Full chat container — handles both states
  │   │   │   ├── WelcomeScreen.tsx         # Empty state — hero orb + greeting + prompt cards
  │   │   │   ├── MessageList.tsx           # Virtualized scrollable message feed
  │   │   │   ├── MessageItem.tsx           # Single message (user or assistant)
  │   │   │   ├── UserMessage.tsx           # User bubble — right-aligned, purple tint
  │   │   │   ├── AssistantMessage.tsx      # AI bubble — left-aligned, glass panel
  │   │   │   ├── MessageActions.tsx        # Copy / Regenerate / Like / Branch buttons
  │   │   │   ├── StreamingIndicator.tsx    # Animated dots while response streams
  │   │   │   ├── TypingCursor.tsx          # Blinking cursor at end of streaming text
  │   │   │   ├── CodeBlock.tsx             # Syntax-highlighted code with copy button
  │   │   │   ├── MarkdownRenderer.tsx      # Full markdown → styled React elements
  │   │   │   ├── AttachmentPreview.tsx     # Inline image/file preview in messages
  │   │   │   └── UsageBadge.tsx            # Token count + latency micro-badge
  │   │   │
  │   │   ├── input/
  │   │   │   ├── InputArea.tsx             # Master input container (bottom panel)
  │   │   │   ├── MessageInput.tsx          # Auto-growing textarea
  │   │   │   ├── InputToolbar.tsx          # All action buttons below textarea
  │   │   │   ├── SendButton.tsx            # Animated send / stop-streaming button
  │   │   │   ├── VoiceButton.tsx           # Mic button — recording animation
  │   │   │   ├── AttachButton.tsx          # File attach trigger (opens dropzone)
  │   │   │   ├── FileDropZone.tsx          # Drag-and-drop overlay
  │   │   │   ├── AttachedFileChip.tsx      # Chip showing attached file name
  │   │   │   ├── ModeSelector.tsx          # Text / Voice / Image generation mode tabs
  │   │   │   └── SavedPromptsMenu.tsx      # Quick-insert prompt templates
  │   │   │
  │   │   ├── model-selector/
  │   │   │   ├── ModelSelectorModal.tsx    # Full-screen model browser (grid layout)
  │   │   │   ├── ProviderGroup.tsx         # Collapsible provider section
  │   │   │   ├── ModelCard.tsx             # Individual model card (icon, name, caps)
  │   │   │   ├── ModelCapabilityBadge.tsx  # Badge: CHAT / STREAM / EMBED / VISION etc.
  │   │   │   ├── ParameterPanel.tsx        # Temperature, max tokens, top-p sliders
  │   │   │   └── ModelSearchBar.tsx        # Filter models by name/capability
  │   │   │
  │   │   ├── welcome/
  │   │   │   ├── HeroOrb.tsx               # Animated purple orb (CSS + framer-motion)
  │   │   │   ├── GreetingText.tsx           # "Hello, [Name]" + subtitle with typewriter
  │   │   │   └── SuggestedPromptGrid.tsx   # 3-column card grid of quick-start prompts
  │   │   │
  │   │   ├── settings/
  │   │   │   ├── SettingsModal.tsx         # Full settings dialog
  │   │   │   ├── GeneralSettings.tsx       # Theme, language, user name
  │   │   │   ├── APISettings.tsx           # Backend URL + per-provider API key overrides
  │   │   │   ├── AppearanceSettings.tsx    # Font size, density, color accent
  │   │   │   └── KeyboardShortcutsPanel.tsx # Shortcut reference
  │   │   │
  │   │   └── ui/                           # Primitive, reusable design system components
  │   │       ├── Button.tsx                # CVA-based button (variants: primary/ghost/danger)
  │   │       ├── Input.tsx                 # Styled input / textarea
  │   │       ├── Badge.tsx                 # Pill badge (colors from CSS vars)
  │   │       ├── Spinner.tsx               # Loading spinner (CSS animation)
  │   │       ├── Skeleton.tsx              # Shimmer skeleton loader
  │   │       ├── Tooltip.tsx               # Radix tooltip wrapper
  │   │       ├── Modal.tsx                 # Radix dialog wrapper
  │   │       ├── Dropdown.tsx              # Radix dropdown-menu wrapper
  │   │       ├── ScrollArea.tsx            # Radix scroll-area with custom track
  │   │       ├── Separator.tsx             # Horizontal/vertical divider
  │   │       ├── Avatar.tsx                # User/AI avatar with fallback initials
  │   │       ├── GlassPanel.tsx            # backdrop-blur glassmorphism panel
  │   │       └── OrbGlow.tsx               # Reusable ambient glow element
  │   │
  │   ├── pages/
  │   │   ├── ChatPage.tsx                  # Main chat view (AppShell + ChatArea)
  │   │   ├── LibraryPage.tsx               # Saved conversations browser
  │   │   ├── FilesPage.tsx                 # Uploaded files manager
  │   │   └── ExplorePage.tsx               # Model/prompt discovery (future)
  │   │
  │   └── utils/
  │       ├── cn.ts                         # clsx + tailwind-merge helper: cn(...classes)
  │       ├── formatDate.ts                 # date-fns formatters
  │       ├── messageHelpers.ts             # Truncate, group by date, token estimate
  │       ├── fileHelpers.ts                # MIME validation, size limits, base64
  │       ├── exportChat.ts                 # Export as Markdown / JSON / PDF
  │       ├── localStorage.ts              # Typed localStorage get/set/remove
  │       └── errorMessages.ts             # Human-readable API error mapping
  │
  ├── index.html                            # Vite entry HTML — Google Fonts import
  ├── vite.config.ts                        # Vite config with proxy to :8080
  ├── tailwind.config.ts                    # Tailwind theme extension
  ├── tsconfig.json                         # TypeScript strict config
  ├── tsconfig.node.json
  ├── postcss.config.js
  ├── .env                                  # VITE_API_BASE_URL=http://localhost:8080
  ├── .env.example                          # Template for .env
  ├── .eslintrc.json
  ├── .prettierrc
  └── package.json


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 3 — MASTER MODEL REGISTRY (models.config.ts)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Every model the UI knows about. Maps to LLMate backend alias/shorthand.
  Format: { id, provider, displayName, alias, capabilities[], contextWindow, badge }

  PROVIDER: openai
    - gpt-4o              | alias: "openai/gpt-4o"           | caps: [CHAT, STREAM, VISION, TOOLS, JSON]
    - gpt-4o-mini         | alias: "fast"                    | caps: [CHAT, STREAM, VISION, TOOLS, JSON]
    - gpt-4-turbo         | alias: "openai/gpt-4-turbo"      | caps: [CHAT, STREAM, VISION, TOOLS]
    - o1                  | alias: "openai/o1"               | caps: [CHAT, REASONING]
    - o1-mini             | alias: "openai/o1-mini"          | caps: [CHAT, REASONING]
    - text-emb-3-small    | alias: "embed"                   | caps: [EMBEDDINGS]

  PROVIDER: anthropic
    - claude-3-5-sonnet   | alias: "smart"                   | caps: [CHAT, STREAM, VISION, TOOLS]
    - claude-3-5-haiku    | alias: "haiku"                   | caps: [CHAT, STREAM, VISION, TOOLS]
    - claude-3-opus       | alias: "opus"                    | caps: [CHAT, STREAM, VISION, TOOLS]
    - claude-3-haiku      | alias: "anthropic/claude-3-haiku"| caps: [CHAT, STREAM]

  PROVIDER: ollama  (local — free)
    - llama3.2            | alias: "local"                   | caps: [CHAT, STREAM]
    - llama3.2:7b         | alias: "ollama/llama3.2:7b"      | caps: [CHAT, STREAM]
    - mistral             | alias: "mistral"                 | caps: [CHAT, STREAM]
    - phi3                | alias: "phi"                     | caps: [CHAT, STREAM]
    - gemma2              | alias: "ollama/gemma2"           | caps: [CHAT, STREAM]
    - codellama           | alias: "code"                    | caps: [CHAT, STREAM]
    - nomic-embed-text    | alias: "ollama/nomic-embed-text" | caps: [EMBEDDINGS]

  PROVIDER: groq  (future — add when LLMate adapter added)
    - llama-3.1-70b       | alias: "groq/llama-3.1-70b"     | badge: "FAST ⚡"
    - mixtral-8x7b        | alias: "groq/mixtral-8x7b"      | badge: "FAST ⚡"
    - gemma2-9b           | alias: "groq/gemma2-9b"         | badge: "FAST ⚡"

  PROVIDER: google  (future)
    - gemini-1.5-pro      | alias: "google/gemini-1.5-pro"  | caps: [CHAT, STREAM, VISION]
    - gemini-1.5-flash    | alias: "google/gemini-1.5-flash"| badge: "FAST ⚡"
    - gemini-2.0-flash    | alias: "google/gemini-2.0-flash"| badge: "NEW ✨"

  PROVIDER: nvidia  (future)
    - llama-3.1-nemotron  | alias: "nvidia/nemotron-70b"    | badge: "GPU 🎮"

  Each model entry shape (TypeScript):
  {
    id: string,
    provider: ProviderKey,           // 'openai' | 'anthropic' | 'ollama' | 'groq' | 'google' | 'nvidia'
    displayName: string,
    alias: string,                   // Sent as "model" field to LLMate API
    description: string,
    contextWindow: number,           // Max tokens (display only)
    capabilities: ModelCapability[], // ['CHAT', 'STREAM', 'VISION', 'TOOLS', 'JSON', 'EMBEDDINGS', 'REASONING']
    badge?: string,                  // "FAST ⚡" | "NEW ✨" | "FREE" | etc.
    isLocal?: boolean,               // Ollama models
    isFree?: boolean,
    isPremium?: boolean,
    providerColor: string,           // CSS hex — for badge/icon tinting
    icon: string,                    // Lucide icon name or custom SVG path
  }


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 4 — TYPE SYSTEM (src/types/)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ### chat.types.ts
  ```typescript
  export type MessageRole = 'user' | 'assistant' | 'system';
  export type MessageStatus = 'sending' | 'streaming' | 'complete' | 'error';
  export type InputMode = 'text' | 'voice' | 'image-gen' | 'embed';

  export interface Attachment {
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'text' | 'code' | 'other';
    mimeType: string;
    size: number;           // bytes
    url: string;            // local object URL for preview
    base64?: string;        // for sending to API
  }

  export interface Message {
    id: string;             // UUID
    conversationId: string;
    role: MessageRole;
    content: string;        // Markdown string
    status: MessageStatus;
    model?: string;         // Which model generated this
    provider?: string;
    attachments?: Attachment[];
    usage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
    latencyMs?: number;
    createdAt: number;      // Unix timestamp ms
    error?: string;
  }

  export interface Conversation {
    id: string;
    title: string;          // Auto-generated from first message
    messages: Message[];
    model: string;          // Alias used
    provider: string;
    createdAt: number;
    updatedAt: number;
    isPinned?: boolean;
    tags?: string[];
  }
  ```

  ### model.types.ts
  ```typescript
  export type ProviderKey = 'openai' | 'anthropic' | 'ollama' | 'groq' | 'google' | 'nvidia';
  export type ModelCapability = 'CHAT' | 'STREAM' | 'VISION' | 'TOOLS' | 'JSON' | 'EMBEDDINGS' | 'REASONING';

  export interface ModelConfig {
    id: string;
    provider: ProviderKey;
    displayName: string;
    alias: string;
    description: string;
    contextWindow: number;
    capabilities: ModelCapability[];
    badge?: string;
    isLocal?: boolean;
    isFree?: boolean;
    isPremium?: boolean;
    providerColor: string;
    icon: string;
  }

  export interface ModelParameters {
    temperature: number;    // 0.0 – 2.0, default 0.7
    maxTokens: number;      // 100 – 8192, default 1000
    systemPrompt: string;   // Pre-pended as system message
    stream: boolean;        // Toggle streaming on/off
  }
  ```

  ### api.types.ts (mirrors LLMate Spring Boot DTOs exactly)
  ```typescript
  export interface ChatRequestDto {
    provider?: string;
    model: string;          // alias or "provider/model" shorthand
    messages: { role: string; content: string }[];
    temperature?: number;
    maxTokens?: number;
    tenantId?: string;
  }

  export interface ChatResponseDto {
    id: string;
    provider: string;
    model: string;
    content: string;
    choices: { role: string; content: string }[];
    usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
    createdAt: string;
  }

  export interface ProviderInfoDto {
    providerId: string;
    displayName: string;
    capabilities: string[];
    available: boolean;
  }

  export interface StreamChunk {
    // Plain text SSE: each event.data is a raw string delta
    // JSON SSE (/stream/json): { id, provider, model, delta, done }
    delta?: string;
    done?: boolean;
    provider?: string;
    model?: string;
  }
  ```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 5 — STATE MANAGEMENT (Zustand Stores)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ### chat.store.ts  — persisted to localStorage
  State:
    - conversations: Conversation[]         All conversations
    - activeConversationId: string | null   Currently displayed
    - searchQuery: string                   Sidebar search filter
  Actions:
    - createConversation(model)             → new Conversation, set active
    - deleteConversation(id)
    - renameConversation(id, title)
    - pinConversation(id)
    - addMessage(conversationId, message)
    - updateMessage(conversationId, messageId, patch)  ← used during streaming
    - deleteMessage(conversationId, messageId)
    - clearConversation(id)
    - setSearchQuery(query)
    - exportConversation(id, format)        → triggers download
  Selectors:
    - activeConversation                    Derived from activeConversationId
    - filteredConversations                 Filtered + grouped by date
    - messageCount

  ### model.store.ts  — persisted to localStorage
  State:
    - selectedModel: ModelConfig            Currently active model
    - parameters: ModelParameters           Temperature, maxTokens, systemPrompt, stream
    - availableProviders: ProviderInfoDto[] Live from /api/v1/providers
    - lastFetchedAt: number | null
  Actions:
    - setModel(model)
    - setParameters(patch)
    - setAvailableProviders(providers)
    - resetParameters()

  ### ui.store.ts  — NOT persisted (session only)
  State:
    - isSidebarOpen: boolean
    - sidebarWidth: number                  Pixels (default 260)
    - activeModal: 'settings' | 'model-selector' | 'export' | null
    - inputMode: InputMode                  'text' | 'voice' | 'image-gen' | 'embed'
    - isRecording: boolean
    - pendingAttachments: Attachment[]
    - isGenerating: boolean                 True while streaming response
    - abortController: AbortController | null  For cancelling requests
  Actions:
    - toggleSidebar()
    - setSidebarWidth(px)
    - openModal(name)
    - closeModal()
    - setInputMode(mode)
    - setRecording(bool)
    - addAttachment(file)
    - removeAttachment(id)
    - clearAttachments()
    - setGenerating(bool)
    - setAbortController(ctrl)
    - stopGeneration()                      Calls abortController.abort()

  ### settings.store.ts  — persisted to localStorage
  State:
    - userName: string                      'Jackson' (used in greeting)
    - theme: 'dark' | 'light' | 'system'
    - fontSize: 'sm' | 'md' | 'lg'
    - apiBaseUrl: string                    Default: 'http://localhost:8080'
    - savedPrompts: SavedPrompt[]
    - language: string                      'en-US' (voice recognition)
    - voiceId: string                       SpeechSynthesis voice
    - enableSounds: boolean
    - enableAnimations: boolean
  Actions:
    - setUserName(name)
    - setTheme(theme)
    - setApiBaseUrl(url)
    - addSavedPrompt(prompt)
    - removeSavedPrompt(id)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 6 — API LAYER (src/api/)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ### client.ts
  - Create axios instance with baseURL from import.meta.env.VITE_API_BASE_URL
  - Request interceptor: add Content-Type: application/json
  - Response interceptor: normalize errors → { error, message, hint }
  - Timeout: 60000ms for chat, 5000ms for health checks

  ### chat.api.ts
  ```
  chatBlocking(req: ChatRequestDto): Promise<ChatResponseDto>
    → POST /api/v1/chat

  chatStream(req: ChatRequestDto, onDelta: (text: string) => void, signal: AbortSignal): Promise<void>
    → POST /api/v1/chat/stream/json  (Accept: text/event-stream)
    → Uses fetch() with streaming body reader (NOT axios — SSE needs native fetch)
    → Parses each SSE event.data as JSON → calls onDelta(chunk.delta)
    → On done=true, resolves the Promise
    → On AbortSignal, cleanly closes the reader

  embed(req: EmbeddingRequestDto): Promise<EmbeddingResponseDto>
    → POST /api/v1/embed
  ```

  ### providers.api.ts
  ```
  getProviders(): Promise<ProviderInfoDto[]>
    → GET /api/v1/providers

  getModels(): Promise<ModelTableDto>
    → GET /api/v1/models

  getHealth(): Promise<HealthDto>
    → GET /api/v1/health
  ```

  ### stream.ts  — SSE streaming utility
  ```
  async function* readStream(response: Response): AsyncGenerator<string>
    - Uses response.body.getReader()
    - Decodes Uint8Array chunks → UTF-8 string
    - Splits on "\n\n" to get SSE events
    - Strips "data: " prefix
    - Yields each clean data string
    - Handles [DONE] sentinel
  ```

  ### Vite proxy (vite.config.ts)
  ```typescript
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
      '/actuator': { target: 'http://localhost:8080', changeOrigin: true }
    }
  }
  ```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 7 — KEY HOOKS (src/hooks/)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ### useChat.ts  — PRIMARY HOOK (most important)
  ```
  function useChat() {
    Inputs consumed from stores: activeConversation, selectedModel, parameters, attachments
    Returns: { sendMessage, stopGeneration, isGenerating, error }

    sendMessage(userText: string):
      1. Build Message{role:'user', content, attachments} → addMessage to store
      2. Build ChatRequestDto from messages + selectedModel.alias + parameters
      3. Create AbortController, store in ui.store
      4. Add placeholder assistant Message{status:'streaming', content:''}
      5. If parameters.stream === true:
           Call chatStream(req, (delta) => updateMessage(id, {content: prev+delta}), signal)
           On complete: updateMessage(id, {status:'complete', usage, latencyMs})
         Else:
           Call chatBlocking(req) → updateMessage(id, {content, status:'complete'})
      6. Generate conversation title from first user message (first 6 words + "...")
      7. Handle errors: updateMessage(id, {status:'error', error: message})
      8. Always: setGenerating(false), clearAttachments()
  }
  ```

  ### useVoiceInput.ts
  ```
  - Initialize SpeechRecognition (webkit or standard)
  - Return: { isListening, transcript, start(), stop(), error }
  - Interim results update in real-time → shown in input box
  - Final result → set as input value, auto-submit if auto-send enabled
  - Handles browser permission, not-supported fallback
  ```

  ### useVoiceOutput.ts
  ```
  - Uses window.speechSynthesis
  - Return: { speak(text), stop(), isSpeaking, voices }
  - speak(): strips markdown → clean text → utterance
  - Respects settings.voiceId preference
  ```

  ### useFileUpload.ts
  ```
  - Accepts: File[]
  - Validates: max 10MB per file, allowed types (images, PDF, TXT, MD, JSON, CSV, code files)
  - Generates: local object URL + base64 encoding
  - Returns: Attachment[] + { addFiles, removeFile, clearAll, error }
  ```

  ### useProviders.ts
  ```
  - Uses react-query: useQuery(['providers'], getProviders, { refetchInterval: 30000 })
  - On success: updates model.store.availableProviders
  - Returns: { providers, isLoading, error, refetch }
  - Cross-references with models.config.ts to show available vs unavailable models
  ```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 8 — COMPONENT SPECIFICATIONS (Critical Components)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ### AppShell.tsx
  Layout: CSS Grid  `grid-cols-[auto_1fr]`  full viewport height (100dvh)
  - Left: <Sidebar> — collapsible, width controlled by sidebarWidth store state
  - Right: <div className="flex flex-col"> containing <TopBar> + <MainPanel>
  - Sidebar toggle: framer-motion AnimatePresence for smooth slide animation
  - Background: absolute gradient + grain noise texture overlay (z-0)
  - Glow orbs: absolute positioned divs with blur-3xl behind content

  ### ModelSelector.tsx (in TopBar)
  Trigger: Pill button showing "● ProviderIcon  ModelName  ▾"
  - Provider color dot (green=OpenAI, orange=Anthropic, purple=Ollama, blue=Groq)
  - On click: opens <ModelSelectorModal>
  - Shows live availability: grayed out if provider.available === false

  ### ModelSelectorModal.tsx
  Full overlay modal (max-w-2xl, max-h-[80vh])
  Layout:
    - Header: "Choose a Model" + <ModelSearchBar>
    - Body: Scrollable list of <ProviderGroup> sections
    - Footer: Selected model preview + <ParameterPanel> accordion
  ProviderGroup:
    - Provider logo/icon + name + availability badge
    - Collapsible grid of <ModelCard>
  ModelCard:
    - Model name + description
    - <ModelCapabilityBadge> for each capability (CHAT, STREAM, VISION, etc.)
    - Context window size
    - isLocal / isFree / isPremium pill
    - On click: setModel() → close modal
    - Active state: purple glow border

  ### WelcomeScreen.tsx
  Centered layout:
    - <HeroOrb> — 120px animated orb (CSS radial gradient, pulsing + floating animation)
    - <GreetingText>: "Hello, {userName}" in purple → "How can I assist you today?"
    - <SuggestedPromptGrid>: 3 cols × 2 rows of prompt cards
      Each card: icon + title + description → on click: pre-fills input
  Suggested prompts (from prompts.config.ts):
    - Synthesize Data  / Creative Brainstorm / Check Facts
    - Write Code / Explain Concept / Analyze File
  No messages = show WelcomeScreen. Any messages = show MessageList.

  ### MessageItem.tsx
  User message:
    - Right-aligned bubble, max-w-[75%]
    - Background: rgba(124, 58, 237, 0.15) + border violet-500/20
    - Shows attachments above text (image thumbnails, file chips)
    - Avatar: user initials circle (right side)

  Assistant message:
    - Left-aligned, full width (no bubble for long responses)
    - <Avatar> with provider logo (left side)
    - <MarkdownRenderer> for content
    - Streaming state: appends <TypingCursor> at end
    - <MessageActions> appear on hover: Copy / Regenerate / 🔊 Read Aloud / ⋮ More
    - <UsageBadge>: "123 tokens · 1.2s" — subtle, bottom right

  ### MarkdownRenderer.tsx
  Uses react-markdown + remark-gfm + rehype-highlight
  Custom renderers:
    - code block → <CodeBlock> with language label + copy button + line numbers
    - table → styled with border, alternating row colors
    - blockquote → left border accent
    - links → open in new tab
    - h1-h3 → size + weight hierarchy
    - ul/ol → custom bullet/number styling

  ### InputArea.tsx  (bottom of MainPanel)
  Structure:
    ```
    <div glass-panel p-3 rounded-2xl>
      <AttachedFilesRow />          ← chips for pending attachments (conditional)
      <div flex gap-2>
        <ModeSelector />            ← Text/Voice/ImgGen tabs (left)
        <MessageInput />            ← Auto-growing textarea (center, flex-1)
        <div flex gap-1>            ← Right actions
          <VoiceButton />
          <AttachButton />
          <SendButton />
        </div>
      </div>
      <InputToolbar />              ← Second row: Deeper Research / Saved Prompts / model context info
    </div>
    ```
  MessageInput:
    - <textarea> auto-resizes (1 line → max 8 lines) via scrollHeight trick
    - Ctrl+Enter or Enter (if no shift) → submit
    - Escape → clear
    - Placeholder changes per inputMode: "Message LLMate..." / "Listening..." / "Describe image..."

  VoiceButton:
    - Idle: mic icon, ghost style
    - Recording: pulsing red dot + "Listening..." label + waveform animation
    - useVoiceInput hook → transcript shown live in MessageInput

  SendButton:
    - Not generating: Send icon, purple background
    - Generating: Stop/Square icon, red background, on click → stopGeneration()
    - Disabled + spinner when: not generating but input is empty

  ### ParameterPanel.tsx
  Collapsible accordion inside ModelSelectorModal
  Controls:
    - Temperature slider (0.0–2.0, step 0.1) with visual label: "Precise ← → Creative"
    - Max Tokens slider (100–8192 in steps of 100)
    - System Prompt textarea (free-form, pre-filled with default)
    - Stream toggle switch (on=streaming, off=blocking)
    - Reset to defaults button


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 9 — DESIGN SYSTEM (tailwind.config.ts + globals.css)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ### CSS Variables (in :root / [data-theme="dark"])
  ```css
  --color-bg:           #0A0A0F;     /* Void black */
  --color-bg-secondary: #111118;     /* Slightly lighter */
  --color-bg-tertiary:  #16161F;     /* Panel backgrounds */
  --color-surface:      #1C1C28;     /* Card/input surfaces */
  --color-border:       #2A2A3A;     /* Borders, dividers */
  --color-border-focus: #7C3AED;     /* Focus rings */

  --color-primary:      #7C3AED;     /* Violet-600 */
  --color-primary-hover:#6D28D9;
  --color-primary-glow: rgba(124,58,237,0.3);
  --color-accent:       #A78BFA;     /* Violet-400 — highlights */
  --color-accent-warm:  #C4B5FD;     /* Violet-300 — greeting text */

  --color-text:         #F1F0FF;     /* Primary text — slightly warm white */
  --color-text-muted:   #8B8BA8;     /* Secondary/placeholder text */
  --color-text-dimmed:  #4A4A65;     /* Timestamps, metadata */

  --color-success:      #10B981;
  --color-warning:      #F59E0B;
  --color-error:        #EF4444;

  --font-display:       'Sora', sans-serif;
  --font-body:          'DM Sans', sans-serif;
  --font-mono:          'JetBrains Mono', monospace;

  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;

  --shadow-glow:   0 0 40px rgba(124,58,237,0.15);
  --shadow-card:   0 4px 24px rgba(0,0,0,0.4);
  --shadow-input:  0 0 0 1px var(--color-border);
  --shadow-focus:  0 0 0 2px var(--color-primary-glow);
  ```

  ### Tailwind theme extension
  ```typescript
  extend: {
    colors: {
      llm: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
      }
    },
    fontFamily: {
      display: ['Sora', 'sans-serif'],
      body:    ['DM Sans', 'sans-serif'],
      mono:    ['JetBrains Mono', 'monospace'],
    },
    animation: {
      'orb-pulse':   'orb-pulse 4s ease-in-out infinite',
      'orb-float':   'orb-float 6s ease-in-out infinite',
      'shimmer':     'shimmer 2s linear infinite',
      'typing':      'typing 0.6s steps(3) infinite',
      'fade-in':     'fade-in 0.3s ease-out',
      'slide-up':    'slide-up 0.4s cubic-bezier(0.16,1,0.3,1)',
    }
  }
  ```

  ### GlassPanel.tsx utility component
  className: "bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-border)]
              rounded-[var(--radius-xl)] shadow-[var(--shadow-card)]"

  ### Provider colors (for badges/icons)
  - OpenAI:    #10A37F  (teal green)
  - Anthropic: #D97706  (amber orange)
  - Ollama:    #8B5CF6  (violet)
  - Groq:      #F97316  (orange)
  - Google:    #4285F4  (blue)
  - NVIDIA:    #76B900  (nvidia green)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 10 — INPUT MODES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Mode 1: TEXT (default)
    - Standard textarea input
    - Markdown preview toggle (eye icon)
    - Paste image from clipboard → auto-attach

  Mode 2: VOICE
    - Click mic → starts SpeechRecognition
    - Waveform animation in input area while recording
    - Interim transcript shown in real-time in textarea
    - Click stop → final transcript → user can edit → send
    - TTS Output: any assistant message has 🔊 icon to read aloud

  Mode 3: FILE / DOCUMENT
    - Drag-and-drop overlay on entire chat area
    - Attach button → opens OS file picker
    - Supported: JPG/PNG/WEBP/GIF (vision), PDF, TXT, MD, JSON, CSV, code files
    - Images: encoded as base64, sent in message (future: vision-capable models)
    - Text files: content pasted into message or sent as context
    - Preview chips: show filename + type icon + × remove
    - Max 5 files, max 10MB each

  Mode 4: EMBED (experimental)
    - Input: text(s) to embed
    - Model auto-switched to embedding model
    - Output: vector as formatted JSON, dimensions shown
    - Similarity search: compare two inputs → cosine similarity score

  FUTURE MODES (placeholders in UI, disabled state):
    - Image Generation: "Describe an image..." → future DALL-E / SD integration
    - Code Interpreter: sandboxed code execution UI


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 11 — KEYBOARD SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Ctrl/Cmd + K         → Focus search / open model selector
  Ctrl/Cmd + N         → New conversation
  Ctrl/Cmd + ,         → Open settings
  Ctrl/Cmd + B         → Toggle sidebar
  Ctrl/Cmd + Enter     → Send message (when input focused)
  Ctrl/Cmd + Shift + C → Copy last assistant response
  Ctrl/Cmd + Shift + R → Regenerate last response
  Escape               → Stop generation / close modal / clear input
  /                    → Focus message input (when not already focused)
  Ctrl + Shift + V     → Toggle voice input


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 12 — IMPLEMENTATION ORDER (Phased Build Plan)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  PHASE 1 — FOUNDATION  (Do this first, in this exact order)
  ─────────────────────────────────────────────────────────
    Step 1.1  npm create vite@latest llmate-chat -- --template react-ts
    Step 1.2  Install ALL dependencies from Section 1
    Step 1.3  Create vite.config.ts with proxy config
    Step 1.4  Create tailwind.config.ts with full theme extension
    Step 1.5  Create src/styles/globals.css with all CSS variables + @font-face imports
    Step 1.6  Create src/styles/animations.css with all keyframes
    Step 1.7  Import Google Fonts in index.html: Sora, DM Sans, JetBrains Mono
    Step 1.8  Create src/utils/cn.ts
    Step 1.9  Create ALL files in src/types/ (chat, model, api, settings)
    Step 1.10 Create src/config/models.config.ts with ALL model entries
    Step 1.11 Create src/config/prompts.config.ts with 6 suggested prompts

  PHASE 2 — API + STORES
  ─────────────────────
    Step 2.1  Create src/api/client.ts (axios instance)
    Step 2.2  Create src/api/stream.ts (SSE async generator)
    Step 2.3  Create src/api/chat.api.ts (chatBlocking, chatStream, embed)
    Step 2.4  Create src/api/providers.api.ts (getProviders, getHealth)
    Step 2.5  Create src/store/settings.store.ts
    Step 2.6  Create src/store/model.store.ts
    Step 2.7  Create src/store/ui.store.ts
    Step 2.8  Create src/store/chat.store.ts (with localStorage persistence)
    Step 2.9  Create src/store/index.ts (re-exports)

  PHASE 3 — HOOKS
  ──────────────
    Step 3.1  useChat.ts           (most important — get this right)
    Step 3.2  useStreamingMessage.ts
    Step 3.3  useProviders.ts
    Step 3.4  useAutoScroll.ts
    Step 3.5  useFileUpload.ts
    Step 3.6  useVoiceInput.ts
    Step 3.7  useVoiceOutput.ts
    Step 3.8  useKeyboardShortcuts.ts
    Step 3.9  useConversation.ts

  PHASE 4 — PRIMITIVE UI COMPONENTS (src/components/ui/)
  ──────────────────────────────────────────────────────
    Step 4.1  Build ALL components in src/components/ui/ before touching larger components
              Order: Button → Input → Badge → Spinner → Skeleton → Tooltip → Modal →
                     Dropdown → ScrollArea → Separator → Avatar → GlassPanel → OrbGlow

  PHASE 5 — LAYOUT SKELETON
  ─────────────────────────
    Step 5.1  AppShell.tsx (grid layout, sidebar slot, main panel slot)
    Step 5.2  MainPanel.tsx (flex column, topbar + content area)
    Step 5.3  TopBar.tsx (stub — just layout, no model selector yet)
    Step 5.4  Sidebar.tsx (stub — just layout + animation)
    Step 5.5  Verify layout in browser before continuing

  PHASE 6 — SIDEBAR
  ─────────────────
    Step 6.1  SidebarHeader.tsx (logo + New Chat button)
    Step 6.2  SearchBar.tsx
    Step 6.3  NavLinks.tsx
    Step 6.4  ConversationItem.tsx
    Step 6.5  ConversationList.tsx (grouped by date, with virtualization)
    Step 6.6  UserProfile.tsx
    Step 6.7  Wire up to chat.store

  PHASE 7 — MODEL SELECTOR
  ────────────────────────
    Step 7.1  ModelCapabilityBadge.tsx
    Step 7.2  ModelCard.tsx
    Step 7.3  ProviderGroup.tsx
    Step 7.4  ModelSearchBar.tsx
    Step 7.5  ParameterPanel.tsx (sliders, system prompt textarea)
    Step 7.6  ModelSelectorModal.tsx (assemble all above)
    Step 7.7  ModelBadge.tsx
    Step 7.8  ProviderStatusDot.tsx (wire to useProviders)
    Step 7.9  ModelSelector.tsx (trigger button in TopBar)
    Step 7.10 TopBarActions.tsx
    Step 7.11 Complete TopBar.tsx

  PHASE 8 — WELCOME SCREEN
  ────────────────────────
    Step 8.1  HeroOrb.tsx (animated orb with framer-motion)
    Step 8.2  GreetingText.tsx (with user name from settings)
    Step 8.3  SuggestedPromptGrid.tsx
    Step 8.4  WelcomeScreen.tsx (assemble)

  PHASE 9 — CHAT MESSAGES
  ───────────────────────
    Step 9.1  TypingCursor.tsx
    Step 9.2  StreamingIndicator.tsx
    Step 9.3  CodeBlock.tsx (with rehype-highlight, copy button)
    Step 9.4  MarkdownRenderer.tsx (custom renderers for all elements)
    Step 9.5  UsageBadge.tsx
    Step 9.6  AttachmentPreview.tsx
    Step 9.7  MessageActions.tsx
    Step 9.8  UserMessage.tsx
    Step 9.9  AssistantMessage.tsx
    Step 9.10 MessageItem.tsx (routes to user/assistant)
    Step 9.11 MessageList.tsx (virtualized with useAutoScroll)

  PHASE 10 — INPUT AREA
  ─────────────────────
    Step 10.1  AttachedFileChip.tsx
    Step 10.2  FileDropZone.tsx
    Step 10.3  AttachButton.tsx
    Step 10.4  VoiceButton.tsx (with recording animation)
    Step 10.5  SendButton.tsx (dual state: send / stop)
    Step 10.6  ModeSelector.tsx (Text/Voice/File/Embed tabs)
    Step 10.7  SavedPromptsMenu.tsx
    Step 10.8  MessageInput.tsx (auto-grow textarea)
    Step 10.9  InputToolbar.tsx
    Step 10.10 InputArea.tsx (assemble all above)

  PHASE 11 — CHAT PAGE ASSEMBLY
  ─────────────────────────────
    Step 11.1  ChatArea.tsx (WelcomeScreen ↔ MessageList switcher)
    Step 11.2  ChatPage.tsx (AppShell + ChatArea)
    Step 11.3  Wire useChat hook to InputArea send action
    Step 11.4  Test full chat flow: type → send → stream → render

  PHASE 12 — SETTINGS + EXTRAS
  ────────────────────────────
    Step 12.1  GeneralSettings.tsx, APISettings.tsx, AppearanceSettings.tsx
    Step 12.2  KeyboardShortcutsPanel.tsx
    Step 12.3  SettingsModal.tsx (assemble with tabs)
    Step 12.4  ExportChat.tsx (Markdown download, JSON download)
    Step 12.5  TopBarActions.tsx — wire Export + Settings buttons

  PHASE 13 — SECONDARY PAGES
  ──────────────────────────
    Step 13.1  LibraryPage.tsx (all conversations grid)
    Step 13.2  FilesPage.tsx (uploaded files manager)
    Step 13.3  Wire NavLinks to React Router routes

  PHASE 14 — POLISH & QA
  ──────────────────────
    Step 14.1  Framer Motion: add AnimatePresence to sidebar, modals, messages
    Step 14.2  Stagger animations: message list fade-in stagger on load
    Step 14.3  Loading states: Skeleton in conversation list, Spinner in model selector
    Step 14.4  Error states: toast notifications for API errors, offline banner
    Step 14.5  Empty states: "No conversations yet", "No providers available"
    Step 14.6  Accessibility: aria-labels, keyboard navigation, focus traps in modals
    Step 14.7  Responsive: test at 768px, 1024px, 1440px, 1920px
    Step 14.8  Performance: React.memo on MessageItem, useMemo for grouped conversations


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 13 — CRITICAL IMPLEMENTATION NOTES FOR AGENTIC TOOLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  STREAMING:
    - Use native fetch() for SSE, NOT axios (axios cannot stream)
    - Endpoint: POST /api/v1/chat/stream/json (returns JSON SSE — easier to parse)
    - Each SSE line: "data: {\"id\":\"...\",\"delta\":\"token\",\"done\":false}\n\n"
    - Accumulate delta strings in message.content via zustand immer patch
    - AbortController must be passed as signal to fetch() for cancellation

  PERSISTENCE:
    - Use zustand's persist middleware with localStorage for: chat.store, model.store, settings.store
    - Do NOT persist: ui.store (session only), AbortController refs
    - Serialize/deserialize dates as Unix timestamps (numbers), not ISO strings

  REACT QUERY:
    - Wrap App with QueryClientProvider
    - useProviders: staleTime: 30_000, refetchOnWindowFocus: true
    - On first load: fetch providers → update model.store → cross-reference models.config

  SCROLLING:
    - useAutoScroll: watch messages array length + isGenerating → scroll to bottom
    - Pause auto-scroll if user manually scrolls up (detect via scroll event)
    - Show "↓ New message" FAB when paused + new message arrives

  MARKDOWN:
    - ALL assistant message content treated as Markdown
    - Use ReactMarkdown with remarkGfm + rehypeHighlight
    - Code blocks: add language label, copy button, optional line numbers
    - Do NOT sanitize (content from trusted LLM, not user input — but note this for security)

  VOICE:
    - SpeechRecognition: lang from settings.language, interimResults: true
    - Show interim transcript with opacity-60 styling (not yet confirmed)
    - Final result replaces entire input value
    - SpeechSynthesis: strip markdown before speaking (regex strip *#[]`_)

  FILES:
    - Images for vision models: read as DataURL, send base64 in message content
    - Text/code files: read as text, prepend to user message as fenced code block
    - PDFs: show filename chip only (future: PDF parsing)
    - Reject files > 10MB with toast error

  CONVERSATION TITLE:
    - Auto-generate from first user message
    - Take first 50 chars, strip markdown, trim to last complete word
    - Update title on second message if first was very short

  ERROR HANDLING:
    - Network error → "Cannot connect to LLMate. Is the server running at :8080?" toast
    - 401 → "Authentication failed. Check your API key in settings."
    - 429 → "Rate limit exceeded. Switching to fallback model..."
    - Stream aborted → message.status = 'complete' with partial content (not error)

  PERFORMANCE:
    - MessageList: react-window VariableSizeList for conversations > 50 messages
    - ConversationList: only render visible items (react-window)
    - Images in messages: lazy load with loading="lazy"
    - Code highlighting: dynamic import rehypeHighlight (code-split)

  ENV VARIABLES:
    - VITE_API_BASE_URL=http://localhost:8080   (dev default)
    - VITE_APP_NAME=LLMate
    - VITE_DEFAULT_MODEL=fast
    - VITE_ENABLE_VOICE=true
    - VITE_ENABLE_FILES=true


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 14 — BOOTSTRAP COMMANDS (Run in exact order)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  # 1. Create project
  npm create vite@latest llmate-chat -- --template react-ts
  cd llmate-chat

  # 2. Install all production dependencies
  npm install \
    react@^18.3.0 react-dom@^18.3.0 \
    zustand@^4.5.0 immer@^10.1.0 \
    @tanstack/react-query@^5.51.0 \
    axios@^1.7.0 eventsource-parser@^3.0.0 \
    framer-motion@^11.3.0 \
    tailwindcss@^3.4.0 @tailwindcss/typography@^0.5.0 autoprefixer@^10.4.0 postcss@^8.4.0 \
    class-variance-authority@^0.7.0 clsx@^2.1.0 tailwind-merge@^2.5.0 \
    @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip \
    @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-slider \
    @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast \
    lucide-react@^0.400.0 react-hot-toast@^2.4.0 \
    react-markdown@^9.0.0 rehype-highlight@^7.0.0 remark-gfm@^4.0.0 highlight.js@^11.10.0 \
    react-dropzone@^14.2.0 react-resizable-panels@^2.1.0 \
    react-window@^1.8.10 react-virtualized-auto-sizer@^1.0.24 \
    date-fns@^3.6.0 uuid@^10.0.0

  # 3. Install dev dependencies
  npm install -D \
    typescript@^5.5.0 \
    @types/react@^18.3.0 @types/react-dom@^18.3.0 @types/uuid @types/react-window \
    eslint@^9.8.0 prettier@^3.3.0 \
    vite-plugin-svgr@^4.2.0

  # 4. Initialize Tailwind
  npx tailwindcss init -p

  # 5. Start dev server
  npm run dev
  # → http://localhost:5173 (proxies /api/* to :8080)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 15 — .env FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  # .env
  VITE_API_BASE_URL=http://localhost:8080
  VITE_APP_NAME=LLMate
  VITE_DEFAULT_MODEL=fast
  VITE_DEFAULT_PROVIDER=openai
  VITE_ENABLE_VOICE=true
  VITE_ENABLE_FILES=true
  VITE_ENABLE_EMBED=true
  VITE_MAX_FILE_SIZE_MB=10
  VITE_MAX_ATTACHMENTS=5


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SECTION 16 — BACKEND CONNECTION REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  All API calls go through the Vite dev proxy → LLMate Spring Boot at :8080

  ENDPOINT MAP:
  ┌──────────────────────────────────────────┬──────────────────────────────────────────┐
  │  Frontend calls                          │  LLMate backend handles                  │
  ├──────────────────────────────────────────┼──────────────────────────────────────────┤
  │  POST /api/v1/chat                       │  Blocking chat → JSON response           │
  │  POST /api/v1/chat/stream/json           │  SSE streaming → JSON delta events       │
  │  POST /api/v1/embed                      │  Text → float[] vectors                  │
  │  GET  /api/v1/providers                  │  Provider list + capabilities            │
  │  GET  /api/v1/models                     │  Aliases + routing table                 │
  │  GET  /api/v1/health                     │  Gateway health summary                  │
  │  GET  /actuator/health                   │  Full Spring Boot health                 │
  └──────────────────────────────────────────┴──────────────────────────────────────────┘

  ROUTING CONVENTION:
    model field in ChatRequestDto accepts:
      - Named alias:  "fast" | "smart" | "local" | "powerful" | "haiku" | "opus"
      - Shorthand:    "openai/gpt-4o" | "anthropic/claude-3-5-sonnet-20241022"
      - Explicit:     set both provider + model fields
    The frontend ModelConfig.alias maps directly to what gets sent as "model" field.

  STREAMING FORMAT (POST /api/v1/chat/stream/json):
    Request:  { model, messages, temperature, maxTokens }  (JSON body)
    Headers:  Content-Type: application/json
    Response: text/event-stream
    Each SSE event:
      data: {"id":"uuid","provider":"openai","model":"gpt-4o-mini","delta":"token","done":false}
    Final event:
      data: {"id":"uuid","provider":"openai","model":"gpt-4o-mini","delta":"","done":true}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FINAL CHECKLIST — Before Considering Feature Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Core Chat Flow:
  [ ] Type message + Enter → sends to LLMate → streams response token by token
  [ ] Stop button cancels in-flight request cleanly
  [ ] Messages persist in localStorage, survive page refresh
  [ ] Conversation list shows today/yesterday/7-days grouped sections

  Model Selection:
  [ ] All models listed in Section 3 present in selector
  [ ] Active provider health dot updates every 30s
  [ ] Unavailable providers shown grayed out with tooltip reason
  [ ] Parameter sliders update in real-time (temp, tokens, system prompt)
  [ ] Model switch mid-conversation works correctly

  Input Modes:
  [ ] Text mode: auto-growing textarea, markdown preview toggle
  [ ] Voice mode: mic → recording → transcript → send
  [ ] File mode: drag-drop + picker, preview chips, sends to API
  [ ] Embed mode: inputs → embedding response with dimensions shown

  UI/UX:
  [ ] Welcome screen with animated orb, greeting, 6 prompt cards
  [ ] Sidebar collapses/expands with animation (Ctrl+B)
  [ ] Search filters conversation list in real-time
  [ ] All keyboard shortcuts in Section 11 work
  [ ] Settings modal: name, theme, API URL, saved prompts
  [ ] Export: download as Markdown and JSON
  [ ] Responsive at 768px, 1024px, 1440px

  Quality:
  [ ] No TypeScript errors (strict mode)
  [ ] No console errors/warnings in browser
  [ ] Accessible: keyboard navigation works, ARIA labels present
  [ ] Animations can be disabled (respects prefers-reduced-motion)
  [ ] Dark theme only (light theme extension optional)

# ═══════════════════════════════════════════════════════════════════
# END OF PLAN — Total: 16 Sections, 200+ steps, production-ready spec
# Backend: LLMate Spring Boot (llmate.com) at http://localhost:8080
# Frontend: React 18 + Vite + TypeScript + Tailwind + Zustand
# ═══════════════════════════════════════════════════════════════════
