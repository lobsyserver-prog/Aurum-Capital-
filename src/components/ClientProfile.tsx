import React, { useState } from 'react';
import { User, ShieldCheck, CheckCircle2, Save, FileText, Building2 } from 'lucide-react';
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-black text-lg">
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <User className="h-4 w-4 text-emerald-600" />
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Monthly Income (ZAR)</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Banking Details */}
        <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Linked Bank Account for Disbursements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Bank Name</label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Account Type</label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-800 transition cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>Save Secure Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
