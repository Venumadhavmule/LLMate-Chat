export const APP_CONFIG = {
  appName: import.meta.env.VITE_APP_NAME || 'LLMate',
  defaultModel: import.meta.env.VITE_DEFAULT_MODEL || 'fast',
  defaultProvider: import.meta.env.VITE_DEFAULT_PROVIDER || 'googlegenai',
  enableVoice: import.meta.env.VITE_ENABLE_VOICE === 'true',
  enableFiles: import.meta.env.VITE_ENABLE_FILES === 'true',
  enableEmbed: import.meta.env.VITE_ENABLE_EMBED === 'true',
  maxFileSizeMB: Number(import.meta.env.VITE_MAX_FILE_SIZE_MB) || 10,
  maxAttachments: Number(import.meta.env.VITE_MAX_ATTACHMENTS) || 5,
};
