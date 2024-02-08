'use server';
export default async function getVolunteerReport(
  data: any,
  timeframe: string,
  userIds: string[],
) {
  console.log(
    JSON.stringify({
      data: data,
      userIds: userIds,
      timeframe: timeframe,
    }),
  );
  const response = await fetch(
    'https://ldgq64kjgaptfznkajto4nooru0khzbm.lambda-url.ap-southeast-1.on.aws/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: data,
        userIds: userIds,
        timeframe: timeframe,
      }),
    },
  );
  if (response.status !== 200) {
    return null;
  }
  const res = await response.json();
  return res;
}
