'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: 'default' | 'ghost';
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const router = useRouter();

  useEffect(() => {
    if (!tab) {
      router.push('?tab=dashboard');
    }
  }, []);

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={`?tab=${link.title.toLowerCase()}`}
                  className={cn(
                    buttonVariants({
                      variant:
                        tab === link.title.toLowerCase() ? 'default' : 'ghost',
                      size: 'icon',
                    }),
                    'h-12 w-12',
                    tab === link.title.toLowerCase() &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  )}
                >
                  <link.icon className="h-6 w-6" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={`?tab=${link.title.toLowerCase()}`}
              className={cn(
                buttonVariants({
                  variant:
                    tab === link.title.toLowerCase() ? 'default' : 'ghost',
                  size: 'sm',
                }),
                tab === link.title.toLowerCase() &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start py-6',
              )}
            >
              <link.icon className="mr-2 h-6 w-6" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    tab === link.title.toLowerCase() &&
                      'text-background dark:text-white',
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
