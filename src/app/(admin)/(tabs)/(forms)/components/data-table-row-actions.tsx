'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { CustomForm } from '@/types/formTypes';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteForm } from '@/lib/actions/delete-form';
import { toast } from '@/components/ui/use-toast';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              router.push(
                `?tab=form%20builder&form=${
                  (row.original as CustomForm).title
                }`,
              );
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col justify-left p-6">
          <h1 className="text-xl font-semibold mb-2">Are you sure?</h1>
          <p className="text-lg text-red-500">
            This form and all of its data will be permanently deleted.
          </p>
          <DialogClose asChild>
            <Button
              className="bg-red-500 text-[0.9rem] mt-6 hover:bg-red-900"
              onClick={async () => {
                const response = await deleteForm(
                  (row.original as CustomForm).title,
                );
                if (response.success) {
                  router.refresh();
                  toast({
                    title: 'Form deleted',
                    description: 'Your form has been deleted successfully.',
                    className: 'bg-green-500 border-none text-white',
                  });
                }
              }}
            >
              Delete
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
