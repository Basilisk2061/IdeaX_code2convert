import { RegionalTopProducts } from "@/components/dashboard/RegionalTopProducts";
import { RevenueByCategoryChart } from "@/components/charts/RevenueByCategoryChart";
import { SalesHeatmapChart } from "@/components/charts/SalesHeatmapChart";
import { TOP_PRODUCTS, SLOW_MOVING_ITEMS } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function DashboardPage() {
    const stats = [
        {
            label: "Total Revenue",
            value: "NPR 45,231.89",
            change: "+20.1%",
            period: "vs last month",
            positive: true
        },
        {
            label: "Transactions",
            value: "2,350",
            change: "+180.1%",
            period: "vs last month",
            positive: true
        },
        {
            label: "Active Products",
            value: "48",
            change: "+19%",
            period: "vs last month",
            positive: true
        },

    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-6">

                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                        <p className="text-base text-slate-600 mt-1">Real-time business metrics and insights</p>
                    </div>
                    <div className="text-right">
                        <div className="text-base font-medium text-slate-900">Last updated</div>
                        <div className="text-sm text-slate-500">2 minutes ago</div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-200"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="text-base font-medium text-slate-600 mb-2">{stat.label}</div>
                                    <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                                            {stat.change}
                                        </span>
                                        <span className="text-sm text-slate-500">{stat.period}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Regional Analysis */}
                    <div className="lg:col-span-2">
                        <RegionalTopProducts />
                    </div>

                    {/* Revenue by Category */}
                    <div className="lg:col-span-1">
                        <Card className="bg-white border-slate-200 h-full">
                            <CardHeader className="border-b border-slate-100 pb-4">
                                <CardTitle className="text-lg font-semibold text-slate-900">Revenue Distribution</CardTitle>
                                <p className="text-sm text-slate-600 mt-1">By product category</p>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <RevenueByCategoryChart />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Best Selling Products */}
                <Card className="bg-white border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-slate-900">Best Selling Products</CardTitle>
                                <p className="text-sm text-slate-600 mt-1">Top 5 by sales volume</p>
                            </div>
                            <Link href="/products" className="text-base font-medium text-indigo-600 hover:text-indigo-700">
                                View all
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                            {TOP_PRODUCTS.slice(0, 5).map((product, index) => (
                                <Link href={`/products/${product.id}`} key={product.id}>
                                    <div className="group bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg p-4 transition-all duration-200 cursor-pointer">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base font-semibold text-slate-900 mb-1 line-clamp-2">{product.name}</div>
                                            <div className="text-sm text-slate-600">{product.sales.toLocaleString()} units</div>
                                            <div className="text-sm text-slate-500 mt-1">{product.category}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Sales Heatmap */}
                <Card className="bg-white border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg font-semibold text-slate-900">Sales Activity</CardTitle>
                        <p className="text-sm text-slate-600 mt-1">Weekly performance heatmap</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <SalesHeatmapChart />
                    </CardContent>
                </Card>

                {/* Slow Moving Products */}
                <Card className="bg-white border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold text-slate-900">Inventory Alerts</CardTitle>
                                <p className="text-sm text-slate-600 mt-1">Slow moving items requiring attention</p>
                            </div>
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                                {SLOW_MOVING_ITEMS.length} items
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-3">
                            {SLOW_MOVING_ITEMS.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg hover:border-amber-300 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="font-semibold text-slate-900 text-sm">{item.name}</div>
                                        <div className="text-xs text-slate-600 mt-0.5">{item.category}</div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <div className="text-sm font-bold text-amber-700">{item.daysInStock} days</div>
                                        <div className="text-xs text-slate-600">in stock</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
