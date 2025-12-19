"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TOP_PRODUCTS, mockPredictionApi } from "@/utils/mockData";
import { PriceImpactChart } from "@/components/charts/PriceImpactChart";

export default function AIPredictionsPage() {
    // State for Price Impact Simulator
    const [selectedProduct, setSelectedProduct] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [priceImpactResult, setPriceImpactResult] = useState<any>(null);

    // State for New Product Forecast
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [plannedPrice, setPlannedPrice] = useState('');
    const [newProductResult, setNewProductResult] = useState<any>(null);

    const handlePriceImpact = async () => {
        if (!selectedProduct || !newPrice) return;
        const result = await mockPredictionApi.predictPriceImpact(Number(selectedProduct), Number(newPrice));
        setPriceImpactResult(result);
    };

    const handleNewProduct = async () => {
        if (!category || !productName || !plannedPrice) return;
        const result = await mockPredictionApi.predictNewProduct(category, productName, Number(plannedPrice));
        setNewProductResult(result);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-6">

                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">AI Predictions</h1>
                        <p className="text-base text-slate-600 mt-1">Simulate price changes and forecast new product performance</p>
                    </div>
                </div>

                {/* Two Column Grid */}
                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Section 1: Price Impact Simulator */}
                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">1</span>
                                        <span className="text-xs font-semibold text-blue-600 uppercase">Price Impact</span>
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-slate-900">Adjust Existing Product Price</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">See how price changes affect revenue and demand</p>
                        </CardHeader>

                        <CardContent className="pt-6 space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="product-select" className="text-base font-medium text-slate-700">
                                    Select Product
                                </label>
                                <select
                                    id="product-select"
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-base text-slate-700 outline-none"
                                >
                                    <option value="">Choose a product</option>
                                    {TOP_PRODUCTS.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} (Current: NPR {p.price})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="new-price" className="text-base font-medium text-slate-700">
                                    New Price Target (NPR)
                                </label>
                                <Input
                                    id="new-price"
                                    type="number"
                                    placeholder="0.00"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    className="px-3 py-2.5 rounded-lg border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-base"
                                />
                            </div>

                            <Button
                                onClick={handlePriceImpact}
                                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base shadow-sm hover:shadow transition-all"
                            >
                                Simulate Impact
                            </Button>

                            {priceImpactResult && (
                                <div className="mt-5 space-y-4">
                                    {/* Impact Summary */}
                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base">Impact Analysis</h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div className="bg-white p-3 rounded-lg border border-slate-100">
                                                <p className="text-slate-600 text-xs mb-1">Current Revenue</p>
                                                <p className="font-bold text-slate-900">NPR {priceImpactResult.currentRevenue.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100">
                                                <p className="text-slate-600 text-xs mb-1">Predicted Revenue</p>
                                                <p className="font-bold text-indigo-600">NPR {priceImpactResult.predictedRevenue.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100">
                                                <p className="text-slate-600 text-xs mb-1">Current Quantity</p>
                                                <p className="font-bold text-slate-900">{priceImpactResult.currentquantity} units</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100">
                                                <p className="text-slate-600 text-xs mb-1">Predicted Quantity</p>
                                                <p className="font-bold text-indigo-600">{priceImpactResult.predictedQuantity} units</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Graph */}
                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base">Visual Comparison</h3>
                                        <PriceImpactChart
                                            currentRevenue={priceImpactResult.currentRevenue}
                                            predictedRevenue={priceImpactResult.predictedRevenue}
                                            currentQuantity={priceImpactResult.currentquantity}
                                            predictedQuantity={priceImpactResult.predictedQuantity}
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Section 2: New Product Forecast */}
                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">2</span>
                                        <span className="text-xs font-semibold text-purple-600 uppercase">New Product</span>
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-slate-900">Launch New Product</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">Estimate first-month sales for a new SKU</p>
                        </CardHeader>

                        <CardContent className="pt-6 space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="category-select" className="text-sm font-medium text-slate-700">
                                    Category
                                </label>
                                <select
                                    id="category-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base text-slate-700 outline-none"
                                >
                                    <option value="">Choose a category</option>
                                    <option value="Apparel">Apparel</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Home & Kitchen">Home & Kitchen</option>
                                    <option value="Personal Care">Personal Care</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="product-name" className="text-sm font-medium text-slate-700">
                                    Product Name
                                </label>
                                <Input
                                    id="product-name"
                                    type="text"
                                    placeholder="e.g., Summer Linen Shirt"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="px-3 py-2.5 rounded-lg border-slate-200 hover:border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="planned-price" className="text-sm font-medium text-slate-700">
                                    Planned Price (NPR)
                                </label>
                                <Input
                                    id="planned-price"
                                    type="number"
                                    placeholder="45.00"
                                    value={plannedPrice}
                                    onChange={(e) => setPlannedPrice(e.target.value)}
                                    className="px-3 py-2.5 rounded-lg border-slate-200 hover:border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm"
                                />
                            </div>

                            <Button
                                onClick={handleNewProduct}
                                className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium text-base shadow-sm hover:shadow transition-all"
                            >
                                Predict Performance
                            </Button>

                            {newProductResult && (
                                <div className="mt-5 space-y-4">
                                    {/* Forecast Summary */}
                                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base">Forecast Summary</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="bg-white p-3 rounded-lg border border-slate-100">
                                                <p className="text-slate-600 text-xs mb-1">Predicted First-Month Sales</p>
                                                <p className="font-bold text-purple-600 text-lg">{newProductResult.predictedSales} units</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100">
                                                <p className="text-slate-600 text-xs mb-1">Your Planned Price</p>
                                                <p className="font-bold text-slate-900">NPR {Number(plannedPrice).toFixed(2)}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100">
                                                <p className="text-slate-600 text-xs mb-1">AI Suggested Price</p>
                                                <p className="font-bold text-purple-600">NPR {newProductResult.suggestedPrice.toFixed(2)}</p>
                                            </div>

                                            {/* Price Recommendation */}
                                            {(() => {
                                                const priceDiff = newProductResult.suggestedPrice - Number(plannedPrice);
                                                const isDifferent = Math.abs(priceDiff) > 0.01;

                                                if (isDifferent) {
                                                    const isHigher = priceDiff > 0;
                                                    return (
                                                        <div className={`p-3 rounded-lg border ${isHigher ? 'border-amber-200 bg-amber-50' : 'border-blue-200 bg-blue-50'}`}>
                                                            <p className="text-xs font-semibold text-slate-900 mb-1">Pricing Recommendation</p>
                                                            <p className={`text-xs ${isHigher ? 'text-amber-700' : 'text-blue-700'}`}>
                                                                {isHigher
                                                                    ? `Consider increasing price by NPR ${priceDiff.toFixed(2)} for optimal revenue`
                                                                    : `Price is NPR ${Math.abs(priceDiff).toFixed(2)} higher than suggested - may impact sales volume`
                                                                }
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                                                        <p className="text-xs font-semibold text-green-700">Your price aligns with AI recommendations</p>
                                                    </div>
                                                );
                                            })()}

                                            {/* Related Products */}
                                            {newProductResult.similarItems && newProductResult.similarItems.length > 0 && (
                                                <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200">
                                                    <h4 className="font-semibold text-slate-900 mb-2 text-xs">Related Products in {category}</h4>
                                                    <div className="space-y-2">
                                                        {newProductResult.similarItems.map((item: any) => (
                                                            <div key={item.id} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                                                                <div>
                                                                    <p className="text-xs font-semibold text-slate-900">{item.name}</p>
                                                                    <p className="text-xs text-slate-600">Price: NPR {item.price}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-xs font-bold text-slate-900">{item.sales.toLocaleString()}</p>
                                                                    <p className="text-xs text-slate-500">units sold</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
