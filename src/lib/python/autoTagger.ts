'use server';
import { spawn } from "child_process";
export function autoTagger(description: string, themes: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", ["autoTagger.py"]);//if not working, see whether ur PATH uses python3 or python

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on("data", (data: Buffer) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data: Buffer) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code: number) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
      } else {
        try {
          const parsedOutput = JSON.parse(output);
          resolve(parsedOutput);
        } catch (error) {
          reject(new Error("Failed to parse output from Python script."));
        }
      }
    });

    // Send the description and themes to the Python script
    const input = JSON.stringify({ description, themes });
    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();
  });
}

// Example usage:
const description = "Join our 'Heartfelt Meals' initiative, where we transform the simple act of cooking into a gesture of love and companionship for the elderly who often dine alone. This volunteer event is more than just preparing food; it's about crafting nutritious meals seasoned with care and serving up warm conversations to nourish the souls of our senior community. We invite you to roll up your sleeves, don your aprons, and bring your culinary skills – or eagerness to learn – to our lively kitchen brigade.";
const allVolunteerThemes: string[] = ["Elderly","Teaching","Environment","Animals","Plants",
                    "Heritage","Health","Literacy","Refugees","Food","Cooking",
                    "Children","Education","Rescue","Arts","Accessibility",
                    "Sports","Medical","Legal","Income","Water","Energy",
                    "Parenting","Finance","Recovery","Rehabilitation","Digital",
                    "Charity","Overseas"]
autoTagger(description, allVolunteerThemes)
  .then(topScores => console.log(topScores))
  .catch(error => console.error(error));
