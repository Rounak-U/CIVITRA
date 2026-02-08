import Link from "next/link"
import {
  Building2,
  ArrowRight,
  Camera,
  Upload,
  Activity,
  Zap,
  ShieldCheck,
  Brain,
  Users,
  MapPin,
  CheckCircle2,
  Cpu,
  Smartphone,
  Map,
  FileCheck,
  ChevronRight,
  Landmark,
  Shield,
  Eye
} from "lucide-react"
import { DotScreenShader } from "@/components/ui/dot-shader-background"
import { CivicVisual } from "@/components/ui/civic-visual"
import { cn } from "@/lib/utils"
import { NavHeader } from "@/components/nav-header"

export default function Home() {
  return (
    <main className="min-h-screen bg-black font-sans text-white overflow-x-hidden selection:bg-orange-500/30">

      {/* Background Shader - Fixed behind everything */}
      <div className="fixed inset-0 z-0 opacity-30">
        <DotScreenShader />
      </div>

      <NavHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border-x border-orange-500/30 border-y border-green-600/20 text-white text-[10px] font-black tracking-[0.3em] uppercase mb-10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <div className="flex gap-1 mr-2 scale-75">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse delay-1000" />
            </div>
            Smart Govt Initiative
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-10">
            Better <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-600">Cities</span> <br className="hidden md:block" />
            Smarter <span className="italic font-light">India.</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed mb-16 font-light">
            CIVITRA leverages next-generation <span className="text-white font-medium underline decoration-orange-500/50 underline-offset-4">AI Vision</span> to bridge the gap between
            citizens and urban authorities. Transforming local grievance redressal into
            a faster, transparent, and intelligent process for the modern era.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register" className="group w-full sm:w-auto px-10 py-5 bg-orange-600 rounded-xl font-black text-xl hover:bg-orange-500 transition-all flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(255,153,51,0.25)] hover:-translate-y-1">
              Start Reporting <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="#about" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-sm">
              Citizen Handbook
            </Link>
          </div>
        </div>
      </section>

      {/* 1️⃣ Short Description Section */}
      <section id="about" className="py-12 md:py-20 px-6 relative overflow-hidden">
        {/* Subtle Flag Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/5 blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in side-in-from-left duration-700">
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-12 bg-orange-500" />
              <div className="text-zinc-500 font-black tracking-widest text-xs uppercase">Platform Mission</div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              AI-First <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">Civic Reporting</span> <br />
              <span className="text-green-500 underline decoration-white/20 underline-offset-8">For Digital India</span>
            </h2>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-zinc-100">
                Accelerating Governance with Real-Time Data.
              </h3>
              <p className="text-zinc-400 text-xl leading-relaxed font-light">
                Our platform empowers every citizen to become an active stakeholder in urban development.
                Using your smartphone, you can instantly flag local issues that require immediate attention.
              </p>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 relative group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 via-white to-green-600 opacity-50" />
                <p className="text-zinc-300 text-lg leading-relaxed italic">
                  "Every report is automatically analyzed by our neural networks to categorize types (Road, Water, Waste) and assess critical severity—routing it to the right department in under 60 seconds."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: Brain, label: "AI Neural", color: "text-white" },
                { icon: Landmark, label: "Gov Portal", color: "text-orange-400" },
                { icon: Smartphone, label: "Citizen App", color: "text-green-500" },
                { icon: Shield, label: "Secure Data", color: "text-blue-400" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                  <item.icon className={cn("h-8 w-8", item.color)} />
                  <span className="text-[10px] font-black text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-widest text-center">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center p-8">
            <CivicVisual />
          </div>
        </div>
      </section>

      {/* 2️⃣ How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-6 bg-zinc-950/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                DIGITAL <br className="hidden md:block" />
                <span className="text-orange-500">WORKFLOW</span>
              </h2>
              <p className="text-zinc-500 text-xl font-light max-w-lg">Transparent and simplified 3-step reporting pipeline.</p>
            </div>
            <div className="flex gap-2 justify-center">
              <div className="h-1.5 w-12 bg-orange-500 rounded-full" />
              <div className="h-1.5 w-12 bg-white rounded-full" />
              <div className="h-1.5 w-12 bg-green-600 rounded-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute -top-10 left-10 text-[120px] font-black text-white/5 -z-10 group-hover:text-orange-500/10 transition-colors">01</div>
              <div className="h-full p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8">
                  <Camera className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Capture Focus</h3>
                <p className="text-zinc-500 leading-relaxed font-light">
                  Spot an issue? Capture a clear visual record. AI instantly handles geolocation, timestamping, and image preprocessing.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute -top-10 left-10 text-[120px] font-black text-white/5 -z-10 group-hover:text-white/20 transition-colors">02</div>
              <div className="h-full p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">AI Validation</h3>
                <p className="text-zinc-500 leading-relaxed font-light">
                  Upload with zero paperwork. Our neutral networks validate the report type and calculate regional impact scores instantly.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="absolute -top-10 left-10 text-[120px] font-black text-white/5 -z-10 group-hover:text-green-600/10 transition-colors">03</div>
              <div className="h-full p-10 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-green-600/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-green-600/10 border border-green-500/20 flex items-center justify-center mb-8">
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Live Tracking</h3>
                <p className="text-zinc-500 leading-relaxed font-light">
                  Every step is documented on your dashboard. Receive direct updates from nodal officers until the resolution is confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Platform <br /> <span className="text-emerald-500 italic">Edge.</span>
            </h2>
            <p className="text-zinc-500 text-xl font-light">
              Secure, sovereign, and scalable technology for building trust between the state and its citizens.
            </p>
            <div className="pt-8">
              <Link href="/register" className="inline-flex items-center gap-2 text-white font-bold text-lg hover:text-orange-500 transition-all group">
                Join the Digital Revolution <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Rapid response",
                desc: "AI-driven prioritization bypasses unnecessary red-tape, accelerating nodal action benchmarks by 65%.",
                icon: Zap,
                color: "text-orange-400",
                border: "group-hover:border-orange-500/30"
              },
              {
                title: "Radical clarity",
                desc: "Public-facing audit trails for every report. No more black-hole grievances—total operational visibility.",
                icon: Eye,
                color: "text-white",
                border: "group-hover:border-white/30"
              },
              {
                title: "Smart Insights",
                desc: "Our neural engines identify recurring pattern-hubs, helping city planners prevent issues before they occur.",
                icon: Brain,
                color: "text-green-500",
                border: "group-hover:border-green-600/30"
              },
              {
                title: "Sovereign Trust",
                desc: "Data hosted on localized servers with high-level encryption—protecting citizen privacy at every scale.",
                icon: ShieldCheck,
                color: "text-blue-500",
                border: "group-hover:border-blue-500/30"
              }
            ].map((benefit, i) => (
              <div key={i} className={cn(
                "group p-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-500",
                benefit.border
              )}>
                <benefit.icon className={cn("h-8 w-8 mb-8", benefit.color)} />
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{benefit.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-lg font-light">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4️⃣ Call To Action (CTA) Section */}
      <section className="py-16 md:py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-600/20 via-white/10 to-green-600/20 p-[1px]">
          <div className="bg-zinc-950/90 backdrop-blur-sm rounded-[1.9rem] p-12 md:p-20 text-center relative overflow-hidden group">
            {/* Modern Mesh/Grid Background */}
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:32px_32px] -z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-green-600/10 -z-10" />

            {/* Focal Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/10 blur-[100px] -z-10" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-600/10 blur-[100px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 blur-[120px] rounded-full -z-10" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-7xl font-semibold tracking-tight leading-none font-[family-name:var(--font-playfair)] italic">
                Shape Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-green-500 font-black not-italic tracking-tighter uppercase block mt-2">Community.</span>
              </h2>

              <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
                Join thousands of citizens working together to build a more <span className="text-white font-medium">efficient and transparent India</span>. Secure your digital civic identity today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register" className="w-full sm:w-auto px-10 py-4 bg-orange-600 text-white rounded-lg font-black text-lg hover:bg-orange-500 transition-all shadow-[0_15px_30px_rgba(255,153,51,0.2)] hover:-translate-y-0.5 uppercase tracking-wider">
                  START NOW
                </Link>
                <Link href="/login" className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/20 rounded-lg font-black text-lg hover:bg-white/10 transition-all text-white backdrop-blur-md uppercase tracking-wider">
                  LOGIN
                </Link>
              </div>

              <div className="flex flex-col items-center gap-4 text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-zinc-800" />
                  <span>No cost to register • Secure Citizen Identity</span>
                  <div className="h-[1px] w-8 bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Building2 className="h-6 w-6 text-zinc-500" />
              <span className="text-xl font-black text-white tracking-widest uppercase">CIVITRA</span>
            </div>
            <p className="text-zinc-600 text-xs font-bold tracking-tight uppercase max-w-sm">
              The AI-First grievance redressal infrastructure for a billion dreams.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex gap-10 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
              <Link href="#" className="hover:text-orange-500 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-green-600 transition-colors">Contact</Link>
            </div>
            <p className="text-zinc-700 text-[9px] font-black uppercase tracking-widest">
              © 2024 CIVITRA PLATFORM • MADE FOR THE CITIZENS OF INDIA
            </p>
          </div>
        </div>
      </footer>

    </main>
  )
}
