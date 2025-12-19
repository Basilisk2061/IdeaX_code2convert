"use client"
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-pastel-blue via-white to-pastel-pink/20">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Accent Blobs */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pastel-purple/50 blur-[100px]" />
                        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-pastel-green/40 blur-[80px]" />
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
