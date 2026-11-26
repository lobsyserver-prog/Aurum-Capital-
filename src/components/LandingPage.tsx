import React from 'react';
import { ShieldCheck, ArrowRight, Wallet, Users, Sparkles, Lock } from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onEnterGuest: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onEnterGuest }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => onOpenAuth('login')}>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 opacity-75 blur-sm animate-pulse" />
            <img
              src="/assets/aistudio/money_loaning_fc6cfda1.jpg"
              alt="Aurum Capital Logo"
              className="relative h-12 w-12 rounded-full object-cover border-2 border-amber-400 animate-[spin_20s_linear_infinite]"
              title="Click logo to Log On"
            />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-amber-300 via-amber-100 to-emerald-300 bg-clip-text text-transparent">
              AURUM CAPITAL
            </span>
            <span className="block text-[10px] text-slate-400 tracking-wider uppercase">Micro-Lending & Stokvels</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('login')}
            className="rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Log On
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:opacity-95 transition"
          >
            Register Now
          </button>
        </div>
      </header>

      {/* Hero Section with Rotating Logo */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-12 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/20">
          <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
          South Africa's Premier Micro-Lending & Stokvel Platform
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Empowering Financial Freedom Through{' '}
            <span className="bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Aurum Capital
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Instant micro-loans (R50 to R500), secure online banking payment portals, automated Google Calendar reminders for owners, and community-driven Stokvel savings pools.
          </p>
        </div>

        {/* Centerpiece Rotating Logo Clickable */}
        <div className="flex flex-col items-center justify-center pt-4">
          <div
            onClick={() => onOpenAuth('login')}
            className="relative group cursor-pointer inline-block"
            title="Click logo to Log On"
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 opacity-30 blur-xl group-hover:opacity-70 transition duration-500" />
            <img
              src="/assets/aistudio/money_loaning_fc6cfda1.jpg"
              alt="Aurum Capital Logo Rotating"
              className="relative h-36 w-36 sm:h-48 sm:w-48 rounded-full object-cover shadow-2xl border-4 border-amber-400/80 animate-[spin_18s_linear_infinite] group-hover:scale-105 transition transform"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-full backdrop-blur-xs">
              <span className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-black text-slate-950 shadow-lg">
                Click to Log On
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4 animate-bounce">👆 Click the logo to access Log On & Registration</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenAuth('register')}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-600 px-8 py-4 text-sm font-black text-slate-950 shadow-xl shadow-amber-500/20 hover:opacity-95 transition cursor-pointer"
          >
            <span>Register New Account</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onEnterGuest}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-8 py-4 text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <span>Explore Demo Portal</span>
          </button>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-12 max-w-3xl mx-auto text-left">
          <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Wallet className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Micro-Loan Tiers</h3>
            <p className="text-xs text-slate-400">Loan R50 return R75, Loan R100 return R150 with instant South African banking EFT.</p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Stokvel Pools</h3>
            <p className="text-xs text-slate-400">Owner-managed Stokvel groups for community savings, grocery funds, and member payouts.</p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 p-5 border border-slate-800/80 space-y-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-white">POPIA Secure</h3>
            <p className="text-xs text-slate-400">Encrypted bank statements, ID document verification, and owner approval workflow.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© 2026 Aurum Capital & CrediPulse. All rights reserved. Secure Financial Services.</p>
      </footer>
    </div>
  );
};
