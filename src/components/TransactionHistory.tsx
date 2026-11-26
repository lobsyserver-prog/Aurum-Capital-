import React from 'react';
import { ArrowRightLeft, Search, CheckCircle2, Building2 } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-black text-slate-900">Historical Transaction Log</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete cryptographic audit trail of all loan disbursements and instant repayments.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Bank</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No historical transactions recorded.
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">{tx.referenceNumber}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{tx.clientName}</td>
                    <td className="px-6 py-4 uppercase font-bold text-slate-600">{tx.type}</td>
                    <td className="px-6 py-4 text-slate-600 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      <span>{tx.bankUsed || 'CrediPulse Bank'}</span>
                    </td>
                    <td className={`px-6 py-4 font-bold ${tx.type === 'disbursement' ? 'text-blue-700' : 'text-emerald-700'}`}>
                      {tx.type === 'disbursement' ? '-' : '+'}R{tx.amount}.00
                    </td>
                    <td className="px-6 py-4 text-slate-500">{tx.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800 uppercase">
                        <CheckCircle2 className="h-3 w-3" />
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
