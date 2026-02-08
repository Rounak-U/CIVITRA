"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export const AdvancedStatus = () => {
    const [data, setData] = useState<string[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            const newLine = Math.random().toString(2).substring(2, 12)
            setData(prev => [newLine, ...prev].slice(0, 5))
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full max-w-[280px] space-y-3 font-mono">
            {/* Scanning Header */}
            <div className="relative h-12 w-full bg-white/5 border border-white/10 rounded-xl overflow-hidden px-4 flex items-center justify-between">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-white/5 to-green-600/10" />
                {/* Scanning Line */}
                <div className="absolute top-0 bottom-0 w-px bg-white/40 shadow-[0_0_10px_white] animate-[scanning_3s_ease-in-out_infinite]" />

                <div className="relative z-10 flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-black tracking-tight uppercase">System Status</span>
                    <span className="text-xs text-orange-400 font-black animate-pulse uppercase tracking-wider">Online & Secure</span>
                </div>

                <div className="relative z-10 h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            </div>

            {/* Mini Data Stream */}
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-950/80 border border-white/5 rounded-lg p-3 space-y-1">
                    <span className="text-[8px] text-zinc-600 font-bold block uppercase tracking-tighter">Network Node</span>
                    <div className="text-[10px] text-green-500 font-black tracking-widest truncate">ENCRYPTED_256</div>
                </div>
                <div className="bg-zinc-950/80 border border-white/5 rounded-lg p-3 space-y-1">
                    <span className="text-[8px] text-zinc-600 font-bold block uppercase tracking-tighter">Latency</span>
                    <div className="text-[10px] text-white font-black tracking-widest">12ms <span className="text-[8px] text-zinc-500">AVG</span></div>
                </div>
            </div>

            {/* Binary Stream Visual */}
            <div className="p-3 bg-black/60 border border-white/5 rounded-xl space-y-1 overflow-hidden">
                <span className="text-[8px] text-zinc-700 font-black uppercase mb-2 block">Live Data Feed</span>
                {data.map((line, i) => (
                    <div key={i} className="text-[8px] text-zinc-500/50 flex justify-between gap-2 overflow-hidden truncate">
                        <span className="text-zinc-800">0x{Math.floor(Math.random() * 1000).toString(16)}</span>
                        <span className={cn(i === 0 ? "text-orange-500/40" : "")}>{line}</span>
                        <span className="text-zinc-800">[{Math.random().toFixed(2)}]</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
