'use server';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoTagger = void 0;
var child_process_1 = require("child_process");
function autoTagger(description, themes) {
    return new Promise(function (resolve, reject) {
        var pythonProcess = (0, child_process_1.spawn)("python3", ["autoTagger.py"]); //if not working, see whether ur PATH uses python3 or python
        var output = '';
        var errorOutput = '';
        pythonProcess.stdout.on("data", function (data) {
            output += data.toString();
        });
        pythonProcess.stderr.on("data", function (data) {
            errorOutput += data.toString();
        });
        pythonProcess.on("close", function (code) {
            if (code !== 0) {
                reject(new Error("Python script exited with code ".concat(code, ": ").concat(errorOutput)));
            }
            else {
                try {
                    var parsedOutput = JSON.parse(output);
                    resolve(parsedOutput);
                }
                catch (error) {
                    reject(new Error("Failed to parse output from Python script."));
                }
            }
        });
        // Send the description and themes to the Python script
        var input = JSON.stringify({ description: description, themes: themes });
        pythonProcess.stdin.write(input);
        pythonProcess.stdin.end();
    });
}
exports.autoTagger = autoTagger;
// Example usage:
var description = "Join our 'Heartfelt Meals' initiative, where we transform the simple act of cooking into a gesture of love and companionship for the elderly who often dine alone. This volunteer event is more than just preparing food; it's about crafting nutritious meals seasoned with care and serving up warm conversations to nourish the souls of our senior community. We invite you to roll up your sleeves, don your aprons, and bring your culinary skills – or eagerness to learn – to our lively kitchen brigade.";
var allVolunteerThemes = ["Elderly", "Teaching", "Environment", "Animals", "Plants",
    "Heritage", "Health", "Literacy", "Refugees", "Food", "Cooking",
    "Children", "Education", "Rescue", "Arts", "Accessibility",
    "Sports", "Medical", "Legal", "Income", "Water", "Energy",
    "Parenting", "Finance", "Recovery", "Rehabilitation", "Digital",
    "Charity", "Overseas"];
autoTagger(description, allVolunteerThemes)
    .then(function (topScores) { return console.log(topScores); })
    .catch(function (error) { return console.error(error); });
