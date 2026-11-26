import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase.ts';
import { UserRole, ClientProfile, LoanApplication, Transaction, NotificationItem, StokvelGroup, OwnerBankingDetails } from './types';
import { INITIAL_CLIENT, INITIAL_LOANS, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS, INITIAL_STOKVELS, INITIAL_OWNER_BANKING } from './mockData';
import { saveClientToFirestore, saveLoanToFirestore, updateLoanStatusFirestore, saveTransactionToFirestore, saveStokvelToFirestore } from './lib/firestoreService.ts';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { Navbar } from './components/Navbar';
import { ClientDashboard } from './components/ClientDashboard';
import { PaymentPortal } from './components/PaymentPortal';
import { LoanStatement } from './components/LoanStatement';
import { TransactionHistory } from './components/TransactionHistory';
import { ClientProfile as ClientProfileView } from './components/ClientProfile';
import { OwnerDashboard } from './components/OwnerDashboard';
import { StokvelManager } from './components/StokvelManager';
import { CalendarView } from './components/CalendarView';
import { LoanAgreementContract } from './components/LoanAgreementContract';
import { ClockDialog } from './components/ClockDialog';
import { LoanApplicationModal } from './components/LoanApplicationModal';
import { TermsModal } from './components/TermsModal';

export default function App() {
  const [showLanding, setShowLanding] = useState<boolean>(() => {
    const saved = localStorage.getItem('aurum_show_landing');
    return saved ? JSON.parse(saved) : true;
  });

  const [authModalConfig, setAuthModalConfig] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('credipulse_role');
    return (saved as UserRole) || 'client';
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem('credipulse_tab');
    return saved || 'dashboard';
  });

  const [activeOwnerTab, setActiveOwnerTab] = useState<string>('overview');

  const [client, setClient] = useState<ClientProfile>(() => {
    const saved = localStorage.getItem('credipulse_client');
    return saved ? JSON.parse(saved) : INITIAL_CLIENT;
  });

  const [clientsList, setClientsList] = useState<ClientProfile[]>([INITIAL_CLIENT]);
  const [loans, setLoans] = useState<LoanApplication[]>(INITIAL_LOANS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [stokvels, setStokvels] = useState<StokvelGroup[]>(INITIAL_STOKVELS);

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('credipulse_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [ownerBanking, setOwnerBanking] = useState<OwnerBankingDetails>(() => {
    const saved = localStorage.getItem('aurum_owner_banking');
    return saved ? JSON.parse(saved) : INITIAL_OWNER_BANKING;
  });

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);

  // Real-time Firestore synchronization for production mode
  useEffect(() => {
    const unsubClients = onSnapshot(collection(db, 'clients'), (snapshot) => {
      const fetched: ClientProfile[] = [];
      snapshot.forEach((doc) => fetched.push(doc.data() as ClientProfile));
      if (fetched.length > 0) {
        setClientsList(fetched);
      }
    }, (err) => console.error('Firestore clients sync error:', err));

    const unsubLoans = onSnapshot(collection(db, 'loans'), (snapshot) => {
      const fetched: LoanApplication[] = [];
      snapshot.forEach((doc) => fetched.push(doc.data() as LoanApplication));
      if (fetched.length > 0) {
        setLoans(fetched);
      }
    }, (err) => console.error('Firestore loans sync error:', err));

    const unsubTx = onSnapshot(collection(db, 'transactions'), (snapshot) => {
      const fetched: Transaction[] = [];
      snapshot.forEach((doc) => fetched.push(doc.data() as Transaction));
      if (fetched.length > 0) {
        setTransactions(fetched);
      }
    }, (err) => console.error('Firestore transactions sync error:', err));

    const unsubStk = onSnapshot(collection(db, 'stokvels'), (snapshot) => {
      const fetched: StokvelGroup[] = [];
      snapshot.forEach((doc) => fetched.push(doc.data() as StokvelGroup));
      if (fetched.length > 0) {
        setStokvels(fetched);
      }
    }, (err) => console.error('Firestore stokvels sync error:', err));

    return () => {
      unsubClients();
      unsubLoans();
      unsubTx();
      unsubStk();
    };
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('aurum_show_landing', JSON.stringify(showLanding));
    localStorage.setItem('credipulse_role', currentRole);
    localStorage.setItem('credipulse_tab', activeTab);
    localStorage.setItem('credipulse_client', JSON.stringify(client));
    localStorage.setItem('credipulse_notifications', JSON.stringify(notifications));
    localStorage.setItem('aurum_owner_banking', JSON.stringify(ownerBanking));
  }, [showLanding, currentRole, activeTab, client, notifications, ownerBanking]);

  // Handlers
  const handleLogin = (role: UserRole, identifier: string) => {
    setCurrentRole(role);
    setShowLanding(false);
    setActiveTab(role === 'client' ? 'dashboard' : 'owner_dashboard');
  };

  const handleRegister = (newClient: ClientProfile) => {
    setClient(newClient);
    saveClientToFirestore(newClient);
    setCurrentRole('client');
    setShowLanding(false);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setShowLanding(true);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleSubmitApplication = (newLoanData: Omit<LoanApplication, 'id' | 'status' | 'applicationDate'>) => {
    const newLoan: LoanApplication = {
      ...newLoanData,
      id: `loan-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      applicationDate: new Date().toISOString().split('T')[0],
    };

    saveLoanToFirestore(newLoan);
    setLoans((prev) => [newLoan, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      clientId: client.id,
      title: 'Loan Application Submitted',
      message: `Your application for R${newLoan.loanAmount} has been submitted for Nyasha Michaels & Kenny Mathunywa review.`,
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'approval',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handlePaymentSuccess = (newTx: Omit<Transaction, 'id' | 'timestamp'>) => {
    const tx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
    };

    saveTransactionToFirestore(tx);
    setTransactions((prev) => [tx, ...prev]);

    updateLoanStatusFirestore(tx.loanId, 'paid');
    setLoans((prev) =>
      prev.map((l) =>
        l.id === tx.loanId ? { ...l, status: 'paid' } : l
      )
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      clientId: client.id,
      title: 'Repayment Successful',
      message: `Your payment of R${tx.amount} via ${tx.bankUsed} was successful. Loan settled!`,
      date: new Date().toISOString().split('T')[0],
      read: false,
      type: 'payment',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleApproveLoan = (loanId: string) => {
    updateLoanStatusFirestore(loanId, 'active');
    setLoans((prev) =>
      prev.map((l) => (l.id === loanId ? { ...l, status: 'active' } : l))
    );

    const targetLoan = loans.find((l) => l.id === loanId);
    if (targetLoan) {
      const disburseTx: Transaction = {
        id: `tx-${Date.now()}`,
        loanId: targetLoan.id,
        clientId: targetLoan.clientId,
        clientName: targetLoan.clientName,
        type: 'disbursement',
        amount: targetLoan.loanAmount,
        bankUsed: client.bankName,
        referenceNumber: `DISB-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleString(),
        status: 'success',
      };
      saveTransactionToFirestore(disburseTx);
      setTransactions((prev) => [disburseTx, ...prev]);

      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        clientId: targetLoan.clientId,
        title: `Loan #${targetLoan.id} Approved!`,
        message: `Your loan of R${targetLoan.loanAmount} has been approved and disbursed by Aurum Capital management (Nyasha & Kenny).`,
        date: new Date().toISOString().split('T')[0],
        read: false,
        type: 'approval',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const handleRejectLoan = (loanId: string) => {
    updateLoanStatusFirestore(loanId, 'rejected');
    setLoans((prev) =>
      prev.map((l) => (l.id === loanId ? { ...l, status: 'rejected' } : l))
    );
  };

  const handleAdjustDueDate = (loanId: string, newDate: string) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.id === loanId) {
          const updated = { ...l, dueDate: newDate };
          saveLoanToFirestore(updated);
          return updated;
        }
        return l;
      })
    );
  };

  const handleAddClient = (newClient: ClientProfile) => {
    setClient(newClient);
    saveClientToFirestore(newClient);
  };

  const handleAddStokvel = (newStkData: Omit<StokvelGroup, 'id' | 'membersCount' | 'totalPool'>) => {
    const newStk: StokvelGroup = {
      ...newStkData,
      id: `stk-${Date.now()}`,
      membersCount: 1,
      totalPool: newStkData.contributionAmount,
      joined: true,
    };
    saveStokvelToFirestore(newStk);
    setStokvels((prev) => [newStk, ...prev]);
  };

  const handleJoinStokvel = (id: string) => {
    setStokvels((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, joined: !s.joined, membersCount: s.joined ? s.membersCount - 1 : s.membersCount + 1 };
          saveStokvelToFirestore(updated);
          return updated;
        }
        return s;
      })
    );
  };

  if (showLanding) {
    return (
      <>
        <LandingPage
          onOpenAuth={(mode) => setAuthModalConfig({ isOpen: true, mode })}
          onEnterGuest={() => setShowLanding(false)}
        />
        <AuthModal
          isOpen={authModalConfig.isOpen}
          initialMode={authModalConfig.mode}
          onClose={() => setAuthModalConfig({ ...authModalConfig, isOpen: false })}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50/30 text-slate-900 font-sans antialiased flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Navbar
        currentRole={currentRole}
        onRoleSwitch={setCurrentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onClearAllNotifications={handleClearAllNotifications}
        clientName={client.fullName}
        onLogout={handleLogout}
        onOpenClock={() => setIsClockOpen(true)}
      />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {activeTab === 'calendar' ? (
          <CalendarView loans={loans} stokvels={stokvels} />
        ) : activeTab === 'contract' ? (
          <LoanAgreementContract client={client} activeLoan={loans.find((l) => l.status === 'active')} />
        ) : currentRole === 'client' ? (
          <>
            {activeTab === 'dashboard' && (
              <ClientDashboard
                client={client}
                loans={loans}
                notifications={notifications}
                onOpenApplyModal={() => setIsApplyModalOpen(true)}
                onNavigateTab={setActiveTab}
              />
            )}
            {activeTab === 'payment' && (
              <PaymentPortal
                activeLoan={loans.find((l) => l.status === 'active')}
                ownerBanking={ownerBanking}
                onPaymentSuccess={handlePaymentSuccess}
              />
            )}
            {activeTab === 'stokvels' && (
              <StokvelManager
                stokvels={stokvels}
                currentRole={currentRole}
                onAddStokvel={handleAddStokvel}
                onJoinStokvel={handleJoinStokvel}
              />
            )}
            {activeTab === 'statement' && (
              <LoanStatement
                client={client}
                loans={loans}
                transactions={transactions}
                onPayNowClick={() => setActiveTab('payment')}
              />
            )}
            {activeTab === 'history' && (
              <TransactionHistory transactions={transactions} />
            )}
            {activeTab === 'profile' && (
              <ClientProfileView client={client} onUpdateClient={(c) => { setClient(c); saveClientToFirestore(c); }} />
            )}
          </>
        ) : (
          <>
            {activeTab === 'stokvels' ? (
              <StokvelManager
                stokvels={stokvels}
                currentRole={currentRole}
                onAddStokvel={handleAddStokvel}
                onJoinStokvel={handleJoinStokvel}
              />
            ) : activeTab === 'owner_calendar' ? (
              <CalendarView loans={loans} stokvels={stokvels} />
            ) : (
              <OwnerDashboard
                loans={loans}
                clients={clientsList}
                transactions={transactions}
                ownerBanking={ownerBanking}
                onUpdateOwnerBanking={setOwnerBanking}
                onApproveLoan={handleApproveLoan}
                onRejectLoan={handleRejectLoan}
                onAdjustDueDate={handleAdjustDueDate}
                onAddClient={handleAddClient}
                activeOwnerTab={activeOwnerTab}
                setActiveOwnerTab={setActiveOwnerTab}
              />
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <LoanApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        client={client}
        onSubmitApplication={handleSubmitApplication}
        onOpenTerms={() => setIsTermsModalOpen(true)}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      <ClockDialog
        isOpen={isClockOpen}
        onClose={() => setIsClockOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Aurum Capital & CrediPulse Loan Management & Stokvel Portal.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('contract')} className="hover:underline font-bold text-amber-700">
              Loan Agreement & Digital Contract
            </button>
            <span>•</span>
            <span className="text-amber-700 font-semibold">Aurum Capital (Nyasha & Kenny)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
