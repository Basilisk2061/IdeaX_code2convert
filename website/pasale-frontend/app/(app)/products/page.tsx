"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOP_PRODUCTS } from '@/utils/mockData';

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = new Set(TOP_PRODUCTS.map(p => p.category));
        return ["All", ...Array.from(cats).sort()];
    }, []);

    // Filter products
    const filteredProducts = useMemo(() => {
        return TOP_PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Product Insights</h1>
                        <p className="text-base text-slate-600 mt-1">Check insights of all products</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative w-full sm:w-[300px]">
                            <Input
                                placeholder="Search products..."
                                className="bg-white h-11 text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-white h-11 text-base">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map(category => (
                                    <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <Card className="bg-white border-slate-200 h-full hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl font-bold text-indigo-600">{product.name.charAt(0)}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-1 mb-3">
                                        <h3 className="font-semibold text-base text-slate-900 line-clamp-2" title={product.name}>{product.name}</h3>
                                        <p className="text-sm text-slate-600 font-medium uppercase tracking-wide">{product.category}</p>
                                    </div>
                                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-sm text-slate-600">Price</p>
                                            <p className="font-bold text-lg text-slate-900">NPR {product.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-slate-600">Sales</p>
                                            <p className="font-semibold text-base text-slate-700">{product.sales.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* No Results */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                            <span className="text-3xl">🔍</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No products found</h3>
                        <p className="text-base text-slate-600 mt-1">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
