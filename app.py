# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("kmack/malicious-url-detection")
model = AutoModelForSequenceClassification.from_pretrained("kmack/malicious-url-detection")

def preprocess_url(url):
    # Basic URL preprocessing - remove http://, https://, www.
    url = re.sub(r'^https?://|www\.', '', url.lower())
    return url

def check_url(url):
    # Preprocess the URL
    processed_url = preprocess_url(url)
    
    # Tokenize the URL
    inputs = tokenizer(processed_url, return_tensors="pt", truncation=True, max_length=512)
    
    # Get prediction
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
        
    # Get the predicted class and confidence
    predicted_class = torch.argmax(predictions).item()
    confidence = predictions[0][predicted_class].item()
    
    return {
        "is_malicious": bool(predicted_class),
        "confidence": round(confidence * 100, 2),
        "processed_url": processed_url
    }

@app.route('/api/check-url', methods=['POST'])
def analyze_url():
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({
            "error": "No URL provided",
            "status": "error"
        }), 400
    
    url = data['url']
    
    try:
        result = check_url(url)
        return jsonify({
            "status": "success",
            "result": result
        })
    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

if __name__ == '__main__':
    app.run(debug=True)