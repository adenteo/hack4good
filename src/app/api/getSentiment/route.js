import { NextResponse } from 'next/server';
import PipelineSingleton from './pipeline.js';

export async function POST(request) {
  console.log(rating);
  return NextResponse.json({ rating: 1 });

  const requestBody = await request.json();
  const text = requestBody.text;
  if (!text) {
    return NextResponse.json(
      {
        error: 'Missing text parameter',
      },
      { status: 400 },
    );
  }
  const classifier = await PipelineSingleton.getInstance();
  const output = await classifier(text);
  console.log(output);
  const rating =
    output[0]['label'] === '1 star'
      ? 1
      : output[0]['label'] === '2 stars'
      ? 2
      : output[0]['label'] === '3 stars'
      ? 3
      : output[0]['label'] === '4 stars'
      ? 4
      : 5;
  console.log(rating);
  return NextResponse.json({ rating: rating });
}
