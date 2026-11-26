import React, { useState, useEffect } from 'react';
import { X, Clock, Sparkles } from 'lucide-react';

interface ClockDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClockDialog: React.FC<ClockDialogProps> = ({ isOpen, onClose }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-amber-500/30 p-6 text-white shadow-2xl text-center space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-200">Aurum Capital World Clock</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Rotating Logo Centerpiece */}
        <div className="relative flex justify-center py-4">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 to-emerald-500 opacity-30 blur-md animate-pulse" />
          <img
            src="/assets/aistudio/money_loaning_fc6cfda1.jpg"
            alt="Aurum Capital Logo"
            className="relative h-24 w-24 rounded-full object-cover border-2 border-amber-400 animate-[spin_15s_linear_infinite]"
          />
        </div>

        {/* Live Digital Clock */}
        <div className="space-y-1">
          <div className="text-4xl font-black font-mono tracking-wider bg-gradient-to-r from-amber-300 via-white to-emerald-300 bg-clip-text text-transparent">
            {time.toLocaleTimeString()}
          </div>
          <div className="text-xs text-slate-400">
            {time.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <span className="inline-block mt-2 rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-bold text-amber-400 border border-amber-500/20">
            SAST (South African Standard Time)
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 py-3 text-xs font-black text-slate-950 shadow-lg hover:opacity-95 transition"
        >
          Close Clock
        </button>
      </div>
    </div>
  );
};
