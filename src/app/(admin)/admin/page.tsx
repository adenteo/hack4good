'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Nav } from '../nav';
import { useState } from 'react';
import {
  Archive,
  ArchiveX,
  CalendarDaysIcon,
  Clock3Icon,
  File,
  Inbox,
  Lock,
  Send,
  Trash2,
  User,
} from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import Sidebar from '../sidebar';
import Content from '../content';

const Page = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
      >
        <Sidebar />
        <ResizableHandle withHandle />
        <Content />
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Page;
