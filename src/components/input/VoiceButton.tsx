import { LuMic as Mic, LuSquare as Square } from 'react-icons/lu';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/Tooltip';
import { cn } from '../../utils/cn';

export function VoiceButton() {
  const { isListening, startListening, stopListening, isSupported } = useVoiceInput({
    onTextEntry: (t) => {
      const textarea = document.getElementById('chat-message-input') as HTMLTextAreaElement;
      if (textarea) {
        textarea.value = (textarea.value + ' ' + t).trim();
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  });

  if (!isSupported) return null;

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={cn(
              "p-2 rounded-lg transition-colors focus:outline-none relative",
              isListening
                ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
            )}
          >
            {isListening ? (
              <>
                <Square size={18} className="fill-current" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </>
            ) : (
              <Mic size={18} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {isListening ? 'Stop recording' : 'Voice typing'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
