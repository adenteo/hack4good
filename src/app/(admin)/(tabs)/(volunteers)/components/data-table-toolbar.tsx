'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { genders, priorities, statuses } from '../data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import Link from 'next/link';
import { ArrowDownToLine, FolderPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import getVolunteerReport from '@/lib/actions/get-volunteer-report';
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
  subYears,
} from 'date-fns';
import { fetchCompletedActivitiesWithVolunteers } from '@/lib/actions/get-reports';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedIndexes = table.getState().rowSelection;
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    if (!table) return;
    const rows = Object.keys(selectedIndexes).map((id) => {
      const activityId = (table.getRow(id.toString()).original as any)._id;
      return activityId;
    });
    // console.log(rows);
    setSelectedRows(rows);
  }, [selectedIndexes, table]);

  //   console.log(rows);

  //   console.log(selectedRows);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter names..."
          value={
            (table.getColumn('fullName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('fullName')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('volunteerStatus') && (
          <DataTableFacetedFilter
            column={table.getColumn('volunteerStatus')}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn('gender') && (
          <DataTableFacetedFilter
            column={table.getColumn('gender')}
            title="Gender"
            options={genders}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <Button
        variant="outline"
        className="h-8 px-2 lg:px-3 mr-2"
        onClick={async () => {
          const startMonth = startOfMonth(new Date());
          const endMonth = endOfMonth(new Date());
          const data = await fetchCompletedActivitiesWithVolunteers(
            subMonths(startMonth, 10),
            subMonths(endMonth, 1),
          );
          const volunteerReport = await getVolunteerReport(
            data,
            'monthly',
            selectedRows,
          );
          console.log(volunteerReport);
          console.log(JSON.parse(volunteerReport[0]));
          console.log(JSON.parse(volunteerReport[1]));
        }}
      >
        <ArrowDownToLine className="mr-2 h-4 w-4" />
        Download Report(s)
      </Button> */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
