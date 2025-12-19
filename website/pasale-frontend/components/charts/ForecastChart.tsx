"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ForecastChartProps {
    currentRevenue: number;
    forecastRevenue: number;
    currentDemand: number;
    forecastDemand: number;
}

export function ForecastChart({ currentRevenue, forecastRevenue, currentDemand, forecastDemand }: ForecastChartProps) {
    const revenueData = [
        {
            name: 'Revenue',
            Current: currentRevenue,
            Forecast: forecastRevenue,
        }
    ];

    const demandData = [
        {
            name: 'Demand',
            Current: currentDemand,
            Forecast: forecastDemand,
        }
    ];

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
        <div className="grid grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Revenue Forecast (NPR)</h4>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="Current" fill="#64748b" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Forecast" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Demand Chart */}
            <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Demand Forecast (Units)</h4>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={demandData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="Current" fill="#64748b" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Forecast" fill="#a855f7" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
