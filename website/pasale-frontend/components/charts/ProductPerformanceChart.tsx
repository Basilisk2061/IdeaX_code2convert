"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TOP_PRODUCTS } from "@/utils/mockData";

export function ProductPerformanceChart() {
    const data = TOP_PRODUCTS.map(p => ({
        name: p.name.split(" ").slice(0, 2).join(" "), // Shorten name
        sales: p.sales
    }));

    const COLORS = ['#6366f1', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#818cf8'];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={120}
                        tick={{ fill: '#64748B', fontSize: 13 }}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '8px', border: 'none' }}
                    />
                    <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
