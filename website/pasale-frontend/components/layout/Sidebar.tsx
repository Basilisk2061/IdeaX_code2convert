"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LineChart, Settings, ShoppingBag, LogOut, TrendingUp, Lightbulb, ChevronRight, FileText } from "lucide-react";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Predictions", href: "/predictions", icon: LineChart },
    { name: "AI Forecasting", href: "/forecasting", icon: TrendingUp },
    { name: "Recommendations", href: "/recommendations", icon: Lightbulb },
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "Reports", href: "/reports", icon: FileText },

];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-72 flex-col justify-between border-r border-slate-200/60 bg-white relative overflow-hidden shadow-xl">
            {/* Elegant gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 pointer-events-none" />

            {/* Subtle animated gradient orb */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

            <div className="relative z-10 flex flex-col h-full">
                {/* Logo Section */}
                <div className="px-6 pt-8 pb-6 border-b border-slate-100">
                    <Link href="/dashboard" className="flex items-center gap-3 group cursor-pointer">
                        {/* <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-lg ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all duration-300 group-hover:scale-105">
                            <Image
                                src="/pasale.jpg"
                                alt="Pasale Logo"
                                fill
                                sizes="48px"
                                className="object-cover"
                                priority
                            />
                        </div> */}
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                                पसले
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                                Business Intelligence
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-3">
                        Main Menu
                    </div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group relative",
                                    isActive
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                )}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                )}

                                {/* Icon container */}
                                <div className={cn(
                                    "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300",
                                    isActive
                                        ? "bg-white/20"
                                        : "bg-slate-100 group-hover:bg-indigo-100"
                                )}>
                                    <Icon className={cn(
                                        "h-5 w-5 transition-all duration-300",
                                        isActive ? "text-white" : "text-slate-600 group-hover:text-indigo-600"
                                    )} />
                                </div>

                                {/* Label */}
                                <span className="flex-1 relative font-semibold">
                                    {item.name}
                                </span>

                                {/* Chevron indicator */}
                                <ChevronRight className={cn(
                                    "h-4 w-4 transition-all duration-300 opacity-0 -translate-x-2",
                                    isActive
                                        ? "opacity-100 translate-x-0"
                                        : "group-hover:opacity-100 group-hover:translate-x-0 text-slate-400"
                                )} />
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile & Logout Section */}
                <div className="px-4 pb-6 space-y-3 border-t border-slate-100 pt-4">
                    {/* User Profile Card */}
                    {/* <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 rounded-xl p-4 border border-slate-100">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                AD
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-slate-800">Admin User</div>
                                <div className="text-xs text-slate-500">admin@pasale.com</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white/60 rounded-lg px-3 py-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-medium">Online</span>
                        </div>
                    </div> */}

                    {/* Logout Button */}
                    <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-300 group border border-transparent hover:border-red-100">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 group-hover:bg-red-100 transition-all duration-300">
                            <LogOut className="h-5 w-5" />
                        </div>
                        <span className="flex-1 text-left">Log Out</span>
                        <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </button>
                </div>
            </div>
        </div>
    );
}
