"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOP_PRODUCTS, getProductTopDistricts } from "@/utils/mockData";

export default function RecommendationsPage() {
    // Get high-performing products by region
    const getRegionalOpportunities = () => {
        return TOP_PRODUCTS
            .filter(p => p.trend === "up" && p.sales > 2000)
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 4)
            .map(p => ({
                ...p,
                topRegions: getProductTopDistricts(p.id).slice(0, 3),
                marketPotential: p.sales > 5000 ? "Very High" : p.sales > 3000 ? "High" : "Medium"
            }));
    };

    // Product demand trends by category
    const getCategoryInsights = () => {
        const categoryData: Record<string, any> = {};
        TOP_PRODUCTS.forEach(p => {
            if (!categoryData[p.category]) {
                categoryData[p.category] = {
                    totalSales: 0,
                    avgPrice: 0,
                    count: 0,
                    trending: 0
                };
            }
            categoryData[p.category].totalSales += p.sales;
            categoryData[p.category].avgPrice += p.price;
            categoryData[p.category].count++;
            if (p.trend === "up") categoryData[p.category].trending++;
        });

        return Object.entries(categoryData)
            .map(([name, data]: [string, any]) => ({
                name,
                sales: data.totalSales,
                avgPrice: Math.round(data.avgPrice / data.count),
                products: data.count,
                trending: data.trending,
                marketStrength: data.trending / data.count > 0.5 ? "Strong" : data.trending / data.count > 0.2 ? "Growing" : "Stable"
            }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 4);
    };

    // Top growth opportunities
    const getTopOpportunities = () => {
        return TOP_PRODUCTS
            .filter(p => p.trend === "up")
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 3)
            .map(p => ({
                ...p,
                revenue: p.sales * p.price,
                growthRate: "+32%",
                dominance: "Market Leader"
            }));
    };

    const regionalOps = getRegionalOpportunities();
    const categoryInsights = getCategoryInsights();
    const topOpportunities = getTopOpportunities();

    const reports = [
        {
            title: "Monthly Performance Report",
            description: "Detailed analysis of sales, revenue trends, and top performing categories for the last 30 days",
            date: "Dec 1, 2025",
            size: "2.4 MB"
        },
        {
            title: "Q4 Sales Forecast",
            description: "AI-driven predictions for upcoming quarter demand and inventory requirements",
            date: "Nov 28, 2025",
            size: "1.8 MB"
        },
        {
            title: "Regional Market Strategy",
            description: "District-wise expansion opportunities and competitor analysis report",
            date: "Dec 5, 2025",
            size: "3.1 MB"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Market Recommendations</h1>
                        <p className="text-base text-slate-600 mt-1">Strategic insights for regional dominance</p>
                    </div>
                </div>

                {/* Top Growth Opportunities */}
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Top Growth Opportunities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {topOpportunities.map((item, idx) => (
                            <Card key={item.id} className="bg-white border-slate-200 hover:shadow-lg transition-all">
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${idx === 0 ? "bg-yellow-100 text-yellow-800" : "bg-indigo-100 text-indigo-800"
                                            }`}>
                                            #{idx + 1} Ranked
                                        </div>
                                        <span className="text-green-600 font-semibold text-sm bg-green-50 px-2 py-1 rounded">
                                            {item.growthRate}
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-slate-900">{item.name}</CardTitle>
                                    <p className="text-base text-slate-600">{item.category}</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase font-medium mb-1">Revenue</p>
                                            <p className="text-lg font-bold text-slate-800">NPR {(item.revenue / 1000).toFixed(1)}k</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-600 uppercase font-medium mb-1">Status</p>
                                            <p className="text-lg font-bold text-indigo-600">{item.dominance}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Regional Opportunities */}
                    <div className="lg:col-span-2 space-y-5">
                        <h2 className="text-xl font-bold text-slate-800">Regional Market Opportunities</h2>
                        {regionalOps.map((item) => (
                            <Card key={item.id} className="bg-white border-slate-200 hover:shadow-lg transition-all">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                                                <span className="px-2 py-0.5 rounded text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p className="text-base text-slate-600">High demand detected in:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.topRegions.map((region: any, i: number) => (
                                                    <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 text-base font-medium border border-slate-200">
                                                        {region.district}
                                                        <span className="text-indigo-600 font-semibold">{region.sales} units</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="min-w-[140px] p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                                            <p className="text-sm text-green-700 font-semibold uppercase mb-1">Market Potential</p>
                                            <p className="text-2xl font-bold text-green-700">{item.marketPotential}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Category Insights */}
                    <div className="space-y-5">
                        <h2 className="text-xl font-bold text-slate-800">Category Insights</h2>
                        <Card className="bg-white border-slate-200">
                            <CardContent className="p-0">
                                {categoryInsights.map((cat, idx) => (
                                    <div key={idx} className={`p-5 ${idx !== categoryInsights.length - 1 ? "border-b border-slate-200" : ""
                                        } hover:bg-slate-50 transition-colors`}>
                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="font-bold text-base text-slate-900">{cat.name}</h3>
                                            <span className={`text-sm px-2 py-1 rounded-full font-semibold ${cat.marketStrength === "Strong" ? "bg-green-50 text-green-700" :
                                                cat.marketStrength === "Growing" ? "bg-blue-50 text-blue-700" :
                                                    "bg-slate-100 text-slate-700"
                                                }`}>
                                                {cat.marketStrength}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-slate-600 uppercase font-medium mb-1">Volume</p>
                                                <p className="text-base font-bold text-slate-700">{cat.sales.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-600 uppercase font-medium mb-1">Avg Price</p>
                                                <p className="text-base font-bold text-slate-700">NPR {cat.avgPrice}</p>
                                            </div>
                                        </div>

                                        {cat.trending > 0 && (
                                            <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-indigo-600 font-medium">
                                                {cat.trending} products trending up
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Business Reports */}
                <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Business Reports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {reports.map((report, idx) => (
                            <Card key={idx} className="bg-white border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">📄</span>
                                        </div>
                                        <div className="text-sm font-medium px-2 py-1 bg-slate-100 rounded text-slate-600">
                                            PDF • {report.size}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900 mb-2">
                                        {report.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                                        {report.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="text-sm text-slate-500">
                                            {report.date}
                                        </div>
                                        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                                            Download
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
