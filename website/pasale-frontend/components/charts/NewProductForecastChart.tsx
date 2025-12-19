"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface NewProductForecastChartProps {
    predictedSales: number;
    suggestedPrice: number;
    plannedPrice: number;
}

export function NewProductForecastChart({
    predictedSales,
    suggestedPrice,
    plannedPrice
}: NewProductForecastChartProps) {
    const data = [
        {
            metric: 'Predicted Sales',
            value: predictedSales,
            unit: 'units',
            color: '#a855f7',
        },
        {
            metric: 'Planned Price',
            value: plannedPrice,
            unit: 'NPR',
            color: '#94a3b8',
        },
        {
            metric: 'Suggested Price',
            value: suggestedPrice,
            unit: 'NPR',
            color: '#ec4899',
        },
    ];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-2">{item.metric}</p>
                    <p className="text-lg font-bold" style={{ color: item.color }}>
                        {item.unit === 'NPR'
                            ? `NPR ${item.value.toFixed(2)}`
                            : `${item.value} ${item.unit}`}
                    </p>
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
                >
                    <defs>
                        <linearGradient id="purpleBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#c084fc" stopOpacity={0.7} />
                        </linearGradient>
                        <linearGradient id="grayBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0.7} />
                        </linearGradient>
                        <linearGradient id="pinkBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ec4899" stopOpacity={0.9} />
                            <stop offset="95%" stopColor="#f472b6" stopOpacity={0.7} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis
                        dataKey="metric"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
                        interval={0}
                        height={60}
                        angle={-15}
                        textAnchor="end"
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168, 85, 247, 0.05)' }} />
                    <Bar
                        dataKey="value"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={80}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    index === 0 ? 'url(#purpleBar)' :
                                        index === 1 ? 'url(#grayBar)' :
                                            'url(#pinkBar)'
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
