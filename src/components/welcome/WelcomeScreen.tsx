import { HeroOrb } from './HeroOrb';
import { GreetingText } from './GreetingText';
import { SuggestedPromptGrid } from './SuggestedPromptGrid';

export function WelcomeScreen() {
  const handleSelectPrompt = (text: string) => {
    const textarea = document.getElementById('chat-message-input') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.focus();
      textarea.setSelectionRange(text.length, text.length);
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
