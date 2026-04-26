import { SavedPromptsMenu } from './SavedPromptsMenu';
import { Button } from '../ui/Button';
import { LuEye, LuEyeOff, LuFlaskConical, LuInfo } from 'react-icons/lu';
import { useUIStore } from '../../store';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import { cn } from '../../utils/cn';

export function InputToolbar() {
  const { inputMode, showPreview, togglePreview } = useUIStore();

  return (
    <div className="flex items-center justify-between px-1 mt-2">
      <div className="flex items-center gap-1">
        <SavedPromptsMenu />
        
        <Separator orientation="vertical" className="h-4 mx-1 bg-[var(--color-border)]" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-[var(--color-text-dimmed)] hover:text-[var(--color-text)]"
              onClick={togglePreview}
            >
              {showPreview ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {showPreview ? "Show Editor (Cmd+Shift+P)" : "Preview Markdown (Cmd+Shift+P)"}
          </TooltipContent>
        </Tooltip>

        {inputMode === 'embed' && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--color-primary-glow)] border border-[var(--color-primary)]/20 text-[10px] text-[var(--color-accent)] animate-pulse">
            <LuFlaskConical className="w-3 h-3" />
            Experimental: Embeddings Mode
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="text-[10px] text-[var(--color-text-dimmed)] flex items-center gap-1">
          <LuInfo className="w-3 h-3" />
          Shift + Enter for new line
        </div>
      </div>
    </div>
  );
}

function Separator({ orientation = 'horizontal', className }: { orientation?: 'horizontal' | 'vertical', className?: string }) {
  return (
    <div 
      className={cn(
        "shrink-0 bg-[var(--color-border)]",
        orientation === 'horizontal' ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )} 
    />
  );
}

