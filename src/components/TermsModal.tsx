import React from 'react';
import { X, ShieldCheck, FileText, AlertCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Terms & Conditions</h2>
              <p className="text-xs text-slate-500">CrediPulse Micro-Lending Agreement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-slate-700">
          <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100">
            <h3 className="font-semibold text-emerald-900 mb-1 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-emerald-600" />
              Standard Micro-Loan Structure
            </h3>
            <p className="text-emerald-700 text-xs leading-relaxed">
              In accordance with our transparent micro-lending policy:
              <br />• <strong>Loan R50</strong> requires a total repayment of <strong>R75</strong> within 14 to 30 days.
              <br />• <strong>Loan R100</strong> requires a total repayment of <strong>R150</strong> within 14 to 30 days.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 mb-1">1. Eligibility & Verification</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                All applicants must be South African citizens aged 18 or older with a valid green bar-coded ID or Smart ID card, a verified 3-month bank statement, and a stable source of income. All loans are subject to owner approval.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">2. Repayment Terms & Due Dates</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Repayments are due on or before the agreed due date. Clients may repay early at no extra cost through our instant online banking payment portal. Automated SMS and email reminders will be dispatched 3 days, 1 day, and on the due date.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">3. Late Payment & Defaults</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Failure to settle the repayment on the due date may result in an administration fee of R15 per week of default and restriction from future micro-loan advances. We encourage clients to contact support prior to due dates if experiencing financial difficulties.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">4. Privacy & Data Protection (POPIA)</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Your bank statements, ID documents, and personal details are encrypted and securely stored solely for verification and credit evaluation in compliance with the Protection of Personal Information Act (POPIA).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-amber-800 text-xs">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
            <span>Borrow responsibly. CrediPulse is committed to ethical micro-lending and responsible financial wellness.</span>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
