"use client"

import React from "react"
import { Landmark, Shield, Cpu, Globe, Fingerprint, Activity } from "lucide-react"

export const CivicVisual = () => {
    return (
        <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center pointer-events-none select-none">

            {/* 1. Deep Atmosphere & Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.1)_0%,transparent_70%)] opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.08)_20%,transparent_70%)] animate-pulse" />

            {/* 2. Neural Mesh Grid (Sophisticated Backdrop) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="white" />
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* 3. Orbiting Kinetic Rings */}
            <div className="absolute w-full h-full">
                <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-12 border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-50" />
                <div className="absolute inset-20 border border-white/5 rounded-full animate-[spin_30s_linear_infinite] opacity-30" />
            </div>

            {/* 4. Central "Neural Core" Sphere */}
            <div className="relative w-48 h-48 md:w-60 md:h-60 group">
                {/* Spectral Bloom */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-1000" />

                {/* The Core Glass */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-black/40 to-white/5 border border-white/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center">

                    {/* Internal Dynamic Content */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,153,51,0.15),transparent)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.1),transparent)]" />

                    {/* Scanning Spectral Line */}
                    <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_20px_white] animate-[scanning_4s_ease-in-out_infinite]" />

                    {/* Central Identity */}
                    <div className="relative flex flex-col items-center gap-4 z-10 transition-transform duration-700 group-hover:scale-110">
                        <div className="relative">
                            <Landmark className="h-14 w-14 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            {/* Inner Energy Pulse */}
                            <div className="absolute -inset-2 bg-orange-500/20 blur-xl animate-pulse" />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[12px] font-black text-white/40 tracking-[0.5em] uppercase">Civic Engine</span>
                            <div className="flex gap-1.5 mt-2">
                                <div className="h-1 w-4 rounded-full bg-orange-500 animate-[pulse_2s_infinite]" />
                                <div className="h-1 w-4 rounded-full bg-white opacity-80" />
                                <div className="h-1 w-4 rounded-full bg-green-600 animate-[pulse_2s_infinite_0.5s]" />
                            </div>
                        </div>
                    </div>

                    {/* Circular Particle Stream (SVG) */}
                    <svg className="absolute inset-0 w-full h-full">
                        <circle cx="50%" cy="50%" r="45%" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 10" className="animate-[spin_20s_linear_infinite]" opacity="0.2" />
                    </svg>
                </div>
            </div>

            {/* 5. Floating Modern Bento Cards (Orbiting) */}
            <div className="absolute inset-0 pointer-events-none">

                {/* Card 1: Identity (Top Right) */}
                <ModernCard
                    icon={Fingerprint}
                    color="text-orange-400"
                    label="Digital_ID"
                    value="SECURE_CIPHER"
                    className="top-[10%] right-[5%] animate-[float_5s_ease-in-out_infinite]"
                />

                {/* Card 2: AI Logic (Bottom Left) */}
                <ModernCard
                    icon={Cpu}
                    color="text-green-500"
                    label="Neural_Redress"
                    value="AI_LOGIC_SYNC"
                    className="bottom-[15%] left-[5%] animate-[float_6s_ease-in-out_infinite_reverse]"
                />

                {/* Card 3: Global (Center Left) */}
                <ModernCard
                    icon={Globe}
                    color="text-white"
                    label="Geo_Sync"
                    value="PAN_INDIA_NET"
                    className="top-1/2 -left-8 -translate-y-1/2 animate-[float_4s_ease-in-out_infinite]"
                />

                {/* Card 4: Status (Bottom Right) */}
                <div className="absolute bottom-[5%] right-[10%] px-5 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-4 shadow-2xl animate-[float_7s_ease-in-out_infinite]">
                    <div className="relative">
                        <Activity className="h-5 w-5 text-green-500" />
                        <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-400 animate-ping" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Nodal Status</span>
                        <span className="text-[11px] font-black text-white uppercase tracking-tighter">Operational</span>
                    </div>
                </div>
            </div>

            {/* 6. Kinetic Particle Arc (SVG Trails) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <defs>
                    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff9933" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                </defs>
                <path d="M50,150 Q150,50 350,150 T650,150" fill="none" stroke="url(#glowGrad)" strokeWidth="0.5" className="animate-[dash_8s_linear_infinite]" strokeDasharray="20 200" />
                <path d="M-50,350 Q50,450 250,350 T550,350" fill="none" stroke="url(#glowGrad)" strokeWidth="0.5" className="animate-[dash_10s_linear_infinite_reverse]" strokeDasharray="30 250" opacity="0.5" />
            </svg>

        </div>
    )
}

const ModernCard = ({ icon: Icon, color, label, value, className }: any) => (
    <div className={`absolute px-4 py-3 bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/card ${className}`}>
        {/* Animated Border Reveal on hover (simulated with shadow) */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover/card:ring-white/30 transition-all duration-500" />

        <div className={`p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover/card:scale-110 transition-transform duration-500`}>
            <Icon className={`h-4.5 w-4.5 ${color}`} />
        </div>
        <div className="flex flex-col pr-1">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">{label}</span>
            <span className="text-[11px] font-black text-white uppercase tracking-tight">{value}</span>
        </div>
    </div>
)
