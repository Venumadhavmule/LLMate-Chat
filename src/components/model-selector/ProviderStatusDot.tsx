import { useModelStore } from '../../store';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/Tooltip';
import { cn } from '../../utils/cn';

export function ProviderStatusDot({ provider }: { provider: string }) {
  const { availableProviders } = useModelStore();

  const providerInfo = availableProviders.find(p => p.providerId === provider || p.displayName.toLowerCase() === provider);
  const isAvailable = providerInfo ? providerInfo.available : true;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            <span className={cn(
              "w-2 h-2 rounded-full",
              isAvailable ? "bg-[var(--color-success)] shadow-[0_0_8px_var(--color-success)]" : "bg-[var(--color-error)]"
            )} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isAvailable ? 'Provider Online' : 'Provider Unavailable'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
