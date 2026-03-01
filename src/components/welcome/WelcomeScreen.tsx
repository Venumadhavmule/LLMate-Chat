import { HeroOrb } from './HeroOrb';
import { GreetingText } from './GreetingText';
import { SuggestedPromptGrid } from './SuggestedPromptGrid';
import { useModelStore } from '../../store';
import type { SavedPrompt } from '../../types/settings.types';

export function WelcomeScreen() {
  const setParameters = useModelStore((state) => state.setParameters);

  const handleSelectPrompt = (prompt: SavedPrompt) => {
    const text = prompt.content;
    const textarea = document.getElementById('chat-message-input') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.focus();
      textarea.setSelectionRange(text.length, text.length);
    }

    if (prompt.systemPrompt) {
      setParameters({ systemPrompt: prompt.systemPrompt });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center pt-8 pb-20 overflow-y-auto">
      <HeroOrb />
      <GreetingText />
      <SuggestedPromptGrid onSelectPrompt={handleSelectPrompt} />
    </div>
  );
}
