import React from 'react';
import { FileText, Download, Printer, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { ClientProfile, LoanApplication, Transaction } from '../types';

interface LoanStatementProps {
  client: ClientProfile;
  loans: LoanApplication[];
  transactions: Transaction[];
  onPayNowClick: () => void;
}

export const LoanStatement: React.FC<LoanStatementProps> = ({
  client,
  loans,
  transactions,
  onPayNowClick,
}) => {
  const activeLoan = loans.find((l) => l.status === 'active');
  const clientTransactions = transactions.filter((t) => t.clientId === client.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Statement Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-black text-slate-900">Official Loan Statement & Ledger</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generated for {client.fullName} • ID: {client.idNumber} • Account: {client.bankName} ({client.accountNumber})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <Printer className="h-4 w-4" />
            <span>Print / PDF</span>
          </button>
          {activeLoan && (
            <button
              onClick={onPayNowClick}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
            >
              <span>Pay Statement Balance</span>
            </button>
          )}
        </div>
      </div>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Borrowed</span>
          <div className="text-2xl font-black text-slate-900">
            R{loans.reduce((acc, l) => acc + l.loanAmount, 0)}.00
          </div>
          <p className="text-[11px] text-slate-400">Lifetime micro-loan disbursements</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Current Balance Due</span>
          <div className="text-2xl font-black text-emerald-700">
            R{activeLoan ? activeLoan.repaymentAmount : 0}.00
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">
            {activeLoan ? `Due Date: ${activeLoan.dueDate}` : 'No active outstanding balance'}
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Account Status</span>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <span className={`inline-block h-3 w-3 rounded-full ${activeLoan ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-base font-bold">{activeLoan ? 'Active Outstanding' : 'Good Standing'}</span>
          </div>
          <p className="text-[11px] text-slate-400">POPIA Compliant Encryption</p>
        </div>
      </div>

      {/* Itemized Loans Table */}
      <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Loan Agreements & Repayment Schedule</h3>
          <span className="text-xs text-slate-500">{loans.length} Total Loans</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Loan ID</th>
                <th className="px-6 py-3">Loan Amount</th>
                <th className="px-6 py-3">Repayment Due</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">{loan.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">R{loan.loanAmount}.00</td>
                  <td className="px-6 py-4 font-bold text-emerald-700">R{loan.repaymentAmount}.00</td>
                  <td className="px-6 py-4 text-slate-600">{loan.dueDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                        loan.status === 'active'
                          ? 'bg-amber-100 text-amber-800'
                          : loan.status === 'approved'
                          ? 'bg-blue-100 text-blue-800'
                          : loan.status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Itemized Ledger Activity</h3>
          <span className="text-xs text-slate-500">{clientTransactions.length} Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Bank</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {clientTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                clientTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">{tx.referenceNumber}</td>
                    <td className="px-6 py-4 uppercase font-bold text-slate-600">{tx.type}</td>
                    <td className="px-6 py-4 text-slate-600">{tx.bankUsed || 'CrediPulse Gateway'}</td>
                    <td className={`px-6 py-4 font-bold ${tx.type === 'disbursement' ? 'text-blue-700' : 'text-emerald-700'}`}>
                      {tx.type === 'disbursement' ? '-' : '+'}R{tx.amount}.00
                    </td>
                    <td className="px-6 py-4 text-slate-500">{tx.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800 uppercase">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
