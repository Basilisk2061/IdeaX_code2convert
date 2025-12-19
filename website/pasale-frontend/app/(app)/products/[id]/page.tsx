"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TOP_PRODUCTS, SALES_DATA, getProductTopDistricts } from "@/utils/mockData";
import { ArrowLeft, Package, DollarSign, TrendingUp, BarChart, Tag, AlertCircle, Snowflake, Sun, MapPin } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Cell } from 'recharts';

export default function ProductDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (params?.id) {
            setReady(true);
        }
    }, [params]);

    if (!ready) {
        return <div className="p-8 flex items-center justify-center text-muted-foreground">Loading product details...</div>
    }

    const id = Number(params.id);
    const product = TOP_PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                <h2 className="text-2xl font-bold text-muted-foreground">Product Not Found</h2>
                <p className="text-sm text-muted-foreground">Could not find product with ID: {params.id}</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 container mx-auto max-w-6xl animate-in fade-in duration-500">
            <Button variant="ghost" onClick={() => router.back()} className="hover:bg-transparent pl-0 gap-2 mb-2">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">{product.category}</span>
                        {product.trend === 'up' && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Trending</span>}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">{product.name}</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        High-quality {product.category.toLowerCase()} item. Currently performing well in the localized market with steady sales velocity.
                    </p>
                </div>
                <div className="text-left md:text-right bg-white/50 p-4 rounded-xl border border-white/60 shadow-sm backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide font-medium">Current Price</p>
                    <p className="text-4xl font-extrabold text-slate-900">${product.price.toFixed(2)}</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="glass-card transform hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Sales</CardTitle>
                        <Package className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{product.sales.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">units sold lifetime</p>
                    </CardContent>
                </Card>
                <Card className="glass-card transform hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Est. Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">${(product.price * product.sales).toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">gross revenue generated</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Sales Trend</CardTitle>
                    <CardDescription>6-Month performance history for {product.name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={SALES_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 13 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 13 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorProd)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Monthly Insights */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Monthly Insights</CardTitle>
                        <CardDescription>Average monthly performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={[
                                    { name: 'Avg', value: product.sales / 12 },
                                    { name: 'Peak', value: product.sales / 8 }, // Mock peak
                                    { name: 'Low', value: product.sales / 15 }, // Mock low
                                ]}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 8 }} />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                                        <Cell fill="#94a3b8" />
                                        <Cell fill="#6366f1" />
                                        <Cell fill="#cbd5e1" />
                                    </Bar>
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-2">Peak performance observed in holiday months.</p>
                    </CardContent>
                </Card>

                {/* Seasonal Insights */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Seasonal Analysis</CardTitle>
                        <CardDescription>Best performing seasons</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-4 pt-4">
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                                <Sun className="h-8 w-8 text-orange-500 mb-2" />
                                <span className="font-bold text-slate-700">Summer</span>
                                <span className="text-xs text-muted-foreground">+12% Uplift</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl border border-blue-100 opacity-50 grayscale">
                                <Snowflake className="h-8 w-8 text-blue-500 mb-2" />
                                <span className="font-bold text-slate-700">Winter</span>
                                <span className="text-xs text-muted-foreground">-5% Dip</span>
                            </div>
                        </div>
                        <p className="text-sm text-center text-muted-foreground max-w-xs">
                            This product shows strong correlation with warmer weather. Stock up in Q2 to maximize revenue.
                        </p>
                    </CardContent>
                </Card>

                {/* Regional Analysis */}
                <Card className="glass-card md:col-span-2">
                    <CardHeader>
                        <CardTitle>Top Performing Regions</CardTitle>
                        <CardDescription>Highest sales volume by district</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {getProductTopDistricts(product.id).map((region, i) => (
                                <div key={i} className="flex flex-col items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-xs font-semibold text-muted-foreground uppercase mb-1">Rank #{i + 1}</span>
                                    <MapPin className="h-5 w-5 text-indigo-500 mb-1" />
                                    <span className="font-bold text-slate-800 text-sm text-center">{region.district}</span>
                                    <span className="text-xs text-indigo-600 font-medium">{region.sales} units</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
