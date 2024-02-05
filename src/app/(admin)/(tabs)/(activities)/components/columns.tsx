'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { priorities, statuses } from '../data/data';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }: any) => {
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      const date: Date = row.getValue('startTime');

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: '_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }: any) => (
      <div className="w-[80px] ">
        {row.getValue('_id').slice(0, 8) +
          (row.getValue('_id').length > 5 ? '...' : '')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status'),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.label == 'Completed' ? (
            <span className="bg-green-500 p-2 rounded-full text-xs text-white">
              {status.label}
            </span>
          ) : status.label == 'Upcoming' ? (
            <span className="bg-blue-500 p-2 rounded-full text-xs text-white">
              {status.label}
            </span>
          ) : status.label == 'Ongoing' ? (
            <span className="bg-orange-500 p-2 rounded-full text-xs text-white">
              {status.label}
            </span>
          ) : (
            <span className="bg-red-500 p-2 rounded-full text-xs text-white">
              {status.label}
            </span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'attendees',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volunteer Count" />
    ),
    cell: ({ row }: any) => {
      const attendees = row.getValue('attendees');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {attendees.length}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'signUpLimit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Cap." />
    ),
    cell: ({ row }: any) => {
      const limit = row.getValue('signUpLimit');
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">{limit}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const StatusComponent = (status: any) => {
  let backgroundColor;

  switch (status) {
    case 'Completed':
      backgroundColor = 'green';
      break;
    case 'Upcoming':
      backgroundColor = 'blue';
      break;
    case 'Ongoing':
      backgroundColor = 'yellow';
      break;
    case 'Cancelled':
      backgroundColor = 'red';
      break;
    default:
      backgroundColor = 'gray';
      break;
  }

  return <span style={{ backgroundColor }}>{status.label}</span>;
};
