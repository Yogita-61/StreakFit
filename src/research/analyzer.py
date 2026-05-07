from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

class ResearchAgent:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
        self.model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

    def analyze_news(self, snippets):
        if not snippets: return 0.5  # Neutral
        
        inputs = self.tokenizer(snippets, padding=True, truncation=True, return_tensors='pt')
        outputs = self.model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
        
        # Calculate a risk score based on 'negative' class probability
        # Class indices: 0: positive, 1: negative, 2: neutral
        neg_scores = predictions[:, 1].detach().numpy()
        return float(neg_scores.mean())

    def detect_legal_risk(self, text):
        keywords = ["fraud", "lawsuit", "nclt", "default", "scam", "litigation"]
        count = sum(1 for word in keywords if word in text.lower())
        return count