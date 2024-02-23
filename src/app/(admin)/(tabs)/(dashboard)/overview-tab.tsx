import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
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
import {
  differenceInHours,
  endOfMonth,
  startOfMonth,
  subMonths,
} from 'date-fns';
import getDemographicsLambda from '@/lib/actions/get-demographics';
import { cn } from '@/lib/utils';
import { BookHeart, LucideSmile, PlusCircle, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { unparse } from 'papaparse';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from 'antd';
import LineChartHero from './linechart';
import ScatterChartHero from './scatterchart';
import updateSentiment from '@/lib/actions/update-sentiment';

interface OverviewTabProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function calculatePercentageIncrease(a: number, b: number) {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  console.log(percent);
  console.log(a, b);
  return Math.floor(percent);
}

/**
 * Renders the overview tab of the dashboard.
 *
 * @component
 * @param {OverviewTabProps} props - The props for the OverviewTab component.
 * @param {Date} props.date - The selected date.
 * @param {React.Dispatch<React.SetStateAction<Date>>} props.setDate - The function to set the selected date.
 * @returns {JSX.Element} The rendered OverviewTab component.
 */

const OverviewTab: React.FC<OverviewTabProps> = ({
  date,
  setDate,
}: OverviewTabProps) => {
  const [topCards, setTopCards] = useState<number[]>([0, 1, 2, 3]);
  const [bottomCards, setBottomCards] = useState<number[]>([0, 1]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [totalVolunteers, setTotalVolunteers] = useState<number>(0);
  const [sentiment, setSentiment] = useState<number>(0);
  const [hoursVolunteered, setHoursVolunteered] = useState<number>(0);
  const [totalEventsPercentageIncrease, setTotalEventsPercentageIncrease] =
    useState<number>(0);
  const [
    totalVolunteersPercentageIncrease,
    setTotalVolunteersPercentageIncrease,
  ] = useState<number>(0);
  const [
    hoursVolunteeredPercentageIncrease,
    setHoursVolunteeredPercentageIncrease,
  ] = useState<number>(0);
  const [sentimentPercentageIncrease, setSentimentPercentageIncrease] =
    useState<number>(0);
  const [demographicsData, setDemographicsData] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true);
    const getDemographics = async () => {
      const startOfCurrentMonth = startOfMonth(date);
      const endOfCurrentMonth = endOfMonth(date);
      const data = await fetchCompletedActivitiesWithVolunteers(
        startOfCurrentMonth,
        endOfCurrentMonth,
      );
      console.log(data);
      const totalHours = data.reduce(
        (sum, activity) =>
          sum + differenceInHours(activity.endTime, activity.startTime),
        0,
      );
      const uniqueTitles = new Set(data.map((activity) => activity.title));
      const uniqueTitleCount = uniqueTitles.size;
      const lastMonthData = await fetchCompletedActivitiesWithVolunteers(
        subMonths(startOfCurrentMonth, 1),
        subMonths(endOfCurrentMonth, 1),
      );
      const lastMonthTotalHours = lastMonthData.reduce(
        (sum, activity) =>
          sum + differenceInHours(activity.endTime, activity.startTime),
        0,
      );
      const lastMonthUniqueTitles = new Set(
        lastMonthData.map((activity) => activity.title),
      );
      const lastMonthUniqueTitleCount = lastMonthUniqueTitles.size;
      const overallSentiment =
        data.reduce((sum, activity) => sum + activity.averageSentiment, 0) /
        data.length;
      const lastMonthOverallSentiment =
        lastMonthData.reduce(
          (sum, activity) => sum + activity.averageSentiment,
          0,
        ) / lastMonthData.length;

      setHoursVolunteered(totalHours);
      setTotalVolunteers(data.length);
      setTotalEvents(uniqueTitleCount);

      setSentiment(Number(overallSentiment.toFixed(2)));
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
      setSentimentPercentageIncrease(
        calculatePercentageIncrease(
          lastMonthOverallSentiment,
          overallSentiment,
        ),
      );
      try {
        const res = await getDemographicsLambda(data, 'monthly');
        setDemographicsData(res);
        console.log(res);
      } catch (error) {
        console.error('Error posting data:', error);
      }
      setLoading(false);
    };
    getDemographics();
  }, [date]);

  if (totalEvents === 0)
    return (
      <div className="w-full text-center font-bold text-2xl">
        No events were held for this month.
      </div>
    );

  if (loading) {
    return (
      <div className="w-full text-center font-bold text-2xl">
        <span className="loading loading-bars loading-lg"></span>
        <div className="font-semibold">Getting dashboard data</div>
      </div>
    );
  }

  const renderBottomCards = (index: number) => {
    switch (index) {
      case 0:
        return (
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
                  <p className="font-semibold">{totalVolunteers} Volunteers</p>
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
        );
      case 1:
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Overview of Age Groups</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Graph demographics={demographicsData} />
            </CardContent>
          </Card>
        );
    }
  };

  const renderTopCards = (index: number) => {
    switch (index) {
      case 0:
        return (
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
                    {
                      'text-green-600': totalEventsPercentageIncrease > 0,
                    },
                    {
                      'text-red-600': totalEventsPercentageIncrease < 0,
                    },
                  )}
                >
                  {totalEventsPercentageIncrease}% from last month
                </p>
              )}
            </CardContent>
          </Card>
        );
      case 1:
        return (
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
                    {
                      'text-green-600': totalVolunteersPercentageIncrease > 0,
                    },
                    {
                      'text-red-600': totalVolunteersPercentageIncrease < 0,
                    },
                  )}
                >
                  {totalVolunteersPercentageIncrease}% from last month
                </p>
              )}
            </CardContent>
          </Card>
        );
      case 2:
        return (
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
                    {
                      'text-green-600': hoursVolunteeredPercentageIncrease > 0,
                    },
                    {
                      'text-red-600': hoursVolunteeredPercentageIncrease < 0,
                    },
                  )}
                >
                  {hoursVolunteeredPercentageIncrease}% from last month
                </p>
              )}
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">
                Overall Sentiment
              </CardTitle>
              <LucideSmile size={15} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sentiment} / 5 </div>
              {sentimentPercentageIncrease !== 0 && (
                <p
                  className={cn(
                    'text-xs',
                    {
                      'text-green-600': sentimentPercentageIncrease > 0,
                    },
                    {
                      'text-red-600': sentimentPercentageIncrease < 0,
                    },
                  )}
                >
                  {sentimentPercentageIncrease}% from last month
                </p>
              )}
            </CardContent>
          </Card>
        );
      case 4:
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold">
                Most Popular Category
              </CardTitle>
              <BookHeart />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Elderly</div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Add additional widgets to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="p-2 border rounded-md flex">
            <LineChartHero />
            <PlusSquare className="cursor-pointer" />
          </div>
          <div className="p-2 border rounded-md flex">
            <ScatterChartHero />
            <PlusSquare className="cursor-pointer" />
          </div>
          <div className="p-2 border rounded-md flex">
            <Card className="w-full m-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold">
                  Most Popular Category
                </CardTitle>
                <BookHeart />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Elderly</div>
              </CardContent>
            </Card>
            <DialogClose>
              <PlusSquare
                className="cursor-pointer"
                onClick={() => {
                  setTopCards([0, 1, 2, 3, 4]);
                }}
              />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
      <TabsContent value="overview" className="space-y-4">
        <div className="flex justify-between items-center">
          {/* <Button
            onClick={async () => {
              await updateSentiment();
            }}
          >
            Update sentiment
          </Button> */}
          <Button
            onClick={async () => {
              const csvData = unparse(demographicsData);
              const blob = new Blob([csvData], { type: 'text/csv' });
              const downloadUrl = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = downloadUrl;
              a.download = `dashboard_report_month_${date.getMonth() + 1}.csv`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(downloadUrl);
            }}
          >
            Download Dashboard Report
          </Button>
          <DialogTrigger>
            <div className="flex justify-center items-center border rounded-md p-2 cursor-pointer hover:bg-gray-200">
              <PlusCircle className="mr-3" />
              <span className="font-semibold">Add Widget</span>
            </div>
          </DialogTrigger>
        </div>
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) {
              return;
            }
            const items = Array.from(topCards);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            setTopCards(items);
          }}
        >
          <Droppable droppableId="ROOT" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-6"
              >
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {topCards.map((card, index) => (
                    <Draggable
                      key={card}
                      draggableId={card.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          {renderTopCards(card)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {demographicsData?.[0] && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <DragDropContext
              onDragEnd={(result) => {
                if (!result.destination) {
                  return;
                }
                const items = Array.from(bottomCards);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
                setBottomCards(items);
              }}
            >
              <Droppable droppableId="ROOT2">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-6 col-span-4"
                  >
                    {bottomCards.map((card, index) => (
                      <Draggable
                        key={card}
                        draggableId={card.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {renderBottomCards(card)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
          </div>
        )}
      </TabsContent>
    </Dialog>
  );
};

export default OverviewTab;
