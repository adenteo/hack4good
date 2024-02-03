'use client';
import {
  ResizableHandle,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { TooltipProvider } from '@/components/ui/tooltip';
import Sidebar from '../sidebar';
import Content from '../content';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default Page;
