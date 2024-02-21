'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { ratings, priorities, statuses } from '../data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import Link from 'next/link';
import { ArrowDownToLine, FolderPlus, ScrollText } from 'lucide-react';
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
import googleForm from '@/lib/actions/google-form';

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
    setSelectedRows(rows);
  }, [selectedIndexes, table]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter authors..."
          value={
            (table.getColumn('name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('rating') && (
          <DataTableFacetedFilter
            column={table.getColumn('rating')}
            title="Ratings"
            options={ratings}
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
      <DataTableViewOptions table={table} />
    </div>
  );
}
