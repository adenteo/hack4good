'use server';
import { spawn } from 'child_process';

export function getSentimentScore(feedbackText: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['getSentiment.py'], {
      //if not working, see whether ur PATH uses python3 or python
      env: { ...process.env, PYTHONIOENCODING: 'UTF-8' },
    });

    let output = '';

    pythonProcess.stdin.write(JSON.stringify({ sentences: [feedbackText] }));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data: Buffer) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data: Buffer) => {
      console.error(`Python script error: ${data.toString()}`);
    });

    pythonProcess.on('close', (code: number) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}`));
      } else {
        try {
          const score = parseFloat(output);
          resolve(score);
        } catch (error) {
          reject(new Error('Failed to parse output from Python script.'));
        }
      }
    });
  });
}
