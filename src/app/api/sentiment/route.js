import { NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';

// import PipelineSingleton from './pipeline.js';

class PipelineSentiment {
  static task = 'text-classification';
  static model = 'Xenova/bert-base-multilingual-uncased-sentiment';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

export async function POST(request) {
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
  const classifier = await PipelineSentiment.getInstance();
  return NextResponse.json({ rating: 3 });

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
