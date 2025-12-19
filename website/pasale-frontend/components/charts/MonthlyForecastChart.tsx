"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MonthlyForecastChartProps {
    title: string;
    data: Array<{
        month: string;
        current: number;
        forecast: number;
    }>;
    dataKey1Label: string;
    dataKey2Label: string;
    yAxisLabel: string;
}

export function MonthlyForecastChart({ title, data, dataKey1Label, dataKey2Label, yAxisLabel }: MonthlyForecastChartProps) {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-xs" style={{ color: entry.color }}>
                            {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        stroke="#64748b"
                    />
                    <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#64748b"
                        label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line
                        type="monotone"
                        dataKey="current"
                        name={dataKey1Label}
                        stroke="#64748b"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="forecast"
                        name={dataKey2Label}
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
