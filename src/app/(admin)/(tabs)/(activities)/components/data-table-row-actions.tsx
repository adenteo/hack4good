'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useQRCode } from 'next-qrcode';

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ActivityType, ExtendedActivityType } from '@/models/Activity';
import LinkFormDialog from './link-form-dialog';
import { QrCode } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSession } from 'next-auth/react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { Canvas } = useQRCode();
  const activityId = (row.original as ExtendedActivityType)._id;
  const signUpForm = (row.original as ExtendedActivityType).customSignUpForm;
  const currentAttendance = (row.original as ExtendedActivityType).attendees
    .length;
  const maxAttendance = (row.original as ExtendedActivityType).signUpLimit;
  const session = useSession();
  const userId = session.data?.user.id;
  console.log(
    `${process.env
      .NEXT_PUBLIC_APP_URL!}/api/markAttendance?activityId=${activityId}&userId=${userId}`,
  );
  return (
    <AlertDialog>
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
            <AlertDialogTrigger id="QR" asChild>
              <DropdownMenuItem>
                Attendance QR
                <QrCode className="ml-1" size={15} />
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <DialogTrigger id="link" asChild>
              <DropdownMenuItem>Link Form</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent
          id="QR"
          className="sm:max-w-[425px] flex justify-center items-center"
        >
          <div className="flex flex-col justify-left p-6">
            <h1 className="text-xl font-semibold">Attendance QR Code</h1>
            <p className="text-lg text-red-500">
              <Canvas
                text={`${process.env
                  .NEXT_PUBLIC_APP_URL!}/api/markAttendance?activityId=${activityId}&userId=${userId}`}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 200,
                }}
              />
            </p>
            <div className="text-center font-bold my-4">
              Current Attendance: <br></br>
              {currentAttendance} /{' '}
              {maxAttendance! > 0 ? maxAttendance : 'unlimited'}
            </div>
            <AlertDialogCancel asChild>
              <Button className="bg-gray-200 text-[0.9rem] mt-6 text-black">
                Close
              </Button>
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
        <DialogContent id="link" className="sm:max-w-[425px]">
          <LinkFormDialog activityId={activityId} signUpForm={signUpForm} />
        </DialogContent>
      </Dialog>
    </AlertDialog>
  );
}
