'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3.5 text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-neutral-800">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'text-neutral-400 transition-transform duration-250',
            open && 'rotate-180'
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-[13px] leading-relaxed text-neutral-500">{children}</div>
        </div>
      </div>
    </div>
  );
}