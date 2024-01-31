import * as React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

const pastActivities: string[] = [
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
export default function VolunteerProfile() {
  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-semibold">Amy Tan</h1>
          <p className="text-sm"> DOB: 23 May 2000</p>
          <p className="text-sm"> Race: Eurasian</p>
          <p className="text-sm">Nationality: Singaporean</p>
          {/* need interests, skills, availability */}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <h1 className="text-base font-medium">
          Hours Earned: <span className="text-xl font-bold">120h</span>
        </h1>
      </div>
      <div>
        <ScrollArea className="mt-6 h-36 w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Past Activities
            </h4>
            {pastActivities.map((pastActivity, index) => (
              <>
                <div key={index} className="text-sm">
                  {pastActivity}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
