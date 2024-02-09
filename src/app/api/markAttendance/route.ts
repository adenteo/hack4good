import { markAttendeePresent } from '@/lib/actions/activity-mark-attendance';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const activityId = searchParams.get('activityId');
  const userId = searchParams.get('userId');
  await markAttendeePresent(activityId!, userId!);

  redirect(`/attendanceSuccess?activityId=${activityId}&userId=${userId}`);
}
