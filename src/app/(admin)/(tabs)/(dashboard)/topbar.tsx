'use client';
import { Button } from '@/components/ui/button';
import { fetchCompletedActivitiesWithVolunteers } from '@/lib/actions/get-reports';
import { addMonths, endOfMonth, startOfMonth, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { unparse } from 'papaparse';
import { useEffect, useState } from 'react';

interface TopbarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Topbar: React.FC<TopbarProps> = ({ date, setDate }: TopbarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (year && month) {
      const currentDate = new Date(parseInt(year), parseInt(month) - 1);
      setDate(currentDate);
      return;
    }
    const currentDate = new Date();
    setDate(currentDate);
  }, [year, month]);

  if (!date) return null;

  const handleIncreaseMonth = () => {
    const newDate = addMonths(date, 1);
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set('year', newDate?.getFullYear().toString());
    searchParams.set('month', (newDate?.getMonth() + 1).toString());

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    // setDate(newDate);
    router.push(newUrl);
  };

  const handleDecreaseMonth = () => {
    const newDate = subMonths(date, 1);
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set('year', newDate?.getFullYear().toString());
    searchParams.set('month', (newDate?.getMonth() + 1).toString());

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    // setDate(newDate);
    router.push(newUrl);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Button
              variant={'ghost'}
              className="mr-2"
              onClick={() => {
                const date = new Date();
                router.push('?tab=dashboard&type=overview');
                setDate(date);
              }}
            >
              <span className="text-xs mr-2">Reset</span>
              <RotateCcw size={16} strokeWidth={1} />
            </Button>
            <Button
              variant={'outline'}
              size={'icon'}
              onClick={() => {
                handleDecreaseMonth();
              }}
            >
              <ChevronLeft size={15} />
            </Button>
            <p className="mx-12 font-semibold text-sm w-32 text-center">
              {date?.toLocaleString('default', { month: 'long' })}{' '}
              {date?.getFullYear()}
            </p>
            <Button
              variant={'outline'}
              size={'icon'}
              onClick={() => handleIncreaseMonth()}
            >
              <ChevronRight size={15} />
            </Button>
          </div>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const data = await fetchCompletedActivitiesWithVolunteers(
                startOfMonth(date),
                endOfMonth(date),
              );
              setLoading(false);
              const csvData = unparse(data);

              const blob = new Blob([csvData], { type: 'text/csv' });
              const downloadUrl = window.URL.createObjectURL(blob);

              const a = document.createElement('a');
              a.href = downloadUrl;
              a.download = `activities_month_${date.getMonth() + 1}.csv`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);

              window.URL.revokeObjectURL(downloadUrl);
            }}
          >
            {loading ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              'Download Raw Monthly Report'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
