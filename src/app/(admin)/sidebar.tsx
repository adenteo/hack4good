'use client';
import { ResizablePanel } from '@/components/ui/resizable';
import {
  Clock3Icon,
  CalendarDaysIcon,
  User,
  Lock,
  Blocks,
  FileText,
  Ticket,
  MessageSquareHeart
} from 'lucide-react';
import { Nav } from './nav';
import { Suspense, useState } from 'react';

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
            label: '',
            icon: Clock3Icon,
            variant: 'default',
          },
          {
            title: 'Activities',
            label: '',
            icon: Ticket,
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
            label: '',
            icon: Lock,
            variant: 'ghost',
          },
          {
            title: 'Forms',
            icon: FileText,
            variant: 'ghost',
          },
          {
            title: 'Feedback',
            icon: MessageSquareHeart,
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
