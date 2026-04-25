
import type { SavedPrompt } from '../types/settings.types';

export const suggestedPrompts: SavedPrompt[] = [
  {
    id: '1',
    title: 'Code Expert',
    description: 'Expert level code generation and refactoring with best practices.',
    content: 'Write a high-performance React hook that manages a complex state for a...',
    icon: 'LuCode',
    systemPrompt: 'You are an elite Senior Software Engineer. Provide clean, production-ready, highly optimized code with comprehensive comments and error handling.'
  },
  {
    id: '2',
    title: 'Explain Complex Topics',
    description: 'Break down difficult concepts into simple, easy-to-understand terms.',
    content: 'Explain the concept of Zero-Knowledge Proofs as if I am 12 years old.',
    icon: 'LuBrain',
    systemPrompt: 'You are a master teacher. Use analogies, simple language, and step-by-step reasoning to explain complex topics without losing technical accuracy.'
  },
  {
    id: '3',
    title: 'Code Reviewer',
    description: 'Critical analysis of code for security, performance, and readability.',
    content: 'Review the following TypeScript code and suggest 3 improvements:',
    icon: 'LuShieldCheck',
    systemPrompt: 'You are a pedantic but constructive Lead Architect. Focus on security vulnerabilities, potential memory leaks, and readability. Be direct and specific.'
  },
  {
    id: '4',
    title: 'Creative Writer',
    description: 'Engaging, vivid, and highly creative prose generation.',
    content: 'Write a short story opening about a clockmaker who discovers he can stop time.',
    icon: 'LuPenLine',
    systemPrompt: 'You are a Pulitzer Prize-winning author. Use vivid imagery, deep character subtext, and masterful pacing. Avoid clichés.'
  },
  {
    id: '5',
    title: 'Technical Documentation',
    description: 'Professional API docs, READMEs, and technical guides.',
    content: 'Create a professional README.md for a new Node.js library that handles...',
    icon: 'LuFileText',
    systemPrompt: 'You are a technical writer at a top-tier tech company. Produce clear, structured, and easy-to-navigate documentation following the Diátaxis framework.'
  },
  {
    id: '6',
    title: 'Bug Hunter',
    description: 'Deep-dive debugging and root cause analysis.',
    content: 'Analyze why this Python script is throwing a RecursionError when processing...',
    icon: 'LuBug',
    systemPrompt: 'You are a debugging specialist. Think step-by-step about the execution stack. Provide a clear diagnosis and a robust fix with preventative measures.'
  }
];
