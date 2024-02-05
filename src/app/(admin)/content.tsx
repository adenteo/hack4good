'use client';
import { ResizablePanel } from '@/components/ui/resizable';
import { useSearchParams } from 'next/navigation';
import Dashboard from './(tabs)/(dashboard)/dashboard-tab';
import Activities from './(tabs)/(activities)/activities-tab';
import Volunteers from './(tabs)/(volunteers)/volunteers-tab';
import Admin from './(tabs)/(admin)/admin-tab';
import FormBuilder from './(tabs)/(form-builder)/form-builder-tab';
import FormTabPage from './(tabs)/(forms)/forms-tab';
import Calendar from './(tabs)/(calendar)/calendar-tab';
import { Suspense } from 'react';

export default function Content() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const renderTabContent = () => {
    switch (tab) {
      case 'dashboard':
        return <Dashboard />;
      case 'activities':
        return <Activities />;
      case 'volunteers':
        return <Volunteers />;
      case 'admin':
        return <Admin />;
      case 'calendar':
        return <Calendar />;
      case 'forms':
        return <FormTabPage />;
      case 'form builder':
        return <FormBuilder />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ResizablePanel defaultSize={85}>
      <div className="h-full">{renderTabContent()}</div>
    </ResizablePanel>
  );
}
