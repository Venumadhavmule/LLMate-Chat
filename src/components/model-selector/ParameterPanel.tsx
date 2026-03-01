import { useState } from 'react';
import { useModelStore } from '../../store';
import { LuSettings2 as Settings2, LuRotateCcw as RotateCcw } from 'react-icons/lu';
import { Button } from '../ui/Button';

export function ParameterPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { parameters, setParameters, resetParameters } = useModelStore();

  return (
    <div className="border-t border-[var(--color-border)] mt-4">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--color-surface)]/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <Settings2 size={16} />
          Advanced Parameters
        </div>
        <div className="text-xs text-[var(--color-text-muted)]">
          Temp: {parameters.temperature} · Max: {parameters.maxTokens}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-[var(--color-bg-secondary)] grid gap-4 rounded-b-[var(--radius-xl)]">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Temperature ({parameters.temperature})</span>
              <span className="text-[var(--color-text-muted)] text-[10px]">Precise ← → Creative</span>
            </div>
            <input
              type="range"
              className="w-full accent-[var(--color-primary)]"
              min="0" max="2" step="0.1"
              value={parameters.temperature}
              onChange={(e) => setParameters({ temperature: parseFloat(e.target.value) })}
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Max Tokens ({parameters.maxTokens})</span>
            </div>
            <input
              type="range"
              className="w-full accent-[var(--color-primary)]"
              min="100" max="8192" step="100"
              value={parameters.maxTokens}
              onChange={(e) => setParameters({ maxTokens: parseInt(e.target.value, 10) })}
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>System Prompt</span>
            </div>
            <textarea
              className="w-full h-20 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md p-2 text-xs text-[var(--color-text)] outline-none focus:ring-1 focus:ring-[var(--color-primary)] resize-none"
              value={parameters.systemPrompt}
              onChange={(e) => setParameters({ systemPrompt: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="stream-toggle"
              checked={parameters.stream}
              onChange={(e) => setParameters({ stream: e.target.checked })}
              className="w-4 h-4 accent-[var(--color-primary)] rounded"
            />
            <label htmlFor="stream-toggle" className="text-xs text-[var(--color-text)]">Enable Streaming Response</label>
          </div>

          <div className="flex justify-end mt-2">
            <Button variant="ghost" size="sm" onClick={resetParameters} className="gap-2 text-xs h-8">
              <RotateCcw size={14} /> Reset Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
