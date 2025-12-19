"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, ArrowRight, Lock, Mail, Store } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate a small delay for better UX
        setTimeout(() => {
            router.push("/dashboard");
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex bg-white">
            {/* Left Side - Hero / Branding */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de2742dd61?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>

                <div className="relative z-10 max-w-lg space-y-8 text-white">
                    <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                        <TrendingUp className="h-8 w-8 text-white" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold tracking-tight leading-tight">
                            Predicting the future of retail.
                        </h1>
                        <p className="text-xl text-slate-300 font-light leading-relaxed">
                            Join thousands of retailers using AI to optimize inventory, predict sales, and maximize profits.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-8">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="font-bold text-2xl mb-1">98%</h3>
                            <p className="text-sm text-slate-400">Forecast Accuracy</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <h3 className="font-bold text-2xl mb-1">2.4x</h3>
                            <p className="text-sm text-slate-400">Revenue Growth</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-6 lg:hidden">
                            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                        <p className="text-slate-500 mt-2">Enter your details to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    className="pl-10 h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-lg shadow-slate-900/20 transition-all rounded-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-50 px-2 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-11 bg-white border-slate-200 hover:bg-slate-50">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-11 bg-white border-slate-200 hover:bg-slate-50">
                            <span className="mr-2 h-4 w-4 flex items-center justify-center font-bold font-serif text-slate-800">A</span>
                            Apple
                        </Button>
                    </div>

                    <p className="text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign up for free
                        </Link>
                    </p>

                    <div className="mt-8 pt-8 border-t border-slate-200">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <Store className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            <p className="text-xs text-blue-700">
                                <strong>Tip:</strong> You can enter any email/password to verify the demo flow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
