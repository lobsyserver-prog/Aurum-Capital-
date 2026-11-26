import React, { useState } from 'react';
import { FileText, Printer, ShieldCheck, CheckCircle2, PenTool, ArrowRight, X } from 'lucide-react';
import { ClientProfile, LoanApplication } from '../types';

interface LoanAgreementContractProps {
  client: ClientProfile;
  activeLoan?: LoanApplication;
  isOpen?: boolean;
  onClose?: () => void;
}

export const LoanAgreementContract: React.FC<LoanAgreementContractProps> = ({
  client,
  activeLoan,
  isOpen = true,
  onClose,
}) => {
  const [signature, setSignature] = useState<string>('');
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [signDate, setSignDate] = useState<string>('');

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature.trim()) {
      alert('Please enter your full legal name as digital signature.');
      return;
    }
    setIsSigned(true);
    setSignDate(new Date().toLocaleString());
  };

  const content = (
    <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 text-slate-800 text-xs leading-relaxed font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-slate-200 pb-6 gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/public/assets/aistudio/money_loaning_fc6cfda1.jpg"
            alt="Aurum Capital"
            className="h-16 w-16 rounded-full object-cover border-2 border-amber-500 shadow-md"
          />
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">AURUM CAPITAL</h1>
            <p className="text-[11px] text-slate-500 font-semibold">Micro-Lending & Financial Services</p>
            <p className="text-[10px] text-amber-700">National Credit Act (NCA) Compliant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <Printer className="h-4 w-4" />
            <span>Print Contract</span>
          </button>
          {onClose && (
            <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-base font-black tracking-wider uppercase text-slate-900">LOAN AGREEMENT</h2>
        <p className="text-[11px] text-slate-500">
          Made in terms of the National Credit Act, 34 of 2005 (South Africa).
        </p>
      </div>

      {/* 1. Parties */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 uppercase text-xs border-b border-slate-100 pb-1">1. Parties</h3>
        <div className="space-y-2">
          <p><strong>1.1 LENDER: Aurum Capital (Micro-Lending & Financial Services)</strong></p>
          <ul className="pl-4 space-y-1 text-slate-600">
            <li>• Owner: Nyasha Michaels | Email: NyashaM@lobsy.co.za | WhatsApp: +27 75 149 1048</li>
            <li>• Administrator: Kenny Mathunywa | Email: KennyM@lobsy.co.za | WhatsApp: +27 69 497 7018</li>
          </ul>
          <p className="pt-2"><strong>1.2 BORROWER (Client):</strong></p>
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div><span>Full Name:</span> <strong className="text-slate-900">{client.fullName}</strong></div>
            <div><span>ID Number:</span> <strong className="text-slate-900">{client.idNumber}</strong></div>
            <div><span>Cell / WhatsApp:</span> <strong className="text-slate-900">{client.phone}</strong></div>
            <div><span>Email:</span> <strong className="text-slate-900">{client.email}</strong></div>
            <div className="sm:col-span-2"><span>Address:</span> <strong className="text-slate-900">{client.address}</strong></div>
            <div><span>Employment:</span> <strong className="text-slate-900">{client.employmentStatus} ({client.employerName})</strong></div>
            <div><span>Monthly Net Income:</span> <strong className="text-slate-900">R{client.monthlyIncome}.00</strong></div>
          </div>
        </div>
      </div>

      {/* 2. Roles Inside Aurum Capital */}
      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 uppercase text-xs border-b border-slate-100 pb-1">2. Roles Inside Aurum Capital</h3>
        <p className="text-slate-600 leading-relaxed">
          <strong>2.1 Owner – Nyasha Michaels:</strong> Final authority on lending policy, approval limits, interest, write-offs, and disputes.<br />
          <strong>2.2 Administrator – Kenny Mathunywa:</strong> Day-to-day administration – client onboarding, loan capturing, payment tracking, collections.<br />
          <strong>2.3 Both Owner and Administrator may:</strong> (a) Add clients, (b) Adjust payment dates with borrower confirmation, (c) Contact client via WhatsApp.
        </p>
      </div>

      {/* 3. Loan Details */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 uppercase text-xs border-b border-slate-100 pb-1">3. Loan Details</h3>
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
            <span className="text-slate-500">Loan Agreement Number:</span>
            <span className="font-mono font-bold text-slate-900">AC-{activeLoan ? activeLoan.id : '101'}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
            <span className="text-slate-500">Principal Amount Lent:</span>
            <span className="font-bold text-slate-900">R{activeLoan ? activeLoan.loanAmount : 100}.00</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
            <span className="text-slate-500">Total Amount Repayable:</span>
            <span className="font-bold text-emerald-700">R{activeLoan ? activeLoan.repaymentAmount : 150}.00</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
            <span className="text-slate-500">Repayment Term:</span>
            <span className="font-bold text-slate-900">{activeLoan ? activeLoan.termDays : 30} Days</span>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
            <span className="text-slate-500">Due Date:</span>
            <span className="font-bold text-slate-900">{activeLoan ? activeLoan.dueDate : '2026-12-01'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Linked Bank Account:</span>
            <span className="font-bold text-slate-900">{client.bankName} ({client.accountNumber})</span>
          </div>
        </div>
      </div>

      {/* 4. Repayment & Payment Dates */}
      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 uppercase text-xs border-b border-slate-100 pb-1">4. Repayment & Payment Dates</h3>
        <p className="text-slate-600 leading-relaxed">
          4.1 The Borrower must pay the instalment on or before each due date without deduction.<br />
          4.2 Payment Date Adjustments may be approved in writing by Nyasha Michaels or Kenny Mathunywa via WhatsApp.<br />
          4.3 Proof of payment must be sent via WhatsApp to +27 75 149 1048 or +27 69 497 7018.
        </p>
      </div>

      {/* 8. WhatsApp Communication */}
      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 uppercase text-xs border-b border-slate-100 pb-1">8. Official WhatsApp Communication</h3>
        <p className="text-slate-600 leading-relaxed">
          WhatsApp is an official communication channel for Aurum Capital. Messages to +27 75 149 1048 (Nyasha) or +27 69 497 7018 (Kenny) are legally binding when confirmed in writing.
        </p>
      </div>

      {/* 11. Signatures & Digital Sign */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="font-bold text-slate-900 uppercase text-xs">11. Signatures & Digital Acceptance</h3>
        
        {isSigned ? (
          <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-200 space-y-2 text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span className="font-bold text-sm">Agreement Digitally Signed & Sealed</span>
            </div>
            <p className="text-xs">
              Digital Signature: <strong className="font-mono text-slate-900">{signature}</strong>
            </p>
            <p className="text-[11px] text-slate-500">Timestamp: {signDate}</p>
          </div>
        ) : (
          <form onSubmit={handleSign} className="rounded-2xl bg-slate-50 p-5 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <PenTool className="h-4 w-4 text-amber-600" />
              <span>Digital Signature Agreement</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              By typing your full legal name below, you confirm that you have read, understood, and agreed to all terms of this Aurum Capital Loan Agreement.
            </p>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Type Full Legal Name (Digital Signature)</label>
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="e.g. Thabo Mokoena"
                className="w-full rounded-xl border border-slate-300 bg-white p-3 font-semibold text-slate-900 focus:border-amber-500 focus:outline-hidden"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 py-3 text-xs font-black text-slate-950 shadow-md hover:opacity-95 transition cursor-pointer"
            >
              <span>Sign Contract Digitally</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-slate-600 text-[11px]">
          <div>
            <p><strong>LENDER - Owner:</strong> Nyasha Michaels</p>
            <p className="font-mono text-amber-700">Signed digitally on file</p>
          </div>
          <div>
            <p><strong>LENDER - Admin:</strong> Kenny Mathunywa</p>
            <p className="font-mono text-emerald-700">Signed digitally on file</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
