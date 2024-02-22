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
  const output = await classifier(text, volunteer_themes, { multi_label: true });
  const scores = output.scores;
  const labels = output.labels;
  const scoredLabels = scores
  .map((score, index) => ({ score, label: labels[index] }))
  .filter(pair => pair.score > 0.6)
  .sort((a, b) => b.score - a.score);

// Separate the scores and labels after filtering and sorting
const highScores = scoredLabels.map(pair => pair.score);
const highLabels = scoredLabels.map(pair => pair.label);

return NextResponse.json({ scores: highScores, tags: highLabels });
//   return NextResponse.json({scores: scores.slice(0, 5), tags: tags.slice(0, 5)});
}

