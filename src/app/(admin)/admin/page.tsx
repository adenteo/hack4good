'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { TooltipProvider } from '@/components/ui/tooltip';
import Sidebar from '../sidebar';
import Content from '../content';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Page = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        <Sidebar />
        <ResizableHandle withHandle />
        <Suspense
          fallback={
            <ResizablePanel defaultSize={85}>
              <Skeleton className="h-full"></Skeleton>
            </ResizablePanel>
          }
        >
          <Content />
        </Suspense>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Page;
