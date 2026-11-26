import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, DollarSign, Users } from 'lucide-react';
import { LoanApplication, StokvelGroup } from '../types';

interface CalendarViewProps {
  loans: LoanApplication[];
  stokvels: StokvelGroup[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ loans, stokvels }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper to format date YYYY-MM-DD
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-black text-slate-900">Aurum Capital Master Schedule</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track loan repayment due dates, disbursement schedules, and Stokvel payout cycles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('daily')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                viewMode === 'daily' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                viewMode === 'weekly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                viewMode === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Header with Navigation */}
      <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {currentDate.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })} ({viewMode.toUpperCase()} VIEW)
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const prev = new Date(currentDate);
                if (viewMode === 'monthly') prev.setMonth(prev.getMonth() - 1);
                else if (viewMode === 'weekly') prev.setDate(prev.getDate() - 7);
                else prev.setDate(prev.getDate() - 1);
                setCurrentDate(prev);
              }}
              className="rounded-xl border border-slate-200 bg-white p-2.5 hover:bg-slate-50 transition shadow-xs"
            >
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Today
            </button>
            <button
              onClick={() => {
                const next = new Date(currentDate);
                if (viewMode === 'monthly') next.setMonth(next.getMonth() + 1);
                else if (viewMode === 'weekly') next.setDate(next.getDate() + 7);
                else next.setDate(next.getDate() + 1);
                setCurrentDate(next);
              }}
              className="rounded-xl border border-slate-200 bg-white p-2.5 hover:bg-slate-50 transition shadow-xs"
            >
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Calendar View Content */}
        {viewMode === 'monthly' && (
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="font-bold text-slate-400 py-2 uppercase">{day}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-11-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const matchingLoans = loans.filter((l) => l.dueDate === dateStr);
              const matchingStokvels = stokvels.filter((s) => s.nextPayoutDate === dateStr);

              return (
                <div
                  key={i}
                  className={`min-h-[100px] rounded-2xl border p-2 text-left flex flex-col justify-between transition ${
                    dayNum === 25 ? 'border-amber-500 bg-amber-50/40 shadow-sm' : 'border-slate-100 bg-slate-50/50 hover:border-slate-200'
                  }`}
                >
                  <span className={`font-bold ${dayNum === 25 ? 'text-amber-700' : 'text-slate-700'}`}>{dayNum}</span>
                  <div className="space-y-1 overflow-hidden">
                    {matchingLoans.map((l) => (
                      <div key={l.id} className="rounded-lg bg-emerald-100 p-1 text-[10px] font-bold text-emerald-800 truncate">
                        Due: R{l.repaymentAmount} ({l.clientName.split(' ')[0]})
                      </div>
                    ))}
                    {matchingStokvels.map((s) => (
                      <div key={s.id} className="rounded-lg bg-amber-100 p-1 text-[10px] font-bold text-amber-900 truncate">
                        Payout: {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'weekly' && (
          <div className="space-y-3 text-xs">
            {['Monday, Nov 23', 'Tuesday, Nov 24', 'Wednesday, Nov 25 (Today)', 'Thursday, Nov 26', 'Friday, Nov 27', 'Saturday, Nov 28', 'Sunday, Nov 29'].map((day, idx) => (
              <div key={day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm">{day}</span>
                  <p className="text-slate-500 text-[11px]">Scheduled disbursements & repayment due windows</p>
                </div>
                <div className="flex gap-2">
                  {idx === 2 && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-amber-800">
                      Loan #101 Due (Thabo Mokoena - R150)
                    </span>
                  )}
                  {idx === 4 && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-800">
                      Soweto Pool Payout Date
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'daily' && (
          <div className="space-y-4 text-xs">
            <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="font-bold text-slate-900 text-sm">Today's Schedule & Reminders</h3>
                <span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-amber-800">November 25, 2026</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl bg-white p-4 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Loan Repayment Window</h4>
                      <p className="text-slate-500 text-[11px]">Thabo Mokoena Loan #101 • Due Amount: R150.00</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-800">Active</span>
                </div>

                <div className="rounded-2xl bg-white p-4 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Stokvel Contribution Check</h4>
                      <p className="text-slate-500 text-[11px]">Aurum Family Festive Savings • R250.00 contribution logged</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-900">Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
