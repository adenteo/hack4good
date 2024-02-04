import Topbar from './topbar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import OverviewTab from './overview-tab';
import { useCallback } from 'react';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="p-6">
      <Topbar />
      <Tabs
        defaultValue={
          type !== 'overview' && type !== 'volunteer' && type !== 'activity'
            ? 'overview'
            : type
        }
        className="space-y-4 mt-2"
      >
        <TabsList>
          <TabsTrigger
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('type', 'overview'),
              );
            }}
            value="overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('type', 'volunteer'),
              );
            }}
            value="volunteer"
          >
            Volunteer
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              router.push(
                pathname + '?' + createQueryString('type', 'activity'),
              );
            }}
            value="activity"
          >
            Activity
          </TabsTrigger>
        </TabsList>
        <OverviewTab />
      </Tabs>
    </div>
  );
};

export default Dashboard;
