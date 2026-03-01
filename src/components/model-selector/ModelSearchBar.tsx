import { LuSearch as Search } from 'react-icons/lu';
import { Input } from '../ui/Input';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function ModelSearchBar({ value, onChange }: Props) {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-2.5 text-[var(--color-text-muted)]" size={18} />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search models or capabilities..."
        className="pl-10 h-10 bg-[var(--color-bg)]"
      />
    </div>
  );
}
