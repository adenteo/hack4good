import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Topbar from './topbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Leaderboard } from './leaderboard';
import { Progress } from '@/components/ui/progress';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Graph } from './graph';
import OverviewTab from './overview-tab';
import { useCallback } from 'react';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const router = useRouter();
  const pathname = usePathname();

  if (!type) {
    router.push('?tab=dashboard&type=overview');
  }

  console.log(type);

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
