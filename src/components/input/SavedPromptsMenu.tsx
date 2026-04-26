import { useSettingsStore, useUIStore, useModelStore } from '../../store';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../ui/Dropdown';
import { Button } from '../ui/Button';
import { LuLibrary, LuZap, LuCode, LuPenTool, LuBrain, LuShieldCheck, LuFileText, LuBug } from 'react-icons/lu';
import { suggestedPrompts } from '../../config/prompts.config';

const iconMap: Record<string, any> = {
  LuCode, LuBrain, LuShieldCheck, LuPenTool, LuFileText, LuBug, LuZap
};

export function SavedPromptsMenu() {
  const { savedPrompts } = useSettingsStore();
  const { setPendingTemplateText } = useUIStore();
  const { setParameters } = useModelStore();

  const handleSelect = (prompt: any) => {
    setPendingTemplateText(prompt.content);
    if (prompt.systemPrompt) {
      setParameters({ systemPrompt: prompt.systemPrompt });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-[var(--color-text-dimmed)] hover:text-[var(--color-text)]">
          <LuLibrary className="w-3.5 h-3.5" />
          <span className="text-xs">Templates</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-[var(--color-surface)] border-[var(--color-border)]">
        <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-[var(--color-text-dimmed)] tracking-wider">
          Suggested Prompts
        </div>
        {suggestedPrompts.map((prompt) => {
          const Icon = iconMap[prompt.icon || 'LuZap'] || LuZap;
          return (
            <DropdownMenuItem 
              key={prompt.id} 
              onClick={() => handleSelect(prompt)}
              className="flex items-start gap-2 cursor-pointer hover:bg-[var(--color-bg-tertiary)]"
            >
              <Icon className="w-4 h-4 mt-0.5 text-[var(--color-primary)]" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{prompt.title}</span>
                <span className="text-[10px] text-[var(--color-text-muted)] line-clamp-1">{prompt.description}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
        
        {savedPrompts.length > 0 && (
          <>
            <DropdownMenuSeparator className="bg-[var(--color-border)]" />
            <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-[var(--color-text-dimmed)] tracking-wider">
              Your Prompts
            </div>
            {savedPrompts.map((prompt) => (
              <DropdownMenuItem 
                key={prompt.id} 
                onClick={() => handleSelect(prompt)}
                className="flex items-start gap-2 cursor-pointer hover:bg-[var(--color-bg-tertiary)]"
              >
                <LuZap className="w-4 h-4 mt-0.5 text-[var(--color-accent)]" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{prompt.title}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
