import { NextResponse } from 'next/server';
import PipelineSingleton from './pipeline.js';

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
  const classifier = await PipelineSingleton.getInstance();

  const volunteer_themes = [
    'Elderly',
    'Teaching',
    'Environment',
    'Animals',
    'Plants',
    'Heritage',
    'Health',
    'Literacy',
    'Refugees',
    'Food',
    'Cooking',
    'Children',
    'Education',
    'Rescue',
    'Arts',
    'Accessibility',
    'Sports',
    'Medical',
    'Legal',
    'Income',
    'Water',
    'Energy',
    'Parenting',
    'Finance',
    'Recovery',
    'Rehabilitation',
    'Digital',
    'Charity',
    'Overseas',
  ];
  const output = await classifier(text, volunteer_themes);
  const scores = output.scores;
  const highestFive = getTopFiveTags(scores, volunteer_themes);
  return NextResponse.json(highestFive);
}

function getTopFiveTags(scores, labels) {
  let paired = scores.map((number, index) => ({ number, text: labels[index] }));
  paired.sort((a, b) => b.number - a.number);
  let highestFivePairs = paired.slice(0, 5);
  let topFiveScores = highestFivePairs.map((pair) => pair.number);
  let topFiveTags = highestFivePairs.map((pair) => pair.text);
  return {
    tags: topFiveTags,
    scores: topFiveScores,
  };
}
