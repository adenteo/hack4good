'use server';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function getSentimentScore(feedbackText) {
    return new Promise(function (resolve, reject) {
        var pythonProcess = (0, child_process_1.spawn)('python3', ['getSentiment.py'], {
            env: __assign(__assign({}, process.env), { PYTHONIOENCODING: 'UTF-8' }),
        });
        var output = '';
        pythonProcess.stdin.write(JSON.stringify({ sentences: [feedbackText] }));
        pythonProcess.stdin.end();
        pythonProcess.stdout.on('data', function (data) {
            output += data.toString();
        });
        pythonProcess.stderr.on('data', function (data) {
            console.error("Python script error: ".concat(data.toString()));
        });
        pythonProcess.on('close', function (code) {
            if (code !== 0) {
                reject(new Error("Python script exited with code ".concat(code)));
            }
            else {
                try {
                    var score = parseFloat(output);
                    resolve(score);
                }
                catch (error) {
                    reject(new Error('Failed to parse output from Python script.'));
                }
            }
        });
    });
}
// Example usage
getSentimentScore("VADER is smart, handsome, and funny.")
    .then(function (score) { return console.log('Composite Sentiment Score:', score); })
    .catch(function (error) { return console.error('Error:', error); });
