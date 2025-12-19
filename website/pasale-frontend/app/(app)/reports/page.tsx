"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Brain, TrendingUp, ShoppingBag, Award } from "lucide-react";

export default function ReportsPage() {
    const reports = [
        {
            title: "AI Analysis",
            filename: "ai_analysis.pdf",
            icon: Brain,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
            type: "PDF"
        },
        {
            title: "Revenue Forecasting",
            filename: "revenue_forecast.csv",
            icon: TrendingUp,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            type: "CSV"
        },
        {
            title: "Total Sales",
            filename: "total_sales_report.csv",
            icon: FileText,
            color: "text-green-600",
            bgColor: "bg-green-100",
            type: "CSV"
        },
        {
            title: "Product List",
            filename: "product_inventory.csv",
            icon: ShoppingBag,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            type: "CSV"
        },
        {
            title: "Top Selling Products",
            filename: "top_selling_products.pdf",
            icon: Award,
            color: "text-rose-600",
            bgColor: "bg-rose-100",
            type: "PDF"
        }
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports</h1>

            <div className="grid gap-4">
                {reports.map((report, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center gap-5">
                            <div className={`h-12 w-12 rounded-lg ${report.bgColor} flex items-center justify-center`}>
                                <report.icon className={`h-6 w-6 ${report.color}`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {report.title}
                                </h3>
                                <p className="text-sm text-gray-400 font-mono mt-0.5">{report.filename}</p>
                            </div>
                        </div>

                        <Button className="gap-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 shadow-sm">
                            <Download className="h-4 w-4" />
                            Download
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
