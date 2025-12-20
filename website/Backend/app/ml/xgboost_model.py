import xgboost as xgb
import numpy as np
import pandas as pd
import pickle
import os

class XGBoostPredictor:
    def __init__(self):
        self.model_path = "app/ml/saved_models/price_impact_model.pkl"
        self.data_path = "kiran_store.csv"
        self.model = None
        self._ensure_directory()

    def _ensure_directory(self):
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)

    def train(self):
        try:
            if os.path.exists(self.data_path):
                df = pd.read_csv(self.data_path)
                # Feature Engineering on real data
                # Predict 'Amount' based on 'Rate' and 'Category'
                
                # Simple encoding for Category
                df['CategoryCode'] = df['Category'].astype('category').cat.codes
                
                X = df[['Rate', 'CategoryCode']].values
                y = df['Amount'].values
            else:
                X = np.random.rand(100, 2) * 100
                y = np.random.rand(100) * 1000

            self.model = xgb.XGBRegressor(objective='reg:squarederror')
            self.model.fit(X, y)
            
            self.save()
            return {"status": "trained", "accuracy": "xgboost_regressor"}
        except Exception as e:
            print(f"XGBoost train error: {e}")
            return {"status": "error", "message": str(e)}

    def predict(self, features):
        if not self.model:
            self.load()
        
        prediction = self.model.predict(np.array([features]))
        return float(prediction[0])

    def save(self):
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)

    def load(self):
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
        else:
            self.train()
