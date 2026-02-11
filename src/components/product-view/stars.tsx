import { cn } from '@/lib/utils';

interface StarsProps {
  count: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function Stars({ count, max = 5, size = 'sm' }: StarsProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            size === 'sm' ? 'text-sm' : 'text-base',
            i < count ? 'text-amber-400' : 'text-neutral-200'
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}