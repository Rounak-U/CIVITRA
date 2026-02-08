"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Landmark, ArrowRight, ShieldCheck, Mail, Lock, Fingerprint, Chrome } from "lucide-react"
import { DotScreenShader } from "@/components/ui/dot-shader-background"
import { cn } from "@/lib/utils"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState<'citizen' | 'admin' | 'worker'>('citizen')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            })

            const data = await response.json()

            if (response.ok) {
                // Store session
                localStorage.setItem('civitra_auth_token', data.token)
                localStorage.setItem('civitra_user', JSON.stringify(data.user))

                // Redirect on success
                window.location.href = '/'
            } else {
                alert(data.error || 'Authorization failed. Please check credentials.')
            }
        } catch (error) {
            console.error('Login error:', error)
            alert('Unable to connect to security server. Ensure backend is active.')
        } finally {
            setIsLoading(false)
        }
    }

    const roles = [
        { id: 'citizen', label: 'Citizen', desc: 'Public' },
        { id: 'admin', label: 'Admin', desc: 'Govt. Official' },
        { id: 'worker', label: 'Worker', desc: 'Majdoor' }
    ] as const

    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-500/30 flex font-sans">
            {/* LEFT SIDE: Heritage Blueprint Pane (Hidden on Mobile) */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden border-r border-white/5">
                {/* Heritage Image Background */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/RedFort.jpeg")' }}
                />
                {/* Sophisticated Overlays */}
                <div className="absolute inset-0 bg-black/60 z-0" /> {/* Darkening */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/40 z-0" />
            </div>

            {/* RIGHT SIDE: Minimal Form Pane */}
            <div className="flex-1 lg:w-1/2 flex flex-col relative z-20 overflow-y-auto">

                {/* Header Mobile Link */}
                <div className="p-6 lg:p-10 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 lg:hidden">
                        <Landmark className="h-5 w-5 text-orange-500" />
                        <span className="font-black tracking-tighter uppercase">CIVI<span className="text-orange-500">TRA</span></span>
                    </Link>
                    <div className="hidden lg:block">
                        <Link href="/" className="flex items-center gap-2 group/return">
                            <Landmark className="h-3.5 w-3.5 text-zinc-600 group-hover/return:text-orange-500 transition-colors" />
                            <span className="text-xs font-black tracking-[0.4em] text-zinc-700 group-hover/return:text-white uppercase transition-colors">Return</span>
                        </Link>
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        New? <Link href="/register" className="text-white hover:text-orange-500 transition-colors ml-2 underline underline-offset-4 decoration-white/20">Create account</Link>
                    </p>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32 pb-16">
                    <div className="max-w-sm w-full mx-auto space-y-8">

                        <div className="space-y-1">
                            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
                                Welcome <br /> <span className="text-orange-500">Back.</span>
                            </h1>
                            <p className="text-zinc-500 font-bold text-[8px] uppercase tracking-widest">Authorized Personnel Only // Port_8080</p>
                        </div>

                        {/* Role Switcher */}
                        <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 border border-white/5">
                            {roles.map((r) => (
                                <button
                                    key={r.id}
                                    onClick={() => setRole(r.id)}
                                    type="button"
                                    className={cn(
                                        "flex flex-col items-center py-2 transition-all relative overflow-hidden",
                                        role === r.id ? "bg-orange-500/10 border border-orange-500/20" : "hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    <span className={cn(
                                        "text-[8px] font-black uppercase tracking-widest",
                                        role === r.id ? "text-orange-500" : "text-zinc-500"
                                    )}>{r.label}</span>
                                    <span className="text-[6px] text-zinc-600 uppercase font-bold tracking-tighter">{r.desc}</span>
                                    {role === r.id && (
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-orange-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] pl-1">
                                        {role === 'admin' ? 'Official Email' : role === 'worker' ? 'Worker ID / Phone' : 'Email Address'}
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={role === 'worker' ? "91XXXXXXXX" : "name@domain.gov"}
                                            className="w-full bg-transparent border-b border-white/10 py-2.5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-orange-500 transition-all text-sm font-medium"
                                            required
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center pl-1">
                                        <label className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Access Code</label>
                                        <Link href="#" className="text-[8px] font-black text-orange-600 uppercase hover:text-orange-500 tracking-widest">Forgot?</Link>
                                    </div>
                                    <div className="relative group/input">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-transparent border-b border-white/10 py-2.5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-all text-sm font-medium font-mono"
                                            required
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-black font-black py-4 rounded-none flex items-center justify-between px-8 hover:bg-orange-500 hover:text-white transition-all group relative overflow-hidden"
                            >
                                <span className={cn("text-sm uppercase tracking-widest transition-all", isLoading && "opacity-0")}>Establish Link</span>
                                <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-2", isLoading && "opacity-0")} />

                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <span className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.4em] whitespace-nowrap">Quick Access</span>
                                <div className="h-[1px] flex-1 bg-white/5" />
                            </div>

                            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 py-3 transition-all group border-b-2 border-red-500 relative overflow-hidden">
                                {/* Google Brand Colors as a thin top stripe */}
                                <div className="absolute top-0 left-0 w-full h-[2px] flex">
                                    <div className="h-full w-1/4 bg-[#4285F4]" />
                                    <div className="h-full w-1/4 bg-[#EA4335]" />
                                    <div className="h-full w-1/4 bg-[#FBBC05]" />
                                    <div className="h-full w-1/4 bg-[#34A853]" />
                                </div>
                                <Chrome className="h-4 w-4 text-zinc-800" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-900">Continue with Google</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}
