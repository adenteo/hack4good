'use client';
import { ResizablePanel } from '@/components/ui/resizable';
import { Clock3Icon, CalendarDaysIcon, User, Lock, Blocks } from 'lucide-react';
import { Nav } from './nav';
import { useState } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ResizablePanel
      defaultSize={15}
      minSize={10}
      maxSize={20}
      collapsible={true}
      collapsedSize={4}
      onCollapse={() => {
        setIsCollapsed(true);
      }}
      onExpand={() => {
        if (isCollapsed) {
          setIsCollapsed(false);
        }
      }}
    >
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Dashboard',
            label: '128',
            icon: Clock3Icon,
            variant: 'default',
          },
          {
            title: 'Activities',
            label: '9',
            icon: CalendarDaysIcon,
            variant: 'ghost',
          },
          {
            title: 'Volunteers',
            label: '',
            icon: User,
            variant: 'ghost',
          },
          {
            title: 'Admin',
            label: '23',
            icon: Lock,
            variant: 'ghost',
          },
          {
            title: 'Form Builder',
            icon: Blocks,
            variant: 'ghost',
          },
        ]}
      />
    </ResizablePanel>
  );
}
