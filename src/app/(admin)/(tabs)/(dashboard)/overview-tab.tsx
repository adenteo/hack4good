import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Graph } from './graph';
import { Leaderboard } from './leaderboard';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { fetchCompletedActivitiesWithVolunteers } from '@/lib/actions/get-reports';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';
import getDemographicsLambda from '@/lib/actions/get-demographics';
import { cn } from '@/lib/utils';

interface OverviewTabProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function calculatePercentageIncrease(oldValue: number, newValue: number) {
  if (oldValue === 0 || newValue === 0) return 0;
  const difference = newValue - oldValue;
  if (difference === 0) return 0;
  const percentageIncrease = (difference / oldValue) * 100;
  return Number(percentageIncrease.toFixed(2));
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  date,
  setDate,
}: OverviewTabProps) => {
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalVolunteers, setTotalVolunteers] = useState<number>(0);
  const [newVolunteers, setNewVolunteers] = useState<number>(0);
  const [hoursVolunteered, setHoursVolunteered] = useState<number>(0);
  const [totalEventsPercentageIncrease, setTotalEventsPercentageIncrease] =
    useState<number>(0);
  const [
    totalVolunteersPercentageIncrease,
    setTotalVolunteersPercentageIncrease,
  ] = useState<number>(0);
  const [newVolunteersPercentageIncrease, setNewVolunteersPercentageIncrease] =
    useState<number>(0);
  const [
    hoursVolunteeredPercentageIncrease,
    setHoursVolunteeredPercentageIncrease,
  ] = useState<number>(0);
  const [demographicsData, setDemographicsData] = useState<any[]>([]);
  useEffect(() => {
    const getDemographics = async () => {
      const startOfCurrentMonth = startOfMonth(date);
      const endOfCurrentMonth = endOfMonth(date);
      const data = await fetchCompletedActivitiesWithVolunteers(
        startOfCurrentMonth,
        endOfCurrentMonth,
      );
      const totalHours = data.reduce(
        (sum, activity) => sum + activity.numHours,
        0,
      );
      const uniqueTitles = new Set(data.map((activity) => activity.title));
      const uniqueTitleCount = uniqueTitles.size;
      const lastMonthData = await fetchCompletedActivitiesWithVolunteers(
        subMonths(startOfCurrentMonth, 1),
        subMonths(endOfCurrentMonth, 1),
      );
      const lastMonthTotalHours = lastMonthData.reduce(
        (sum, activity) => sum + activity.numHours,
        0,
      );
      const lastMonthUniqueTitles = new Set(
        lastMonthData.map((activity) => activity.title),
      );
      const lastMonthUniqueTitleCount = lastMonthUniqueTitles.size;
      setHoursVolunteered(totalHours);
      setTotalVolunteers(data.length);
      setTotalEvents(uniqueTitleCount);
      setHoursVolunteeredPercentageIncrease(
        calculatePercentageIncrease(lastMonthTotalHours, totalHours),
      );
      setTotalVolunteersPercentageIncrease(
        calculatePercentageIncrease(lastMonthData.length, data.length),
      );
      setTotalEventsPercentageIncrease(
        calculatePercentageIncrease(
          lastMonthUniqueTitleCount,
          uniqueTitleCount,
        ),
      );
      try {
        const res = await getDemographicsLambda(data, 'monthly');
        setDemographicsData(res);
        console.log(res);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };
    getDemographics();
  }, [date]);

  if (totalEvents === 0)
    return (
      <div className="w-full text-center font-bold text-2xl">
        No events were held for this month.
      </div>
    );

  return (
    <TabsContent value="overview" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">Total Events</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar-check"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            {totalEventsPercentageIncrease !== 0 && (
              <p
                className={cn(
                  'text-xs',
                  { 'text-green-600': totalEventsPercentageIncrease > 0 },
                  { 'text-red-600': totalEventsPercentageIncrease < 0 },
                )}
              >
                {totalEventsPercentageIncrease}% from last month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">
              Total Volunteers Attended
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">{totalVolunteers}</div>
            {totalVolunteersPercentageIncrease !== 0 && (
              <p
                className={cn(
                  'text-xs',
                  { 'text-green-600': totalVolunteersPercentageIncrease > 0 },
                  { 'text-red-600': totalVolunteersPercentageIncrease < 0 },
                )}
              >
                {totalVolunteersPercentageIncrease}% from last month
              </p>
            )}
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">New Volunteers</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-plus"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-green-600">+19% from last month</p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold">
              Hours Volunteered
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-hourglass"
            >
              <path d="M5 22h14" />
              <path d="M5 2h14" />
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hoursVolunteered}</div>
            {hoursVolunteeredPercentageIncrease !== 0 && (
              <p
                className={cn(
                  'text-xs',
                  { 'text-green-600': hoursVolunteeredPercentageIncrease > 0 },
                  { 'text-red-600': hoursVolunteeredPercentageIncrease < 0 },
                )}
              >
                {hoursVolunteeredPercentageIncrease}% from last month
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {demographicsData?.[0] && (
          <div className="col-span-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">
                  Attendance Rate
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="flex items-center">
                  <div className="text-2xl font-bold">
                    {Number(
                      (
                        (demographicsData[0]?.attendance_Present /
                          demographicsData[0]?.rowCount) *
                        100
                      ).toFixed(2),
                    )}
                    %
                  </div>
                  <p className="text-xs text-green-600 ml-2">
                    +6.6% from last month
                  </p>
                </div>
                <Progress
                  value={Number(
                    (
                      (demographicsData[0]?.attendance_Present /
                        demographicsData[0]?.rowCount) *
                      100
                    ).toFixed(2),
                  )}
                  className="mt-4"
                />
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-400">Total</p>
                    <p className="font-semibold">
                      {totalVolunteers} Volunteers
                    </p>
                  </div>
                  <div className="relative">
                    <div className="bg-primary w-6 h-1 rounded-full absolute top-2 -left-10"></div>
                    <p className="text-sm text-gray-400">Attended</p>
                    <p className="font-semibold">
                      {demographicsData[0]?.attendance_Present} Volunteers
                    </p>
                  </div>
                  <div className="relative">
                    <div className="bg-secondary w-6 h-1 rounded-full absolute top-2 -left-10"></div>
                    <p className="text-sm text-gray-400">Absent</p>
                    <p className="font-semibold">
                      {demographicsData[0]?.rowCount -
                        demographicsData[0]?.attendance_Present}{' '}
                      Volunteers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            {demographicsData?.[0] && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Overview of Age Groups</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Graph demographics={demographicsData} />
                </CardContent>
              </Card>
            )}
          </div>
        )}
        {demographicsData?.[0] && (
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Demographics Distribution</CardTitle>
              <CardDescription>
                This graph illustrates the origins of volunteers across
                Singapore.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Leaderboard demographics={demographicsData} />
            </CardContent>
          </Card>
        )}
      </div>
    </TabsContent>
  );
};

export default OverviewTab;
