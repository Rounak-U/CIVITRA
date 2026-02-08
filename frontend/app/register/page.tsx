"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Landmark, ArrowRight, ShieldCheck, Mail, Lock, User, Smartphone, MapPin, FileCheck, Chrome } from "lucide-react"
import { DotScreenShader } from "@/components/ui/dot-shader-background"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [role, setRole] = useState<'citizen' | 'admin' | 'worker'>('citizen')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/v1/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role, phone, location }), // Note: backend schema might need wardId or similar, but sending location as placeholder
            })

            const data = await response.json()

            if (response.ok) {
                // Store session
                localStorage.setItem('civitra_auth_token', data.token)
                localStorage.setItem('civitra_user', JSON.stringify(data.user))

                // Redirect on success
                window.location.href = '/'
            } else {
                alert(data.error || 'Registration failed. Please verify details.')
            }
        } catch (error) {
            console.error('Signup error:', error)
            alert('Security connection timeout. Please check if gateway is active.')
        } finally {
            setIsLoading(false)
        }
    }

    const roles = [
        { id: 'citizen', label: 'Citizen', desc: 'Social' },
        { id: 'admin', label: 'Admin', desc: 'Govt. Official' },
        { id: 'worker', label: 'Worker', desc: 'Majdoor' }
    ] as const

    return (
        <main className="h-screen bg-black text-white selection:bg-orange-500/30 overflow-hidden flex font-sans">

            {/* LEFT SIDE: Heritage Blueprint Pane (Hidden on Mobile) */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden border-r border-white/5">
                {/* Heritage Image Background */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/jaigarh.jpeg")' }}
                />

                {/* Sophisticated Overlays */}
                <div className="absolute inset-0 bg-black/60 z-0" /> {/* Darkening */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/40 z-0" />

            </div>

            {/* RIGHT SIDE: Minimal Form Pane */}
            <div className="flex-1 lg:w-1/2 flex flex-col relative z-20 overflow-hidden">

                {/* Header Mobile Link */}
                <div className="p-5 lg:p-8 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 lg:hidden">
                        <Landmark className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-black tracking-tighter uppercase">CIVI<span className="text-orange-500">TRA</span></span>
                    </Link>
                    <div className="hidden lg:block">
                        <Link href="/" className="flex items-center gap-2 group/return">
                            <Landmark className="h-3.5 w-3.5 text-zinc-600 group-hover/return:text-green-500 transition-colors" />
                            <span className="text-xs font-black tracking-[0.4em] text-zinc-700 group-hover/return:text-white uppercase transition-colors">Return</span>
                        </Link>
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Joined? <Link href="/login" className="text-white hover:text-green-500 transition-colors ml-2 underline underline-offset-4 decoration-white/20">Login</Link>
                    </p>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-24 py-6">
                    <div className="max-w-sm w-full mx-auto space-y-6">

                        <div className="space-y-1">
                            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
                                Entity <br /> <span className="text-green-600">Registry.</span>
                            </h1>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Protocol Initialization // Sec_Level_02</p>
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
                                        role === r.id ? "bg-green-500/10 border border-green-500/20" : "hover:bg-white/5 border border-transparent"
                                    )}
                                >
                                    <span className={cn(
                                        "text-[8px] font-black uppercase tracking-widest",
                                        role === r.id ? "text-green-500" : "text-zinc-500"
                                    )}>{r.label}</span>
                                    <span className="text-[6px] text-zinc-600 uppercase font-bold tracking-tighter">{r.desc}</span>
                                    {role === r.id && (
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                                {/* Name */}
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] pl-1">Full Name</label>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="John Smith"
                                            className="w-full bg-transparent border-b border-white/10 py-1.5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-all text-sm font-medium"
                                            required
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] pl-1">
                                        {role === 'admin' ? 'Govt. Email' : 'Email Address'}
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@domain.gov"
                                            className="w-full bg-transparent border-b border-white/10 py-1.5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-green-600 transition-all text-sm font-medium"
                                            required
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-green-600 group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                </div>

                                {/* Phone / ID */}
                                <div className="space-y-1">
                                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] pl-1">
                                        {role === 'worker' ? 'Labor ID' : role === 'admin' ? 'Emp Code' : 'Mobile'}
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder={role === 'citizen' ? "+91 XXXXX" : "ID-XXXX"}
                                            className="w-full bg-transparent border-b border-white/10 py-1.5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-orange-500 transition-all text-sm font-medium"
                                            required
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                </div>

                                {/* Location / Skill */}
                                <div className="space-y-1">
                                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] pl-1">
                                        {role === 'worker' ? 'Primary Skill' : role === 'admin' ? 'Department' : 'Location'}
                                    </label>
                                    <div className="relative group/input">
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder={role === 'worker' ? "Masonry" : role === 'admin' ? "Urban Dev" : "Mumbai"}
                                            className="w-full bg-transparent border-b border-white/10 py-1.5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-orange-500 transition-all text-sm font-medium"
                                            required
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1 sm:col-span-2">
                                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em] pl-1">Access Pin</label>
                                    <div className="relative group/input">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-transparent border-b border-white/10 py-1.5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-all text-sm font-medium font-mono"
                                            required
                                        />
                                        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-focus-within/input:w-full transition-all duration-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3 p-2.5 bg-zinc-900/50 border border-white/5">
                                <input type="checkbox" className="mt-1 h-3 w-3 rounded-none border-white/20 bg-transparent checked:bg-green-600 transition-all cursor-pointer accent-green-600" required />
                                <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                                    Sovereign data protocols agreement.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-black font-black py-3.5 rounded-none flex items-center justify-between px-6 hover:bg-green-600 hover:text-white transition-all group relative overflow-hidden"
                            >
                                <span className={cn("text-sm uppercase tracking-widest transition-all", isLoading && "opacity-0")}>Register Entity</span>
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
                                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-900">Sign up with Google</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}
