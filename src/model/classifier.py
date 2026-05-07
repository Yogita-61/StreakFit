import xgboost as xgb
import numpy as np
import shap

class CreditDecider:
    def __init__(self):
        # In a real app, load a pre-trained model: self.model.load_model('credit_model.json')
        self.model = xgb.XGBClassifier()
        # Mocking a model fit for demonstration
        X_dummy = np.random.rand(10, 6)
        y_dummy = [0, 1, 0, 1, 1, 0, 1, 0, 0, 1]
        self.model.fit(X_dummy, y_dummy)

    def calculate_score(self, features):
        """
        Features order: [revenue, profit_margin, debt_ratio, gst_variance, news_risk, qual_score]
        """
        feats_array = np.array([features])
        prob = self.model.predict_proba(feats_array)[0][1]
        risk_score = prob * 100
        
        decision = "Approve" if risk_score < 35 else "Reject" if risk_score > 65 else "Manual Review"
        return risk_score, decision

    def explain_decision(self, features):
        explainer = shap.TreeExplainer(self.model)
        shap_values = explainer.shap_values(np.array([features]))
        return shap_values