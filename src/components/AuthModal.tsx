import React, { useState } from 'react';
import { X, ShieldCheck, User, Lock, Mail, Phone, CreditCard, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';
import { ClientProfile, UserRole } from '../types';
import { SOUTH_AFRICAN_BANKS } from '../mockData';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
  onLogin: (role: UserRole, identifier: string) => void;
  onRegister: (newClient: ClientProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLogin,
  onRegister,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>('client');
  const [securityCode, setSecurityCode] = useState('');
  const [isSecurityUnlocked, setIsSecurityUnlocked] = useState(false);

  const [identifier, setIdentifier] = useState('072 555 1234'); // Cell number or email
  const [password, setPassword] = useState('Aurum2026!');
  const [errorMsg, setErrorMsg] = useState('');

  // Registration state
  const [regData, setRegData] = useState({
    fullName: 'Sipho Dlamini',
    email: 'sipho.dlamini@gmail.com',
    phone: '083 444 7890',
    idNumber: '9203125188081',
    address: '45 Commissioner St, Johannesburg, 2001',
    employmentStatus: 'Employed' as const,
    employerName: 'Gauteng Enterprises',
    monthlyIncome: 12000,
    bankName: 'FNB',
    accountNumber: '62839102938',
    accountType: 'Cheque' as const,
  });

  if (!isOpen) return null;

  const handleSecurityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityCode === '10032711') {
      setIsSecurityUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Security Code. Required: 10032711');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Check Owner / Admin credentials
    if (role === 'owner') {
      const cleanId = identifier.trim().toLowerCase();
      if (
        (cleanId === 'nyasham' || cleanId === 'nyasham@lobsy.co.za' || cleanId === 'whispheringwinds457@gmail.com') &&
        password === '10March1990NM'
      ) {
        onLogin('owner', identifier);
        onClose();
        return;
      }
      if (
        (cleanId === 'kennym' || cleanId === 'kennym@lobsy.co.za') &&
        password === 'KinG@320BNM'
      ) {
        onLogin('owner', identifier);
        onClose();
        return;
      }
      setErrorMsg('Invalid Owner/Admin ID or Password. Owner: NyashaM / 10March1990NM, Admin: KennyM / KinG@320BNM');
      return;
    }

    // Client login via phone or email + password
    if (!identifier.trim()) {
      setErrorMsg('Please enter your cell phone number or email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    onLogin('client', identifier);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: ClientProfile = {
      id: `client-${Date.now()}`,
      ...regData,
      idDocumentName: 'RSA_Smart_ID_Card.pdf',
      bankStatementName: '3_Months_Bank_Statement.pdf',
    };
    onRegister(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/money_loaning_fc6cfda1.jpg"
              alt="Aurum Capital"
              className="h-8 w-8 rounded-full object-cover border border-amber-500/50 animate-[spin_15s_linear_infinite]"
            />
            <div>
              <h2 className="text-base font-bold text-white">
                {mode === 'login' ? 'Aurum Capital Log On' : 'New Client Registration'}
              </h2>
              <p className="text-[11px] text-slate-400">Micro-Lending & Stokvel Services</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setIsSecurityUnlocked(false);
              }}
              className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
                mode === 'login' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Log On
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setIsSecurityUnlocked(false);
              }}
              className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
                mode === 'register' ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Account
            </button>
          </div>

          {mode === 'login' ? (
            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="block font-bold text-slate-300">Select Access Portal</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('client');
                      setIdentifier('072 555 1234');
                      setIsSecurityUnlocked(false);
                    }}
                    className={`rounded-xl border p-3 font-bold transition ${
                      role === 'client'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-800 bg-slate-800/50 text-slate-400'
                    }`}
                  >
                    Client Portal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('owner');
                      setIsSecurityUnlocked(false); // require security code 10032711 first
                    }}
                    className={`rounded-xl border p-3 font-bold transition ${
                      role === 'owner'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                        : 'border-slate-800 bg-slate-800/50 text-slate-400'
                    }`}
                  >
                    Owner / Admin Portal
                  </button>
                </div>
              </div>

              {/* Owner Security Code Check Gate */}
              {role === 'owner' && !isSecurityUnlocked ? (
                <form onSubmit={handleSecurityCheck} className="space-y-4 rounded-2xl bg-slate-800/80 p-5 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <KeyRound className="h-4 w-4" />
                    <span>Owner Portal Security Verification</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Enter security code <strong className="text-amber-300 font-mono">10032711</strong> to unlock Owner & Admin log on credentials.
                  </p>

                  {errorMsg && (
                    <div className="rounded-xl bg-red-500/20 border border-red-500/40 p-3 text-red-200 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">Security Code</label>
                    <input
                      type="password"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      placeholder="Enter security code"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 px-4 font-mono font-bold text-amber-400 tracking-widest text-center focus:border-amber-500 focus:outline-hidden text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 py-3 font-black text-slate-950 shadow-md hover:bg-amber-400 transition"
                  >
                    Verify & Unlock Owner Portal
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="rounded-xl bg-red-500/20 border border-red-500/40 p-3 text-red-200 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">
                      {role === 'client' ? 'Cell Phone Number or Email Address' : 'Owner ID / Email (NyashaM / KennyM)'}
                    </label>
                    <div className="relative">
                      {role === 'client' ? (
                        <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      ) : (
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      )}
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={role === 'client' ? 'e.g. 072 555 1234 or email@domain.com' : 'NyashaM or KennyM'}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 font-semibold text-white focus:border-amber-500 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 font-semibold text-white focus:border-amber-500 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  {role === 'owner' && (
                    <div className="rounded-xl bg-slate-800/60 p-3 text-[11px] text-slate-400 space-y-1 border border-slate-700/50">
                      <p><strong>Owner (Nyasha Michaels):</strong> ID: <code className="text-amber-300">NyashaM</code> | Pwd: <code className="text-amber-300">10March1990NM</code></p>
                      <p><strong>Admin (Kenny Mathunywa):</strong> ID: <code className="text-amber-300">KennyM</code> | Pwd: <code className="text-amber-300">KinG@320BNM</code></p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-600 py-3.5 text-xs font-black text-slate-950 shadow-lg hover:opacity-95 transition cursor-pointer"
                  >
                    <span>Log On Securely</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Full Legal Name</label>
                <input
                  type="text"
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white focus:border-emerald-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Cell Phone Number</label>
                  <input
                    type="text"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">SA ID Number</label>
                  <input
                    type="text"
                    value={regData.idNumber}
                    onChange={(e) => setRegData({ ...regData, idNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Monthly Income (ZAR)</label>
                  <input
                    type="number"
                    value={regData.monthlyIncome}
                    onChange={(e) => setRegData({ ...regData, monthlyIncome: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Bank Name</label>
                  <select
                    value={regData.bankName}
                    onChange={(e) => setRegData({ ...regData, bankName: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white focus:border-emerald-500 focus:outline-hidden"
                  >
                    {SOUTH_AFRICAN_BANKS.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Account Number</label>
                  <input
                    type="text"
                    value={regData.accountNumber}
                    onChange={(e) => setRegData({ ...regData, accountNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white focus:border-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-600 py-3.5 text-xs font-black text-slate-950 shadow-lg hover:opacity-95 transition cursor-pointer"
              >
                <span>Register & Verify Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
