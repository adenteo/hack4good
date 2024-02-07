'use server';
export default async function getDemographicsLambda(
  data: any,
  timeframe: string,
) {
  const response = await fetch(
    'https://nfvf4j54u6peah7kgvuz3xkzga0htbsf.lambda-url.ap-southeast-1.on.aws/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data, timeframe: timeframe }),
    },
  );
  if (response.status !== 200) {
    return null;
  }
  const res = await response.json();
  return res;
}
