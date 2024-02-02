from transformers import BartForSequenceClassification, BartTokenizer, pipeline
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'tagger_model')
tokenizer_path = os.path.join(current_dir, 'tagger_tokenizer')

def load_classifier_from_local():
    model = BartForSequenceClassification.from_pretrained(model_path)
    tokenizer = BartTokenizer.from_pretrained(tokenizer_path)
    classifier = pipeline("zero-shot-classification", model=model, tokenizer=tokenizer)
    return classifier

def classify_description(description, themes):
    classifier = load_classifier_from_local()
    output = classifier(description, themes, multi_label=True)
    selected_scores = [(label, score) for label, score in zip(output['labels'], output['scores']) if score > 0.6]
    selected_scores.sort(key=lambda x: x[1], reverse=True)
    return selected_scores[:5]

# Example usage:
description = "Join our 'Heartfelt Meals' initiative, where we transform the simple act of cooking\
    into a gesture of love and companionship for the elderly who often dine alone. This volunteer event \
    is more than just preparing food; it's about crafting nutritious meals seasoned with care and serving \
    up warm conversations to nourish the souls of our senior community. We invite you to roll up your sleeves,\
    don your aprons, and bring your culinary skills – or eagerness to learn – to our lively kitchen brigade."

volunteer_themes = ["Elderly","Teaching","Environment","Animals","Plants",
                    "Heritage","Health","Literacy","Refugees","Food","Cooking"
                    "Children","Education","Rescue","Arts","Accessibility",
                    "Sports","Medical","Legal","Income","Water","Energy",
                    "Parenting","Finance","Recovery","Rehabilitation","Digital",
                    "Charity","Overseas"]
# Call the function with the description and themes
top_scores = classify_description(description, volunteer_themes)
print(top_scores)
