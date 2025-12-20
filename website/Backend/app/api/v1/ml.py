from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.ml.xgboost_model import XGBoostPredictor
from app.ml.knn_model import KNNPredictor
from app.ml.forecasting_model import ForecastingPredictor

router = APIRouter()

# Initialize models
xgb_predictor = XGBoostPredictor()
knn_predictor = KNNPredictor()
forecast_predictor = ForecastingPredictor()

class PriceImpactRequest(BaseModel):
    features: List[float]

class NewProductRequest(BaseModel):
    features: List[float]

class ForecastRequest(BaseModel):
    days_ahead: int

@router.post("/train")
def train_models():
    """
    Trigger training for all models and save them.
    """
    try:
        xgb_status = xgb_predictor.train()
        knn_status = knn_predictor.train()
        forecast_status = forecast_predictor.train()
        return {
            "message": "All models trained successfully",
            "xgboost": xgb_status,
            "knn": knn_status,
            "forecasting": forecast_status
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/price-impact")
def predict_price_impact(request: PriceImpactRequest):
    try:
        result = xgb_predictor.predict(request.features)
        return {"price_impact_score": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/new-product")
def predict_new_product(request: NewProductRequest):
    try:
        result = knn_predictor.predict(request.features)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict/forecast")
def predict_forecast(request: ForecastRequest):
    try:
        result = forecast_predictor.predict(request.days_ahead)
        return {"forecast": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
