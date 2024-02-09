'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function AttendancePage() {
  const params = useSearchParams();
  const activityId = params.get('activityId');
  const userId = params.get('userId');
  return (
    <div className="min-h-screen font-bold text-center flex justify-center items-center">
      Attendance successfully logged for: {activityId}
    </div>
  );
}
