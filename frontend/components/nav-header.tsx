"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Landmark, Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "How it Works", href: "#how-it-works" },
        { name: "Benefits", href: "#benefits" },
    ]

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 z-50 w-full p-6 md:px-12 md:py-8 transition-all duration-300",
                    scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4 md:py-4" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer relative z-[60]">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 via-white/5 to-green-600/20 border border-white/10 shadow-[0_0_20px_rgba(255,153,51,0.1)] transition-all group-hover:shadow-[0_0_30px_rgba(255,153,51,0.2)]">
                            <Landmark className="h-5 w-5 text-white z-10" />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="text-2xl font-black tracking-tighter">
                                CIVI<span className="text-orange-500">TRA</span>
                            </span>
                            <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase pl-0.5">Community First</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight text-zinc-400">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-white transition-colors uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white uppercase text-xs"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 transition-all text-white shadow-[0_0_25px_rgba(255,153,51,0.3)] hover:shadow-[0_0_35px_rgba(255,153,51,0.5)] uppercase text-xs font-black"
                        >
                            Get Started
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-[60] p-2 text-white flex items-center gap-2 group/toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 animate-in fade-in slide-in-from-right-2 duration-300">Close</span>
                                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover/toggle:bg-white/20 transition-all">
                                    <X className="h-4 w-4" />
                                </div>
                            </>
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[55] bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center p-8 md:hidden overflow-hidden",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                )}
            >
                <div className="flex flex-col gap-8 w-full max-w-sm">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "text-4xl font-black tracking-tighter uppercase transition-all duration-500 transform",
                                isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                            )}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <span className="text-zinc-600 mr-4 text-xl font-mono">0{i + 1}</span>
                            {link.name}
                        </Link>
                    ))}

                    <div className={cn(
                        "h-[1px] w-full bg-white/10 my-4 transition-all duration-700",
                        isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    )} style={{ transitionDelay: "300ms" }} />

                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 text-xl font-bold transition-all duration-500",
                            isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                        )}
                        style={{ transitionDelay: "400ms" }}
                    >
                        LOGIN <ArrowRight className="h-5 w-5" />
                    </Link>

                    <Link
                        href="/register"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                            "flex items-center justify-between p-6 rounded-2xl bg-orange-600 text-white text-xl font-black shadow-[0_20px_40px_rgba(255,153,51,0.2)] transition-all duration-500",
                            isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                        )}
                        style={{ transitionDelay: "500ms" }}
                    >
                        GET STARTED <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                <div className={cn(
                    "absolute bottom-12 text-center transition-all duration-1000 flex flex-col items-center gap-4",
                    isOpen ? "opacity-100 bottom-12" : "opacity-0 bottom-0"
                )}>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        Close Menu
                    </button>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">CIVITRA PLATFORM v1.0</p>
                </div>
            </div>
        </>
    )
}
