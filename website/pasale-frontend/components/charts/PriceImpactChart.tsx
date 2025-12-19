"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PriceImpactChartProps {
    currentRevenue: number;
    predictedRevenue: number;
    currentQuantity: number;
    predictedQuantity: number;
}

export function PriceImpactChart({
    currentRevenue,
    predictedRevenue,
    currentQuantity,
    predictedQuantity
}: PriceImpactChartProps) {
    const data = [
        {
            metric: 'Revenue (NPR)',
            Current: currentRevenue,
            Predicted: predictedRevenue,
        },
        {
            metric: 'Quantity',
            Current: currentQuantity,
            Predicted: predictedQuantity,
        },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-2">{payload[0].payload.metric}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-slate-600">{entry.name}:</span>
                            <span className="font-bold text-slate-900">
                                {entry.payload.metric.includes('Revenue')
                                    ? `NPR ${entry.value.toLocaleString()}`
                                    : `${entry.value} units`}
                            </span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 10,
                    }}
                    barGap={8}
                >
                    <defs>
                        <linearGradient id="currentBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.7} />
                        </linearGradient>
                        <linearGradient id="predictedBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0.7} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                        dataKey="metric"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} />
                    <Legend
                        wrapperStyle={{ fontSize: '13px', fontWeight: 600 }}
                        iconType="circle"
                    />
                    <Bar
                        dataKey="Current"
                        fill="url(#currentBar)"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={60}
                    />
                    <Bar
                        dataKey="Predicted"
                        fill="url(#predictedBar)"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={60}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
