'use server';

import { Card } from '@/components/ui/card';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import ExampleChart from '../example-chart';

const volunteeringActivities = [
  'Animal Shelter Support',
  'Community Cleanup',
  'Food Drive',
  'Teaching and Tutoring',
  'Elderly Care',
  'Environmental Conservation',
  'Homeless Shelter Assistance',
  'Medical Outreach',
  "Children's Education",
  'Disaster Relief',
  'Community Garden Maintenance',
];

export default async function Admin() {
  return (
    <div className="min-h-screen p-6">
      <div className="flex">
        <div>
          <Card className="w-52 min-h-[95vh]"></Card>
        </div>
        <div className="flex justify-center w-screen items-center">
          <div>
            <div>
              <Select>
                <SelectTrigger className="w-[70vw] flex justify-center">
                  <SelectValue placeholder="Please select a volunteering activity" />
                </SelectTrigger>
                <SelectContent>
                  {volunteeringActivities.map((activity, index) => (
                    <SelectItem key={index} value={activity}>
                      {activity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <div className="mt-6">
                <Menubar className="w-fit" defaultValue="Dashboard">
                  <MenubarMenu>
                    <MenubarTrigger>Dashboard</MenubarTrigger>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Form</MenubarTrigger>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Attendance</MenubarTrigger>
                  </MenubarMenu>
                </Menubar>
              </div>
              <div className="mt-6">
                <Button variant="outline">Download</Button>
              </div>
            </div>
            <br />
            <div className="mt-6">
              <Card>
                <ExampleChart />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
