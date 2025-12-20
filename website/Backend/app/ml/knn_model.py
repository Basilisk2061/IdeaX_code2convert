from sklearn.neighbors import KNeighborsClassifier
import numpy as np
import pickle
import os

class KNNPredictor:
    def __init__(self):
        self.model_path = "app/ml/saved_models/new_product_model.pkl"
        self.model = None
        self._ensure_directory()

    def _ensure_directory(self):
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)

    def train(self):
        # Dummy data
        X = np.random.rand(100, 4) * 100
        y = np.random.randint(0, 2, 100)

        self.model = KNeighborsClassifier(n_neighbors=3)
        self.model.fit(X, y)
        
        self.save()
        return {"status": "trained", "accuracy": "dummy_score"}

    def predict(self, features):
        if not self.model:
            self.load()
        
        prediction = self.model.predict(np.array([features]))
        probability = self.model.predict_proba(np.array([features]))
        
        return {
            "prediction": int(prediction[0]),
            "success_probability": float(probability[0][1])
        }

    def save(self):
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)

    def load(self):
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
        else:
            self.train()
