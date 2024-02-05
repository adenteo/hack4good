'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { genders, labels, priorities, statuses } from '../data/data';
import { Task } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    accessorKey: 'profilePictureUrl',
    header: ({ column }) => <div>Profile Picture</div>,
    cell: ({ row }: any) => {
      return (
        <div className="flex space-x-2">
          <Avatar>
            <AvatarImage src={row.getValue('profilePictureUrl')} alt="img" />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }: any) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('fullName')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'dateOfBirth',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of Birth" />
    ),
    cell: ({ row }: any) => {
      const date = row.getValue('dateOfBirth');

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
    accessorKey: 'volunteerStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('volunteerStatus'),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.label === 'Active' ? (
            <span className="bg-green-500 rounded-full p-1 px-2 text-xs text-white">
              {status.label}
            </span>
          ) : (
            <span className="bg-red-500 rounded-full p-1 px-2 text-xs text-white">
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
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const gender = genders.find(
        (gender) => gender.value === row.getValue('gender'),
      );

      if (!gender) {
        return null;
      }

      return (
        <div className="flex items-center">
          <span>{gender.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
