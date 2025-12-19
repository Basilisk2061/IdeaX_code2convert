"use client"
import React from 'react';
import { Tooltip, ResponsiveContainer, XAxis, YAxis, ScatterChart, Scatter, Cell, ZAxis } from 'recharts';

// Mock Data: Sales Volume per Week vs Day
const data = [
    // Week 1
    { week: 'Week 1', day: 'Mon', value: 120 },
    { week: 'Week 1', day: 'Tue', value: 140 },
    { week: 'Week 1', day: 'Wed', value: 160 },
    { week: 'Week 1', day: 'Thu', value: 130 },
    { week: 'Week 1', day: 'Fri', value: 200 },
    { week: 'Week 1', day: 'Sat', value: 250 },
    { week: 'Week 1', day: 'Sun', value: 180 },
    // Week 2
    { week: 'Week 2', day: 'Mon', value: 130 },
    { week: 'Week 2', day: 'Tue', value: 150 },
    { week: 'Week 2', day: 'Wed', value: 170 },
    { week: 'Week 2', day: 'Thu', value: 140 },
    { week: 'Week 2', day: 'Fri', value: 220 },
    { week: 'Week 2', day: 'Sat', value: 280 },
    { week: 'Week 2', day: 'Sun', value: 190 },
    // Week 3
    { week: 'Week 3', day: 'Mon', value: 110 },
    { week: 'Week 3', day: 'Tue', value: 130 },
    { week: 'Week 3', day: 'Wed', value: 150 },
    { week: 'Week 3', day: 'Thu', value: 120 },
    { week: 'Week 3', day: 'Fri', value: 180 },
    { week: 'Week 3', day: 'Sat', value: 230 },
    { week: 'Week 3', day: 'Sun', value: 160 },
    // Week 4
    { week: 'Week 4', day: 'Mon', value: 140 },
    { week: 'Week 4', day: 'Tue', value: 160 },
    { week: 'Week 4', day: 'Wed', value: 180 },
    { week: 'Week 4', day: 'Thu', value: 150 },
    { week: 'Week 4', day: 'Fri', value: 240 },
    { week: 'Week 4', day: 'Sat', value: 300 },
    { week: 'Week 4', day: 'Sun', value: 200 },
];

export function SalesHeatmapChart() {
    // Find peak sales
    const peak = data.reduce((max, current) => (current.value > max.value ? current : max), data[0]);

    return (
        <div className="w-full">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <XAxis
                            dataKey="week"
                            type="category"
                            allowDuplicatedCategory={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 12 }}
                            name="Week"
                        />
                        <YAxis
                            dataKey="day"
                            type="category"
                            allowDuplicatedCategory={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 12 }}
                            name="Day"
                        />
                        <ZAxis type="number" dataKey="value" range={[50, 500]} name="Sales" />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white/95 backdrop-blur-sm p-3 border border-indigo-100 rounded-xl shadow-lg text-xs">
                                            <p className="font-semibold text-slate-700 mb-1">{data.week} - {data.day}</p>
                                            <p className="text-slate-500">Total product: <span className="font-bold text-indigo-600 text-sm">48</span></p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter data={data} shape="circle">
                            {data.map((entry, index) => {
                                // Dynamic color intensity based on value relative to max (300)
                                const opacity = 0.2 + (entry.value / 300) * 0.8;
                                return <Cell key={`cell-${index}`} fill={`rgba(99, 102, 241, ${opacity})`} stroke="none" />;
                            })}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-indigo-50/50 rounded-lg border border-indigo-100 flex items-center justify-center text-center">
                <p className="text-sm text-slate-700">
                    Highest performance in <span className="font-bold text-indigo-700">{peak.week}</span> on <span className="font-bold text-indigo-700">{peak.day}</span>.
                </p>
            </div>
        </div>
    );
}
