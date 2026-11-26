import React, { useState } from 'react';
import { X, Upload, ShieldCheck, CheckCircle2, FileText, ArrowRight, DollarSign, Calendar } from 'lucide-react';
import { ClientProfile, LoanApplication } from '../types';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientProfile;
  onSubmitApplication: (loan: Omit<LoanApplication, 'id' | 'status' | 'applicationDate'>) => void;
  onOpenTerms: () => void;
}

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({
  isOpen,
  onClose,
  client,
  onSubmitApplication,
  onOpenTerms,
}) => {
  const [selectedTier, setSelectedTier] = useState<number>(100); // 50 or 100
  const [customAmount, setCustomAmount] = useState<string>('100');
  const [termDays, setTermDays] = useState<number>(30);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [idDoc, setIdDoc] = useState<string>(client.idDocumentName || '');
  const [bankStmt, setBankStmt] = useState<string>(client.bankStatementName || '');
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Calculate repayment based on user rule:
  // "we loan R50 return as R75 and R100 return as R150"
  const getRepaymentAmount = (amt: number) => {
    if (amt === 50) return 75;
    if (amt === 100) return 150;
    // For other amounts, apply 50% fee ratio or proportional calculation
    return Math.round(amt * 1.5);
  };

  const currentAmount = selectedTier === 0 ? Number(customAmount) || 100 : selectedTier;
  const repaymentAmount = getRepaymentAmount(currentAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Please agree to the Terms & Conditions before submitting.');
      return;
    }

    onSubmitApplication({
      clientId: client.id,
      clientName: client.fullName,
      loanAmount: currentAmount,
      repaymentAmount: repaymentAmount,
      termDays: termDays,
      dueDate: new Date(Date.now() + termDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      bankStatementName: bankStmt || 'Bank_Statement_3Months.pdf',
      idDocumentName: idDoc || 'RSA_ID_Document.pdf',
      notes: `Applied online via client portal. Bank: ${client.bankName} (${client.accountNumber})`,
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {submittedSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Loan Application Submitted!</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your application for R{currentAmount} (Repayment: R{repaymentAmount}) has been sent to the owner for review and Google Calendar scheduling.
            </p>
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Apply for Micro-Loan</h2>
                  <p className="text-xs text-slate-500">Fast approval & instant direct deposit</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Loan Tier Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Loan Amount
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier(50);
                      setCustomAmount('50');
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition ${
                      selectedTier === 50
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-lg font-black">R50</span>
                    <span className="text-xs text-slate-500 mt-1">Return: R75</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier(100);
                      setCustomAmount('100');
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition ${
                      selectedTier === 100
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-lg font-black">R100</span>
                    <span className="text-xs text-slate-500 mt-1">Return: R150</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTier(0);
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition ${
                      selectedTier === 0
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-sm font-bold">Custom</span>
                    <span className="text-xs text-slate-500 mt-1">Flexible R50-R500</span>
                  </button>
                </div>

                {selectedTier === 0 && (
                  <div className="mt-3">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 font-bold">
                        R
                      </span>
                      <input
                        type="number"
                        min="50"
                        max="500"
                        step="10"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-sm font-bold text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden"
                        placeholder="Enter amount"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Estimated Repayment: <strong className="text-slate-900">R{repaymentAmount}</strong> (50% term fee)
                    </p>
                  </div>
                )}
              </div>

              {/* Loan Term & Summary Card */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Loan Amount</span>
                  <span className="font-bold text-slate-900">R{currentAmount}.00</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Total Repayment Due</span>
                  <span className="font-bold text-emerald-700 text-sm">R{repaymentAmount}.00</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span>Repayment Term</span>
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <select
                      value={termDays}
                      onChange={(e) => setTermDays(Number(e.target.value))}
                      className="bg-transparent font-bold text-slate-900 focus:outline-hidden cursor-pointer"
                    >
                      <option value={14}>14 Days</option>
                      <option value={30}>30 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Document Verification Section */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Verification Documents (ID & Bank Statement)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 p-3 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="h-4 w-4 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 truncate">ID Document</p>
                        <p className="text-[10px] text-slate-500 truncate">{idDoc}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Verified
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-3 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 truncate">3-Mo Bank Statement</p>
                        <p className="text-[10px] text-slate-500 truncate">{bankStmt}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                      Attached
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Linked Bank: <strong className="text-slate-800">{client.bankName} ({client.accountNumber})</strong>. Disbursed instantly upon owner approval.
                </p>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={onOpenTerms}
                    className="font-bold text-emerald-700 underline hover:text-emerald-800"
                  >
                    Terms & Conditions
                  </button>{' '}
                  and authorize CrediPulse to verify my bank statements and ID documents for loan approval.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!agreedToTerms}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-bold text-white shadow-lg transition ${
                  agreedToTerms
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 shadow-emerald-600/20 cursor-pointer'
                    : 'bg-slate-300 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Submit Loan Application</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
