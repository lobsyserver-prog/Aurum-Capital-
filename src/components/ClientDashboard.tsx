import React from 'react';
import { Wallet, ArrowRight, ShieldCheck, Clock, CheckCircle2, FileText, AlertCircle, PlusCircle, Building2 } from 'lucide-react';
import { ClientProfile, LoanApplication, NotificationItem } from '../types';

interface ClientDashboardProps {
  client: ClientProfile;
  loans: LoanApplication[];
  notifications: NotificationItem[];
  onOpenApplyModal: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  client,
  loans,
  notifications,
  onOpenApplyModal,
  onNavigateTab,
}) => {
  const activeLoan = loans.find((l) => l.status === 'active');
  const pendingLoan = loans.find((l) => l.status === 'pending');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 p-8 text-white shadow-2xl">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              POPIA Verified Client Account
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome back, {client.fullName}!</h1>
            <p className="text-sm text-emerald-100/80 max-w-lg leading-relaxed">
              Manage your micro-loans, check upcoming due dates, and settle instant repayments securely through South African online banking gateways.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenApplyModal}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-700 transition cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Apply for New Loan</span>
            </button>
            <button
              onClick={() => onNavigateTab('payment')}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md px-6 py-3.5 text-xs font-bold text-white hover:bg-white/20 transition border border-white/15"
            >
              <span>Instant Payment Portal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Loan Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Loan Owed Card */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Loan Owed</span>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-800 uppercase">
              {activeLoan ? 'Active' : 'No Active Loan'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black text-slate-900">
              R{activeLoan ? activeLoan.repaymentAmount : 0}.00
            </div>
            <p className="text-xs text-slate-500">
              {activeLoan ? `Original loan: R${activeLoan.loanAmount} • Repayment: R${activeLoan.repaymentAmount}` : 'Apply for R50 or R100 instantly'}
            </p>
          </div>

          {activeLoan ? (
            <button
              onClick={() => onNavigateTab('payment')}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
            >
              <span>Pay R{activeLoan.repaymentAmount} Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onOpenApplyModal}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
            >
              <span>Request Micro-Loan</span>
            </button>
          )}
        </div>

        {/* Repayment Due Date Card */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Next Due Date</span>
            <Clock className="h-5 w-5 text-amber-600" />
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black text-slate-900">
              {activeLoan ? activeLoan.dueDate : 'No Due Date'}
            </div>
            <p className="text-xs text-slate-500">
              {activeLoan ? 'Automated SMS & Calendar reminders active' : 'All accounts in good standing'}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Secure reminders enabled for owner calendar sync</span>
          </div>
        </div>

        {/* Pending Application Status */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Application Status</span>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                pendingLoan ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {pendingLoan ? 'Pending Review' : 'Verified'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xl font-bold text-slate-900">
              {pendingLoan ? `R${pendingLoan.loanAmount} Application` : 'No Pending Applications'}
            </div>
            <p className="text-xs text-slate-500">
              {pendingLoan ? 'Owner is verifying your ID & bank statement' : 'Ready for new loan advance'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('statement')}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <span>View Full Statement</span>
          </button>
        </div>
      </div>

      {/* Linked Bank Account & Verification Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Bank & ID Verification</h3>
            <button
              onClick={() => onNavigateTab('profile')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Update Details
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">Linked Bank Account</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">{client.bankName}</p>
              <p className="text-[11px] text-slate-500">Acc: {client.accountNumber} ({client.accountType})</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">Verification Documents</span>
              </div>
              <p className="text-xs text-slate-600 font-semibold truncate">{client.idDocumentName}</p>
              <p className="text-[11px] text-slate-500 truncate">{client.bankStatementName}</p>
            </div>
          </div>
        </div>

        {/* Quick Notifications Feed */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Recent Reminders</h3>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
