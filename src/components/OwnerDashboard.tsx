import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, FileText, Calendar, DollarSign, Users, ExternalLink, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { LoanApplication, ClientProfile, Transaction } from '../types';

interface OwnerDashboardProps {
  loans: LoanApplication[];
  clients: ClientProfile[];
  transactions: Transaction[];
  onApproveLoan: (loanId: string) => void;
  onRejectLoan: (loanId: string) => void;
  activeOwnerTab: string;
  setActiveOwnerTab: (tab: string) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  loans,
  clients,
  transactions,
  onApproveLoan,
  onRejectLoan,
  activeOwnerTab,
  setActiveOwnerTab,
}) => {
  const [selectedReviewLoan, setSelectedReviewLoan] = useState<LoanApplication | null>(null);

  const pendingLoans = loans.filter((l) => l.status === 'pending');
  const activeLoans = loans.filter((l) => l.status === 'active');
  const totalDisbursed = loans.filter((l) => l.status === 'active' || l.status === 'paid').reduce((a, b) => a + b.loanAmount, 0);
  const totalExpectedReturn = activeLoans.reduce((a, b) => a + b.repaymentAmount, 0);

  const clientMap = new Map(clients.map((c) => [c.id, c]));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Owner Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              Owner & Administrator Control Center
            </div>
            <h1 className="text-3xl font-black tracking-tight">CrediPulse Owner Dashboard</h1>
            <p className="text-sm text-indigo-100/80 max-w-lg">
              Review client loan applications, inspect ID documents and bank statements, monitor active repayments, and sync schedule with Google Calendar.
            </p>
          </div>

          <div className="flex bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/15">
            <button
              onClick={() => setActiveOwnerTab('overview')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeOwnerTab === 'overview' ? 'bg-white text-slate-900 shadow-md' : 'text-white hover:text-indigo-200'
              }`}
            >
              Overview & Loans
            </button>
            <button
              onClick={() => setActiveOwnerTab('approvals')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                activeOwnerTab === 'approvals' ? 'bg-white text-slate-900 shadow-md' : 'text-white hover:text-indigo-200'
              }`}
            >
              <span>Approvals</span>
              {pendingLoans.length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {pendingLoans.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveOwnerTab('calendar')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeOwnerTab === 'calendar' ? 'bg-white text-slate-900 shadow-md' : 'text-white hover:text-indigo-200'
              }`}
            >
              Google Calendar
            </button>
          </div>
        </div>
      </div>

      {activeOwnerTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Disbursed</span>
              <div className="text-2xl font-black text-slate-900">R{totalDisbursed}.00</div>
              <p className="text-[11px] text-slate-400">All-time micro-loan advances</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Expected Return</span>
              <div className="text-2xl font-black text-emerald-700">R{totalExpectedReturn}.00</div>
              <p className="text-[11px] text-emerald-600 font-medium">From {activeLoans.length} active loans</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pending Approvals</span>
              <div className="text-2xl font-black text-amber-600">{pendingLoans.length}</div>
              <p className="text-[11px] text-amber-600 font-medium">Awaiting ID & bank statement check</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Borrowers</span>
              <div className="text-2xl font-black text-slate-900">{clients.length}</div>
              <p className="text-[11px] text-slate-400">Registered profiles</p>
            </div>
          </div>

          {/* Active Loans Table */}
          <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Active Loans & Repayment Tracking</h3>
              <span className="text-xs text-slate-500">{activeLoans.length} Active</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Client Name</th>
                    <th className="px-6 py-3">Loan ID</th>
                    <th className="px-6 py-3">Loan Amount</th>
                    <th className="px-6 py-3">Repayment Due</th>
                    <th className="px-6 py-3">Due Date</th>
                    <th className="px-6 py-3">Google Calendar Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeLoans.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                        No active loans currently.
                      </td>
                    </tr>
                  ) : (
                    activeLoans.map((loan) => {
                      const client = clientMap.get(loan.clientId);
                      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Loan+Due:+${encodeURIComponent(
                        loan.clientName
                      )}&details=Repayment+due+for+loan+${loan.id}+-+Amount:+R${loan.repaymentAmount}&dates=${loan.dueDate.replace(
                        /-/g,
                        ''
                      )}T090000Z/${loan.dueDate.replace(/-/g, '')}T170000Z`;

                      return (
                        <tr key={loan.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 font-bold text-slate-900">
                            {loan.clientName}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {client?.bankName} ({client?.accountNumber})
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-slate-700">{loan.id}</td>
                          <td className="px-6 py-4 font-bold text-slate-900">R{loan.loanAmount}.00</td>
                          <td className="px-6 py-4 font-bold text-emerald-700">R{loan.repaymentAmount}.00</td>
                          <td className="px-6 py-4 text-slate-600">{loan.dueDate}</td>
                          <td className="px-6 py-4">
                            <a
                              href={calendarUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1.5 font-bold text-indigo-700 hover:bg-indigo-100 transition border border-indigo-200"
                            >
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Add to Gcal</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeOwnerTab === 'approvals' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Pending Loan Applications for Verification</h3>
              <span className="text-xs text-slate-500">{pendingLoans.length} Pending</span>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingLoans.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No pending applications. All client submissions have been processed.
                </div>
              ) : (
                pendingLoans.map((loan) => {
                  const client = clientMap.get(loan.clientId);
                  return (
                    <div key={loan.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{loan.clientName}</h4>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                            Loan: R{loan.loanAmount} → Return: R{loan.repaymentAmount}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Applied: {loan.applicationDate} • Term: {loan.termDays} Days • Bank: {client?.bankName} ({client?.accountNumber})
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ID: {client?.idNumber} • Income: R{client?.monthlyIncome}/mo ({client?.employmentStatus})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedReviewLoan(loan)}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                          Inspect Docs
                        </button>
                        <button
                          onClick={() => onRejectLoan(loan.id)}
                          className="rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100 transition border border-red-200"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => onApproveLoan(loan.id)}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                        >
                          Approve & Disburse
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {activeOwnerTab === 'calendar' && (
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Google Calendar Owner Sync</h3>
              <p className="text-xs text-slate-500">
                Automated schedule synchronization for loan disbursements and client repayment due dates.
              </p>
            </div>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
            >
              <Calendar className="h-4 w-4 text-indigo-400" />
              <span>Open Google Calendar</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Upcoming Schedule Events</h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {loans.map((loan) => {
                const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Repayment+Due:+${encodeURIComponent(
                  loan.clientName
                )}&details=Loan+${loan.id}+repayment+due.+Amount:+R${loan.repaymentAmount}&dates=${loan.dueDate.replace(
                  /-/g,
                  ''
                )}T090000Z/${loan.dueDate.replace(/-/g, '')}T170000Z`;

                return (
                  <div key={loan.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{loan.clientName}</span>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          R{loan.repaymentAmount} Due
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">Due Date: {loan.dueDate} • Status: {loan.status}</p>
                    </div>

                    <a
                      href={calendarUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Sync to Calendar</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Document Inspection Modal */}
      {selectedReviewLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Verification Inspection</h3>
                <p className="text-xs text-slate-500">Client: {selectedReviewLoan.clientName}</p>
              </div>
              <button
                onClick={() => setSelectedReviewLoan(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">ID Document</span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{selectedReviewLoan.idDocumentName}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Verified Match
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">3-Month Bank Statement</span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{selectedReviewLoan.bankStatementName}</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                    Sufficient Cashflow
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Loan Summary</span>
                <p>Requested Loan: <strong>R{selectedReviewLoan.loanAmount}</strong></p>
                <p>Repayment Return: <strong>R{selectedReviewLoan.repaymentAmount}</strong></p>
                <p>Term: <strong>{selectedReviewLoan.termDays} Days</strong></p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  onRejectLoan(selectedReviewLoan.id);
                  setSelectedReviewLoan(null);
                }}
                className="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100 transition border border-red-200"
              >
                Reject Application
              </button>
              <button
                onClick={() => {
                  onApproveLoan(selectedReviewLoan.id);
                  setSelectedReviewLoan(null);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                Approve & Disburse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
