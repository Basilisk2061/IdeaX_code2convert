"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const KIRAN_STORE_CATEGORIES = [
    { name: "Grains & Pulses", value: 12500, color: "#4F46E5", percentage: 35 },
    { name: "Snacks", value: 8400, color: "#06B6D4", percentage: 22 },
    { name: "Fruits & Vegetables", value: 6200, color: "#10B981", percentage: 18 },
    { name: "Personal Care", value: 4500, color: "#F59E0B", percentage: 12 },
    { name: "Household", value: 3100, color: "#EC4899", percentage: 8 },
    { name: "Dairy", value: 1800, color: "#8B5CF6", percentage: 5 },
];

export function RevenueByCategoryChart() {
    return (
        <div className="w-full">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={KIRAN_STORE_CATEGORIES}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.percent ? (entry.percent * 100).toFixed(0) : 0}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {KIRAN_STORE_CATEGORIES.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white/95 backdrop-blur-sm p-3 border border-slate-200 rounded-xl shadow-lg">
                                            <p className="font-semibold text-slate-800">{data.name}</p>
                                            <p className="text-sm text-slate-600">NPR {data.value.toLocaleString()}</p>
                                            <p className="text-xs text-slate-500">{data.percentage}%</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
                {KIRAN_STORE_CATEGORIES.map((category) => (
                    <div key={category.name} className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm font-medium text-slate-700">{category.name}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">NPR {category.value.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">{category.percentage}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
