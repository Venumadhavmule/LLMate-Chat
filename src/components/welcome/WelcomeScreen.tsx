import { HeroOrb } from './HeroOrb';
import { GreetingText } from './GreetingText';
import { SuggestedPromptGrid } from './SuggestedPromptGrid';
import { useModelStore, useUIStore } from '../../store';
import type { SavedPrompt } from '../../types/settings.types';

export function WelcomeScreen() {
  const setParameters = useModelStore((state) => state.setParameters);
  const setActiveTemplateId = useModelStore((state) => state.setActiveTemplateId);
  const setPendingTemplateText = useUIStore((state) => state.setPendingTemplateText);

  const handleSelectPrompt = (prompt: SavedPrompt) => {
    // Use the store to set the pending text instead of direct DOM manipulation
    setPendingTemplateText(prompt.content);
    setActiveTemplateId(prompt.id);

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
