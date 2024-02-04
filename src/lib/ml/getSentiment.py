from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import json
import sys

def compute_composite_sentiment(json_data):
    analyzer = SentimentIntensityAnalyzer()
    total_score = 0
    num_sentences = 0
    
    for sentence in json_data['sentences']:
        vs = analyzer.polarity_scores(sentence)
        total_score += vs['compound']
        num_sentences += 1
    
    composite_score = total_score / num_sentences if num_sentences else 0
    return composite_score

if __name__ == '__main__':
    # Read input JSON from stdin
    input_json = json.load(sys.stdin)
    score = compute_composite_sentiment(input_json)
    # Print the score to stdout
    print(score)


## Example usage:
#json_input = json.dumps({
#    "sentences": [
#        "VADER is smart, handsome, and funny.",  # positive sentence example
#        "VADER is smart, handsome, and funny!",  # punctuation emphasis handled correctly (sentiment intensity adjusted)
#        "VADER is very smart, handsome, and funny.", # booster words handled correctly (sentiment intensity adjusted)
#        "VADER is VERY SMART, handsome, and FUNNY.",  # emphasis for ALLCAPS handled
#        "VADER is VERY SMART, handsome, and FUNNY!!!", # combination of signals - VADER appropriately adjusts intensity
#        "VADER is VERY SMART, uber handsome, and FRIGGIN FUNNY!!!", # booster words & punctuation make this close to ceiling for score
#        "VADER is not smart, handsome, nor funny.",  # negation sentence example
#        "The book was good.",  # positive sentence
#        "At least it isn't a horrible book.",  # negated negative sentence with contraction
#        "The book was only kind of good.", # qualified positive sentence is handled correctly (intensity adjusted)
#        "The plot was good, but the characters are uncompelling and the dialog is not great.", # mixed negation sentence
#        "Today SUX!",  # negative slang with capitalization emphasis
#        "Today only kinda sux! But I'll get by, lol", # mixed sentiment example with slang and constrastive conjunction "but"
#        "Make sure you :) or :D today!",  # emoticons handled
#        "Catch utf-8 emoji such as such as 💘 and 💋 and 😁",  # emojis handled
#        "Not bad at all"  # Capitalized negation
#    ]
#})
#json_data = json.loads(json_input)  # Assuming the input would be a JSON string
#composite_sentiment_value = compute_composite_sentiment(json_data)
#print("Composite Sentiment Value:", composite_sentiment_value)
