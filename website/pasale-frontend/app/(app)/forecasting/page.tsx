"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOP_PRODUCTS } from "@/utils/mockData";
import { ForecastChart } from "@/components/charts/ForecastChart";
import { MonthlyForecastChart } from "@/components/charts/MonthlyForecastChart";

export default function AIForecastingPage() {
    // Generate forecast data for all products
    const generateRevenueForecast = () => {
        return TOP_PRODUCTS.map(product => {
            const currentRevenue = product.sales * product.price;
            const growthRate = product.trend === "up" ? 0.15 : product.trend === "down" ? -0.08 : 0.03;
            const forecastRevenue = Math.round(currentRevenue * (1 + growthRate));

            return {
                ...product,
                currentRevenue,
                forecastRevenue,
                growthRate,
                trend: forecastRevenue > currentRevenue ? "up" : forecastRevenue < currentRevenue ? "down" : "stable"
            };
        }).sort((a, b) => b.forecastRevenue - a.forecastRevenue).slice(0, 10);
    };

    const generateDemandForecast = () => {
        return TOP_PRODUCTS.map(product => {
            const forecastMultiplier = product.trend === "up" ? 1.2 : product.trend === "down" ? 0.85 : 1.05;
            const forecastDemand = Math.round(product.sales * forecastMultiplier);
            const demandChange = forecastDemand - product.sales;

            return {
                ...product,
                currentDemand: product.sales,
                forecastDemand,
                demandChange,
                changePercent: Math.round((demandChange / product.sales) * 100)
            };
        }).sort((a, b) => b.forecastDemand - a.forecastDemand).slice(0, 10);
    };

    const revenueForecast = generateRevenueForecast();
    const demandForecast = generateDemandForecast();

    // Calculate overall stats FIRST
    const totalCurrentRevenue = revenueForecast.reduce((sum, p) => sum + p.currentRevenue, 0);
    const totalForecastRevenue = revenueForecast.reduce((sum, p) => sum + p.forecastRevenue, 0);
    const totalCurrentDemand = demandForecast.reduce((sum, p) => sum + p.currentDemand, 0);
    const totalForecastDemand = demandForecast.reduce((sum, p) => sum + p.forecastDemand, 0);

    // Generate monthly forecast data
    const generateMonthlyRevenueForecast = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map((month, index) => {
            const baseRevenue = totalCurrentRevenue / 12;
            const seasonalFactor = 1 + Math.sin((index / 12) * Math.PI * 2) * 0.15;
            const growthFactor = 1 + (index / 12) * 0.08;
            return {
                month,
                current: Math.round(baseRevenue * seasonalFactor),
                forecast: Math.round(baseRevenue * seasonalFactor * growthFactor)
            };
        });
    };

    const generateMonthlyDemandForecast = () => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map((month, index) => {
            const baseDemand = totalCurrentDemand / 12;
            const seasonalFactor = 1 + Math.sin((index / 12) * Math.PI * 2) * 0.12;
            const growthFactor = 1 + (index / 12) * 0.06;
            return {
                month,
                current: Math.round(baseDemand * seasonalFactor),
                forecast: Math.round(baseDemand * seasonalFactor * growthFactor)
            };
        });
    };

    const monthlyRevenueData = generateMonthlyRevenueForecast();
    const monthlyDemandData = generateMonthlyDemandForecast();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-6">

                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">AI Forecasting</h1>
                        <p className="text-base text-slate-600 mt-1">Revenue and demand predictions for all products</p>
                    </div>
                </div>

                {/* Monthly Forecast Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-semibold text-slate-900">Monthly Revenue Forecast</CardTitle>
                            <p className="text-sm text-slate-600 mt-1">Revenue trends over 12 months</p>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <MonthlyForecastChart
                                title=""
                                data={monthlyRevenueData}
                                dataKey1Label="Current Revenue"
                                dataKey2Label="Forecast Revenue"
                                yAxisLabel="Revenue (NPR)"
                            />
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <CardTitle className="text-lg font-semibold text-slate-900">Monthly Demand Forecast</CardTitle>
                            <p className="text-sm text-slate-600 mt-1">Demand trends over 12 months</p>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <MonthlyForecastChart
                                title=""
                                data={monthlyDemandData}
                                dataKey1Label="Current Demand"
                                dataKey2Label="Forecast Demand"
                                yAxisLabel="Units Sold"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Forecasts Grid */}
                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Revenue Forecast */}
                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">30-Day Forecast</span>
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-slate-900">Revenue Forecast</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">Top 10 products by predicted revenue</p>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <div className="space-y-3">
                                {revenueForecast.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                                                        {index + 1}
                                                    </span>
                                                    <h3 className="font-semibold text-slate-900 text-base">{product.name}</h3>
                                                </div>
                                                <p className="text-sm text-slate-600">{product.category}</p>
                                            </div>
                                            <div className={`flex items-center gap-1 px-2 py-1 rounded ${product.trend === "up" ? "bg-green-100 text-green-700" :
                                                product.trend === "down" ? "bg-red-100 text-red-700" :
                                                    "bg-slate-100 text-slate-700"
                                                }`}>
                                                <span className="text-sm font-semibold">
                                                    {product.trend === "up" ? "+" : product.trend === "down" ? "-" : ""}{Math.abs(Math.round(product.growthRate * 100))}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white p-3 rounded border border-slate-100">
                                                <p className="text-xs text-slate-600 mb-1">Current</p>
                                                <p className="text-sm font-bold text-slate-900">NPR {product.currentRevenue.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-white p-3 rounded border border-slate-100">
                                                <p className="text-xs text-slate-600 mb-1">Forecast</p>
                                                <p className="text-sm font-bold text-green-700">NPR {product.forecastRevenue.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Demand Forecast */}
                    <Card className="bg-white border-slate-200">
                        <CardHeader className="border-b border-slate-100 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded">30-Day Forecast</span>
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-slate-900">Product Demand</CardTitle>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-2">Top 10 products by predicted demand</p>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <div className="space-y-3">
                                {demandForecast.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                                                        {index + 1}
                                                    </span>
                                                    <h3 className="font-semibold text-slate-900 text-base">{product.name}</h3>
                                                </div>
                                                <p className="text-sm text-slate-600">{product.category}</p>
                                            </div>
                                            <div className={`flex items-center gap-1 px-2 py-1 rounded ${product.changePercent > 0 ? "bg-green-100 text-green-700" :
                                                product.changePercent < 0 ? "bg-red-100 text-red-700" :
                                                    "bg-slate-100 text-slate-700"
                                                }`}>
                                                <span className="text-sm font-semibold">
                                                    {product.changePercent > 0 ? "+" : ""}{Math.abs(product.changePercent)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white p-3 rounded border border-slate-100">
                                                <p className="text-xs text-slate-600 mb-1">Current</p>
                                                <p className="text-sm font-bold text-slate-900">{product.currentDemand.toLocaleString()} units</p>
                                            </div>
                                            <div className="bg-white p-3 rounded border border-slate-100">
                                                <p className="text-xs text-slate-600 mb-1">Forecast</p>
                                                <p className="text-sm font-bold text-purple-700">{product.forecastDemand.toLocaleString()} units</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Forecast Info */}
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <p className="font-semibold text-slate-900 text-base">Forecast Period: Next 30 Days</p>
                            <p className="text-sm text-slate-600 mt-1">
                                Predictions based on historical sales trends, seasonality, and market analysis
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
