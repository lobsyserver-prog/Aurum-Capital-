import React, { useState } from 'react';
import { Users, Plus, ShieldCheck, Calendar, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';
import { StokvelGroup, UserRole } from '../types';

interface StokvelManagerProps {
  stokvels: StokvelGroup[];
  currentRole: UserRole;
  onAddStokvel: (newStokvel: Omit<StokvelGroup, 'id' | 'membersCount' | 'totalPool'>) => void;
  onJoinStokvel: (id: string) => void;
}

export const StokvelManager: React.FC<StokvelManagerProps> = ({
  stokvels,
  currentRole,
  onAddStokvel,
  onJoinStokvel,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contributionAmount: 200,
    frequency: 'Monthly' as const,
    category: 'Savings' as const,
    nextPayoutDate: '2026-12-20',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStokvel({
      ...formData,
    });
    setFormData({
      name: '',
      description: '',
      contributionAmount: 200,
      frequency: 'Monthly',
      category: 'Savings',
      nextPayoutDate: '2026-12-20',
    });
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
              <Users className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-black text-slate-900">Aurum Stokvel Community Pools</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Traditional South African community savings and revolving investment groups managed securely.
          </p>
        </div>

        {currentRole === 'owner' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 px-5 py-3 text-xs font-black text-slate-950 shadow-md hover:opacity-95 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Stokvel Group</span>
          </button>
        )}
      </div>

      {/* Stokvel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stokvels.map((stk) => (
          <div key={stk.id} className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-800 uppercase">
                  {stk.category} • {stk.frequency}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {stk.membersCount} Members
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">{stk.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{stk.description}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Contribution</span>
                <span className="font-bold text-slate-900 text-sm">R{stk.contributionAmount} / {stk.frequency.toLowerCase()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Pool</span>
                <span className="font-bold text-emerald-700 text-sm">R{stk.totalPool}.00</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 text-slate-500 pt-1 border-t border-slate-200/60">
                <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                <span>Next Payout Date: <strong className="text-slate-800">{stk.nextPayoutDate}</strong></span>
              </div>
            </div>

            {currentRole === 'client' && (
              <button
                onClick={() => onJoinStokvel(stk.id)}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold shadow-md transition ${
                  stk.joined
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer'
                }`}
              >
                {stk.joined ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Member of this Stokvel</span>
                  </>
                ) : (
                  <>
                    <span>Join Stokvel Group</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Stokvel Modal (Owner Only) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Create New Stokvel Pool</h3>
                <p className="text-xs text-slate-500">Aurum Capital Owner Management</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Stokvel Group Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Soweto Builders Stokvel"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Purpose of the stokvel pool"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Contribution Amount (ZAR)</label>
                  <input
                    type="number"
                    value={formData.contributionAmount}
                    onChange={(e) => setFormData({ ...formData, contributionAmount: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Frequency</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Savings">Savings</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Investment">Investment</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Next Payout Date</label>
                  <input
                    type="date"
                    value={formData.nextPayoutDate}
                    onChange={(e) => setFormData({ ...formData, nextPayoutDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-emerald-600 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
                >
                  Create Stokvel Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
