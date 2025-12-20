from sklearn.linear_model import LinearRegression
import numpy as np
import pandas as pd
import pickle
import os
from datetime import datetime

class ForecastingPredictor:
    def __init__(self):
        self.model_path = "app/ml/saved_models/forecasting_model.pkl"
        self.data_path = "kiran_store.csv"
        self.model = None
        self._ensure_directory()

    def _ensure_directory(self):
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)

    def train(self):
        try:
            # Load real data if available
            if os.path.exists(self.data_path):
                df = pd.read_csv(self.data_path)
                # Convert Date to datetime
                df['Date'] = pd.to_datetime(df['Date'])
                # Aggregate daily sales
                daily_sales = df.groupby('Date')['Amount'].sum().reset_index()
                daily_sales = daily_sales.sort_values('Date')
                
                # Create timestamp features (days since start)
                start_date = daily_sales['Date'].min()
                daily_sales['Days'] = (daily_sales['Date'] - start_date).dt.days
                
                X = daily_sales[['Days']].values
                y = daily_sales['Amount'].values
            else:
                # Fallback to dummy data
                print("CSV not found, using dummy data")
                X = np.arange(1, 101).reshape(-1, 1)
                y = 50 + 2 * X.flatten() + np.random.normal(0, 10, 100)

            self.model = LinearRegression()
            self.model.fit(X, y)
            
            self.save()
            return {"status": "trained", "accuracy": "linear_regression"}
        except Exception as e:
            print(f"Training error: {e}")
            return {"status": "error", "message": str(e)}

    def predict(self, days_ahead):
        if not self.model:
            self.load()
        
        # Simple prediction: Assume current time is max known day (or 100)
        # In real app, we'd track actual current date relative to model start
        last_step = 100 
        future_steps = np.arange(last_step + 1, last_step + 1 + days_ahead).reshape(-1, 1)
        
        predictions = self.model.predict(future_steps)
        return predictions.tolist()

    def save(self):
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)

    def load(self):
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
        else:
            self.train()
