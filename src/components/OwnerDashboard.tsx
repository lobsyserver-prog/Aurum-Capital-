import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, FileText, Calendar, DollarSign, Users, ExternalLink, AlertCircle, Check, ArrowRight, Building2, Phone, MessageSquare, Edit3, UserPlus } from 'lucide-react';
import { LoanApplication, ClientProfile, Transaction, OwnerBankingDetails } from '../types';
import { AURUM_ADMINS } from '../mockData';

interface OwnerDashboardProps {
  loans: LoanApplication[];
  clients: ClientProfile[];
  transactions: Transaction[];
  ownerBanking: OwnerBankingDetails;
  onUpdateOwnerBanking: (banking: OwnerBankingDetails) => void;
  onApproveLoan: (loanId: string) => void;
  onRejectLoan: (loanId: string) => void;
  onAdjustDueDate: (loanId: string, newDate: string) => void;
  onAddClient: (client: ClientProfile) => void;
  activeOwnerTab: string;
  setActiveOwnerTab: (tab: string) => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  loans,
  clients,
  transactions,
  ownerBanking,
  onUpdateOwnerBanking,
  onApproveLoan,
  onRejectLoan,
  onAdjustDueDate,
  onAddClient,
  activeOwnerTab,
  setActiveOwnerTab,
}) => {
  const [selectedReviewLoan, setSelectedReviewLoan] = useState<LoanApplication | null>(null);
  const [editingBanking, setEditingBanking] = useState<OwnerBankingDetails>(ownerBanking);
  const [bankingSaved, setBankingSaved] = useState(false);

  // Adjust date modal state
  const [adjustingLoanId, setAdjustingLoanId] = useState<string | null>(null);
  const [newDueDate, setNewDueDate] = useState<string>('');

  // Add client modal state
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClientData, setNewClientData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    monthlyIncome: 5000,
    bankName: 'Capitec Bank',
    accountNumber: '',
  });

  const pendingLoans = loans.filter((l) => l.status === 'pending');
  const activeLoans = loans.filter((l) => l.status === 'active');
  const totalDisbursed = loans.filter((l) => l.status === 'active' || l.status === 'paid').reduce((a, b) => a + b.loanAmount, 0);
  const totalExpectedReturn = activeLoans.reduce((a, b) => a + b.repaymentAmount, 0);

  const clientMap = new Map(clients.map((c) => [c.id, c]));

  const handleSaveBanking = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOwnerBanking(editingBanking);
    setBankingSaved(true);
    setTimeout(() => setBankingSaved(false), 2500);
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ClientProfile = {
      id: `client-${Date.now()}`,
      ...newClientData,
      employmentStatus: 'Employed',
      employerName: 'Aurum Partner',
      accountType: 'Savings',
      idDocumentName: 'RSA_ID_Document.pdf',
      bankStatementName: '3_Month_Statement.pdf',
    };
    onAddClient(created);
    setShowAddClientModal(false);
    setNewClientData({
      fullName: '',
      email: '',
      phone: '',
      idNumber: '',
      address: '',
      monthlyIncome: 5000,
      bankName: 'Capitec Bank',
      accountNumber: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Owner Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              Aurum Capital Management (Owner: Nyasha & Admin: Kenny)
            </div>
            <h1 className="text-3xl font-black tracking-tight">Admin & Owner Control Portal</h1>
            <p className="text-sm text-amber-100/80 max-w-lg">
              Manage client applications, bank deposit details, adjust payment due dates, and contact borrowers via WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap bg-white/10 backdrop-blur-md rounded-2xl p-1.5 border border-white/15 gap-1">
            <button
              onClick={() => setActiveOwnerTab('overview')}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                activeOwnerTab === 'overview' ? 'bg-white text-slate-900 shadow-md' : 'text-white hover:text-amber-200'
              }`}
            >
              Overview & Loans
            </button>
            <button
              onClick={() => setActiveOwnerTab('approvals')}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                activeOwnerTab === 'approvals' ? 'bg-white text-slate-900 shadow-md' : 'text-white hover:text-amber-200'
              }`}
            >
              <span>Approvals</span>
              {pendingLoans.length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {pendingLoans.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveOwnerTab('banking')}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                activeOwnerTab === 'banking' ? 'bg-white text-slate-900 shadow-md' : 'text-white hover:text-amber-200'
              }`}
            >
              Company Bank Accounts
            </button>
            <button
              onClick={() => setActiveOwnerTab('team')}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                activeOwnerTab === 'team' ? 'bg-white text-slate-900 shadow-md' : 'text-white hover:text-amber-200'
              }`}
            >
              Management Team
            </button>
          </div>
        </div>
      </div>

      {activeOwnerTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total Disbursed</span>
              <div className="text-2xl font-black text-slate-900">R{totalDisbursed}.00</div>
              <p className="text-[11px] text-slate-400">Aurum Capital loans advanced</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Expected Return</span>
              <div className="text-2xl font-black text-emerald-700">R{totalExpectedReturn}.00</div>
              <p className="text-[11px] text-emerald-600 font-medium">From {activeLoans.length} active loans</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pending Approvals</span>
              <div className="text-2xl font-black text-amber-600">{pendingLoans.length}</div>
              <p className="text-[11px] text-amber-600 font-medium">Awaiting ID & bank review</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Registered Clients</span>
                <div className="text-2xl font-black text-slate-900">{clients.length}</div>
                <p className="text-[11px] text-slate-400">Active borrowers</p>
              </div>
              <button
                onClick={() => setShowAddClientModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
              >
                <UserPlus className="h-4 w-4 text-amber-400" />
                <span>Add Client</span>
              </button>
            </div>
          </div>

          {/* Active Loans Table with Date Adjustment & WhatsApp Contact */}
          <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Active Loans, Due Date Adjustments & WhatsApp Contact</h3>
              <span className="text-xs text-slate-500">{activeLoans.length} Active Loans</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3">Client Name & Phone</th>
                    <th className="px-6 py-3">Loan ID</th>
                    <th className="px-6 py-3">Repayment Due</th>
                    <th className="px-6 py-3">Due Date</th>
                    <th className="px-6 py-3">WhatsApp Contact</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {activeLoans.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                        No active loans currently.
                      </td>
                    </tr>
                  ) : (
                    activeLoans.map((loan) => {
                      const client = clientMap.get(loan.clientId);
                      const whatsappNumber = client?.phone ? client.phone.replace(/[^0-9]/g, '') : '27725551234';
                      const waLink = `https://wa.me/${whatsappNumber}?text=Hi%20${encodeURIComponent(
                        loan.clientName
                      )},%20this%20is%20Aurum%20Capital%20regarding%20your%20loan%20repayment%20of%20R${loan.repaymentAmount}%20due%20on%20${loan.dueDate}.`;

                      return (
                        <tr key={loan.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 font-bold text-slate-900">
                            {loan.clientName}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {client?.phone} • {client?.bankName}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-slate-700">{loan.id}</td>
                          <td className="px-6 py-4 font-bold text-emerald-700">R{loan.repaymentAmount}.00</td>
                          <td className="px-6 py-4 font-semibold text-slate-800">{loan.dueDate}</td>
                          <td className="px-6 py-4">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 font-bold text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
                            >
                              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                              <span>WhatsApp</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => {
                                setAdjustingLoanId(loan.id);
                                setNewDueDate(loan.dueDate);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                            >
                              <Edit3 className="h-3.5 w-3.5 text-amber-600" />
                              <span>Adjust Date</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeOwnerTab === 'approvals' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white shadow-xl border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/75 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Pending Loan Applications for Nyasha & Kenny Verification</h3>
              <span className="text-xs text-slate-500">{pendingLoans.length} Pending</span>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingLoans.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No pending applications. All client submissions have been verified and approved.
                </div>
              ) : (
                pendingLoans.map((loan) => {
                  const client = clientMap.get(loan.clientId);
                  return (
                    <div key={loan.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{loan.clientName}</h4>
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
                            Loan: R{loan.loanAmount} → Return: R{loan.repaymentAmount}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Applied: {loan.applicationDate} • Term: {loan.termDays} Days • Bank: {client?.bankName} ({client?.accountNumber})
                        </p>
                        <p className="text-[11px] text-slate-500">
                          ID: {client?.idNumber} • Income: R{client?.monthlyIncome}/mo • Phone: {client?.phone}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedReviewLoan(loan)}
                          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                        >
                          Inspect Docs
                        </button>
                        <button
                          onClick={() => onRejectLoan(loan.id)}
                          className="rounded-xl bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100 transition border border-red-200"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => onApproveLoan(loan.id)}
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                        >
                          Approve & Disburse
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {activeOwnerTab === 'banking' && (
        <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Aurum Capital Deposit Banking Details</h3>
              <p className="text-xs text-slate-500">
                These banking details will be displayed securely in all client payment profiles and instant payment instructions.
              </p>
            </div>
            {bankingSaved && (
              <span className="rounded-xl bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 border border-emerald-200">
                Banking Details Updated Successfully!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveBanking} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Bank Name</label>
                <input
                  type="text"
                  value={editingBanking.bankName}
                  onChange={(e) => setEditingBanking({ ...editingBanking, bankName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Account Holder Name</label>
                <input
                  type="text"
                  value={editingBanking.accountHolder}
                  onChange={(e) => setEditingBanking({ ...editingBanking, accountHolder: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Account Number</label>
                <input
                  type="text"
                  value={editingBanking.accountNumber}
                  onChange={(e) => setEditingBanking({ ...editingBanking, accountNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Branch Code</label>
                <input
                  type="text"
                  value={editingBanking.branchCode}
                  onChange={(e) => setEditingBanking({ ...editingBanking, branchCode: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Account Type</label>
                <input
                  type="text"
                  value={editingBanking.accountType}
                  onChange={(e) => setEditingBanking({ ...editingBanking, accountType: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Reference Format</label>
                <input
                  type="text"
                  value={editingBanking.referenceFormat}
                  onChange={(e) => setEditingBanking({ ...editingBanking, referenceFormat: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition cursor-pointer"
              >
                Save Bank Account Details
              </button>
            </div>
          </form>
        </div>
      )}

      {activeOwnerTab === 'team' && (
        <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Aurum Capital Management Team</h3>
            <p className="text-xs text-slate-500">Owner and Admin contacts with direct WhatsApp support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {AURUM_ADMINS.map((admin) => (
              <div key={admin.email} className="rounded-2xl bg-slate-50 p-5 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-sm">{admin.name}</h4>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${admin.role === 'Owner' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {admin.role}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <p>Email: <strong className="text-slate-900">{admin.email}</strong></p>
                  <p>Cell / WhatsApp: <strong className="text-slate-900">{admin.phone}</strong></p>
                </div>
                <a
                  href={`https://wa.me/${admin.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adjust Due Date Modal */}
      {adjustingLoanId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Adjust Payment Due Date</h3>
            <p className="text-xs text-slate-500">Set a new repayment due date for loan #{adjustingLoanId}</p>

            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-900 focus:outline-hidden"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setAdjustingLoanId(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onAdjustDueDate(adjustingLoanId, newDueDate);
                  setAdjustingLoanId(null);
                }}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
              >
                Save New Date
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Client (Nyasha & Kenny Portal)</h3>
              <button onClick={() => setShowAddClientModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={newClientData.fullName}
                  onChange={(e) => setNewClientData({ ...newClientData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email</label>
                  <input
                    type="email"
                    value={newClientData.email}
                    onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={newClientData.phone}
                    onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">SA ID Number</label>
                  <input
                    type="text"
                    value={newClientData.idNumber}
                    onChange={(e) => setNewClientData({ ...newClientData, idNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Monthly Income (ZAR)</label>
                  <input
                    type="number"
                    value={newClientData.monthlyIncome}
                    onChange={(e) => setNewClientData({ ...newClientData, monthlyIncome: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Address</label>
                <input
                  type="text"
                  value={newClientData.address}
                  onChange={(e) => setNewClientData({ ...newClientData, address: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Bank Name</label>
                  <input
                    type="text"
                    value={newClientData.bankName}
                    onChange={(e) => setNewClientData({ ...newClientData, bankName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Account Number</label>
                  <input
                    type="text"
                    value={newClientData.accountNumber}
                    onChange={(e) => setNewClientData({ ...newClientData, accountNumber: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-6 py-3 font-bold text-white shadow-md hover:bg-slate-800 transition"
                >
                  Create Client Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Inspection Modal */}
      {selectedReviewLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Verification Inspection (Nyasha & Kenny)</h3>
                <p className="text-xs text-slate-500">Client: {selectedReviewLoan.clientName}</p>
              </div>
              <button
                onClick={() => setSelectedReviewLoan(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">ID Document</span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{selectedReviewLoan.idDocumentName}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    Verified Match
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
                <span className="rounded-2xl font-bold text-slate-900 uppercase tracking-wider text-[10px]">3-Month Bank Statement</span>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{selectedReviewLoan.bankStatementName}</span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                    Sufficient Cashflow
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  onRejectLoan(selectedReviewLoan.id);
                  setSelectedReviewLoan(null);
                }}
                className="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100 transition border border-red-200"
              >
                Reject Application
              </button>
              <button
                onClick={() => {
                  onApproveLoan(selectedReviewLoan.id);
                  setSelectedReviewLoan(null);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                Approve & Disburse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
