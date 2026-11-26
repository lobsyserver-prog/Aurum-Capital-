import React, { useState } from 'react';
import { Building2, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Smartphone, CreditCard, Lock, Check } from 'lucide-react';
import { SOUTH_AFRICAN_BANKS } from '../mockData';
import { LoanApplication, Transaction } from '../types';

interface PaymentPortalProps {
  activeLoan?: LoanApplication;
  onPaymentSuccess: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
}

export const PaymentPortal: React.FC<PaymentPortalProps> = ({ activeLoan, onPaymentSuccess }) => {
  const [selectedBankId, setSelectedBankId] = useState<string>('capitec');
  const [paymentMethod, setPaymentMethod] = useState<'instant_eft' | 'card' | 'ussd'>('instant_eft');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successTx, setSuccessTx] = useState<Transaction | null>(null);

  const selectedBank = SOUTH_AFRICAN_BANKS.find((b) => b.id === selectedBankId) || SOUTH_AFRICAN_BANKS[0];
  const amountToPay = activeLoan ? activeLoan.repaymentAmount : 150;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const refNum = `CP-PAY-${Math.floor(100000 + Math.random() * 900000)}Z`;
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        loanId: activeLoan ? activeLoan.id : 'loan-101',
        clientId: activeLoan ? activeLoan.clientId : 'client-001',
        clientName: activeLoan ? activeLoan.clientName : 'Thabo Mokoena',
        type: 'repayment',
        amount: amountToPay,
        bankUsed: selectedBank.name,
        referenceNumber: refNum,
        timestamp: new Date().toLocaleString(),
        status: 'success',
      };

      onPaymentSuccess(newTx);
      setSuccessTx(newTx);
      setIsProcessing(false);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure 256-Bit Bank Encryption
            </div>
            <h1 className="text-2xl font-black tracking-tight">Instant Payment Portal</h1>
            <p className="text-sm text-emerald-100/80 max-w-lg">
              Settle your micro-loan repayment instantly via your preferred South African online banking portal or USSD secure gateway.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/15 text-center min-w-[200px]">
            <span className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">Amount Due</span>
            <div className="text-3xl font-black text-white mt-1">R{amountToPay}.00</div>
            <span className="text-[11px] text-emerald-300 mt-1 block">
              {activeLoan ? `Due: ${activeLoan.dueDate}` : 'No active due date'}
            </span>
          </div>
        </div>
      </div>

      {successTx ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl border border-slate-100 space-y-6 animate-in fade-in duration-300">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Payment Successful!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your repayment of <strong className="text-slate-900">R{successTx.amount}</strong> via <strong className="text-slate-900">{successTx.bankUsed}</strong> has been successfully processed and credited to your loan ledger.
            </p>
          </div>

          <div className="max-w-sm mx-auto rounded-2xl bg-slate-50 p-4 border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Reference Number:</span>
              <span className="font-mono font-bold text-slate-900">{successTx.referenceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bank Used:</span>
              <span className="font-bold text-slate-900">{successTx.bankUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Timestamp:</span>
              <span className="font-bold text-slate-900">{successTx.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-emerald-600">Settled & Closed</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setSuccessTx(null)}
              className="rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
            >
              Make Another Payment
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Download Receipt
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Select Bank Online Banking */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Select Your Bank</h3>
                <span className="text-xs text-slate-500 font-medium">Instant Online Banking Link</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SOUTH_AFRICAN_BANKS.map((bank) => (
                  <button
                    key={bank.id}
                    type="button"
                    onClick={() => setSelectedBankId(bank.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition text-center relative ${
                      selectedBankId === bank.id
                        ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-xl ${bank.logoColor} text-white flex items-center justify-center font-bold text-xs mb-2 shadow-xs`}>
                      {bank.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-900 truncate w-full">{bank.name}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{bank.ussdCode}</span>
                    {selectedBankId === bank.id && (
                      <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instant_eft')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                      paymentMethod === 'instant_eft'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Building2 className="h-4 w-4 text-emerald-600" />
                    <span>Instant EFT</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <span>Debit / Credit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ussd')}
                    className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition ${
                      paymentMethod === 'ussd'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="h-4 w-4 text-amber-600" />
                    <span>USSD Pay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Execution Card */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-5">
              <h3 className="text-base font-bold text-slate-900">Payment Summary</h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Selected Bank:</span>
                  <span className="font-bold text-slate-900">{selectedBank.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Gateway Portal:</span>
                  <a
                    href={selectedBank.loginUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
                  >
                    <span>Official Login</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Method:</span>
                  <span className="font-bold text-slate-900 uppercase">{paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-bold">Total Payable:</span>
                  <span className="text-base font-black text-emerald-700">R{amountToPay}.00</span>
                </div>
              </div>

              <form onSubmit={handleProcessPayment} className="space-y-4 pt-2">
                <div className="rounded-2xl bg-slate-50 p-3 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
                  <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Redirects securely to {selectedBank.name} authentication sandbox for instant clearing.</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 py-4 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-800 transition cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Connecting to {selectedBank.name}...</span>
                    </div>
                  ) : (
                    <>
                      <span>Pay R{amountToPay}.00 Instantly</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
