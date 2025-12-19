import { Bell } from "lucide-react";

export function Topbar() {
    return (
        <header className="flex h-20 items-center justify-between border-b border-white/30 bg-gradient-to-r from-white/60 via-white/70 to-white/60 backdrop-blur-2xl px-8 shadow-lg relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

            <div className="flex-1 flex items-center justify-center relative z-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-wide">
                        <span className="text-slate-800">पसले </span>
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Business </span>
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Insight</span>
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-1">Analytics Dashboard</p>
                </div>
            </div>

            <div className="flex items-center gap-6 relative z-10">
                <button className="relative p-2.5 text-slate-600 hover:text-indigo-600 transition-colors duration-300 group">
                    <div className="absolute inset-0 bg-indigo-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Bell className="h-5 w-5 relative z-10" />
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-gradient-to-br from-red-500 to-pink-500 ring-2 ring-white shadow-lg animate-pulse" />
                </button>

                <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-white/60">
                    <div className="text-right">
                        <p className="text-sm font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Ananda Rimal</p>
                        <p className="text-xs text-indigo-600 font-semibold">पसले Insight</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg flex items-center justify-center text-white font-bold text-sm ring-2 ring-white">
                        AR
                    </div>
                </div>
            </div>
        </header>
    );
}
