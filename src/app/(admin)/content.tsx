import { ResizablePanel } from '@/components/ui/resizable';
import { useRouter, useSearchParams } from 'next/navigation';
import Dashboard from './(tabs)/(dashboard)/dashboard-tab';
import Activities from './(tabs)/(activities)/activities-tab';
import Volunteers from './(tabs)/(volunteers)/volunteers';
import Admin from './(tabs)/(admin)/admin-tab';
import FormBuilder from './(tabs)/(form-builder)/form-builder-tab';

export default function Content() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  console.log(tab);
  const router = useRouter();

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
      case 'form builder':
        return <FormBuilder />;
      default:
        return <Dashboard />;
    }
  };

  if (!tab) {
    return <Dashboard />;
  }

  return (
    <ResizablePanel defaultSize={85}>
      <div className="h-full">{renderTabContent()}</div>
    </ResizablePanel>
  );
}
