"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NEPAL_DISTRICTS, getDistrictTopProducts } from '@/utils/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function RegionalTopProducts() {
    const [selectedDistrict, setSelectedDistrict] = useState<string>("Kathmandu");
    const topProducts = getDistrictTopProducts(selectedDistrict);

    return (
        <Card className="bg-white border-slate-200 h-full">
            <CardHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-semibold text-slate-900">Regional Market Analysis</CardTitle>
                        <p className="text-sm text-slate-600 mt-1">Top selling products by district</p>
                    </div>
                    <div className="w-[180px]">
                        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                            <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Select District" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                {NEPAL_DISTRICTS.map((district) => (
                                    <SelectItem key={district} value={district}>
                                        {district}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-3">
                    {topProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 flex-shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-slate-900 text-base truncate">{product.name}</div>
                                    <div className="text-sm text-slate-600 mt-0.5">{product.category}</div>
                                </div>
                            </div>
                            <div className="text-right ml-4">
                                <div className="font-bold text-slate-900 text-base">{product.sales.toLocaleString()}</div>
                                <div className="text-sm text-slate-600">units sold</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
