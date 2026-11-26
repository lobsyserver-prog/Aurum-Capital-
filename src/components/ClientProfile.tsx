import React, { useState } from 'react';
import { User, ShieldCheck, CheckCircle2, Save, FileText, Building2, ExternalLink, Trophy, Star } from 'lucide-react';
import type { ClientProfile as ClientProfileModel } from '../types';
import { SOUTH_AFRICAN_BANKS } from '../mockData';

interface ClientProfileProps {
  client: ClientProfileModel;
  onUpdateClient: (updated: ClientProfileModel) => void;
}

export const ClientProfile: React.FC<ClientProfileProps> = ({ client, onUpdateClient }) => {
  const [formData, setFormData] = useState<ClientProfileModel>(client);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateClient(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 font-black text-lg">
            {formData.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{formData.fullName}</h1>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                Verified POPIA Client
              </span>
            </div>
            <p className="text-xs text-slate-500">Secure Personal & Banking Profile</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            <span>Profile Updated Successfully!</span>
          </div>
        )}
      </div>

      {/* Hollywoodbets & LottoStar Quick Access for Making Money Back */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl border border-purple-500/30 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>Official Gaming Partner</span>
            </div>
            <h3 className="text-lg font-black text-white">Hollywoodbets</h3>
            <p className="text-xs text-purple-200">Play sports & lucky numbers to make your loan money back!</p>
          </div>
          <a
            href="https://www.hollywoodbets.net"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-2xl bg-purple-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-purple-500 transition shrink-0"
          >
            <span>Play Now</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 p-6 text-white shadow-xl border border-red-500/30 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold">
              <Trophy className="h-3.5 w-3.5" />
              <span>Global Jackpots</span>
            </div>
            <h3 className="text-lg font-black text-white">LottoStar</h3>
            <p className="text-xs text-red-200">Bet on international lotteries & quick wins for instant payouts!</p>
          </div>
          <a
            href="https://www.lottostar.co.za"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-2xl bg-red-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-red-500 transition shrink-0"
          >
            <span>Play Now</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <User className="h-4 w-4 text-amber-600" />
            Personal & Identification Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">South African ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Phone Number (Mobile)</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-bold text-slate-700">Physical Residential Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                required
              />
            </div>
          </div>
        </div>

        {/* Employment & Income */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            Employment & Income Verification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Employment Status</label>
              <select
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden cursor-pointer"
              >
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Student">Student</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Employer Name</label>
              <input
                type="text"
                name="employerName"
                value={formData.employerName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Monthly Income (ZAR)</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Banking Details */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-600" />
            Linked Bank Account for Disbursements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Bank Name</label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden cursor-pointer"
              >
                {SOUTH_AFRICAN_BANKS.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Account Type</label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden cursor-pointer"
              >
                <option value="Savings">Savings Account</option>
                <option value="Cheque">Cheque Account</option>
                <option value="Current">Current Account</option>
              </select>
            </div>
          </div>
        </div>

        {/* Verification Documents */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="h-4 w-4 text-purple-600" />
            Uploaded Verification Documents
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 flex items-center justify-between">
              <div className="truncate">
                <p className="font-bold text-slate-900">Green ID / Smart ID Document</p>
                <p className="text-[11px] text-slate-500 truncate">{formData.idDocumentName || 'Not uploaded'}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                Verified
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 flex items-center justify-between">
              <div className="truncate">
                <p className="font-bold text-slate-900">3-Month Bank Statement</p>
                <p className="text-[11px] text-slate-500 truncate">{formData.bankStatementName || 'Not uploaded'}</p>
              </div>
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-800">
                Attached
              </span>
            </div>
          </div>
        </div>

        {/* App Links & Deployment URLs */}
        <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl space-y-3">
          <h3 className="text-base font-bold text-amber-400">Aurum Capital Deployment Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl bg-slate-800 p-3.5 border border-slate-700 space-y-1">
              <span className="text-slate-400 block font-bold">Demo App Link (Development)</span>
              <a
                href="https://ais-dev-6qlb3pkhhtapleixdqiale-217874426962.europe-west1.run.app"
                target="_blank"
                rel="noreferrer"
                className="text-amber-300 font-mono text-[11px] hover:underline break-all block"
              >
                https://ais-dev-6qlb3pkhhtapleixdqiale-217874426962.europe-west1.run.app
              </a>
            </div>

            <div className="rounded-2xl bg-slate-800 p-3.5 border border-slate-700 space-y-1">
              <span className="text-slate-400 block font-bold">Shared App Link (ais-pre)</span>
              <a
                href="https://ais-pre-6qlb3pkhhtapleixdqiale-217874426962.europe-west1.run.app"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-300 font-mono text-[11px] hover:underline break-all block"
              >
                https://ais-pre-6qlb3pkhhtapleixdqiale-217874426962.europe-west1.run.app
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 px-8 py-3.5 text-xs font-black text-slate-950 shadow-lg shadow-amber-500/20 hover:opacity-95 transition cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Secure Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
