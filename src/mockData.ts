import { ClientProfile, LoanApplication, Transaction, BankOption, NotificationItem } from './types';

export const SOUTH_AFRICAN_BANKS: BankOption[] = [
  {
    id: 'capitec',
    name: 'Capitec Bank',
    logoColor: 'bg-red-600',
    ussdCode: '*120*3279#',
    loginUrl: 'https://www.capitecbank.co.za',
    popular: true,
  },
  {
    id: 'fnb',
    name: 'First National Bank (FNB)',
    logoColor: 'bg-yellow-500',
    ussdCode: '*120*321#',
    loginUrl: 'https://www.fnb.co.za',
    popular: true,
  },
  {
    id: 'absa',
    name: 'Absa Bank',
    logoColor: 'bg-red-700',
    ussdCode: '*120*22727#',
    loginUrl: 'https://www.absa.co.za',
    popular: true,
  },
  {
    id: 'standard',
    name: 'Standard Bank',
    logoColor: 'bg-blue-600',
    ussdCode: '*120*2345#',
    loginUrl: 'https://www.standardbank.co.za',
    popular: true,
  },
  {
    id: 'nedbank',
    name: 'Nedbank',
    logoColor: 'bg-emerald-600',
    ussdCode: '*120*001#',
    loginUrl: 'https://www.nedbank.co.za',
    popular: true,
  },
  {
    id: 'tymebank',
    name: 'TymeBank',
    logoColor: 'bg-amber-500',
    ussdCode: '*120*543#',
    loginUrl: 'https://www.tymebank.co.za',
    popular: false,
  },
  {
    id: 'african',
    name: 'African Bank',
    logoColor: 'bg-orange-600',
    ussdCode: '*120*3211#',
    loginUrl: 'https://www.africanbank.co.za',
    popular: false,
  },
  {
    id: 'discovery',
    name: 'Discovery Bank',
    logoColor: 'bg-violet-600',
    ussdCode: '*120*1122#',
    loginUrl: 'https://www.discovery.co.za',
    popular: false,
  },
];

export const INITIAL_CLIENT: ClientProfile = {
  id: 'client-001',
  fullName: 'Thabo Mokoena',
  email: 'thabo.mokoena@gmail.com',
  phone: '072 555 1234',
  idNumber: '9506145882084',
  address: '14 Vilakazi Street, Orlando West, Soweto, 1804',
  employmentStatus: 'Employed',
  employerName: 'Sandton Logistics Pty Ltd',
  monthlyIncome: 8500,
  bankName: 'Capitec Bank',
  accountNumber: '1482939210',
  accountType: 'Savings',
  idDocumentName: 'Thabo_Mokoena_RSA_ID.pdf',
  bankStatementName: 'Capitec_3Month_Statement_Oct2026.pdf',
  proofOfResidenceName: 'Municipal_Bill_Soweto.pdf',
};

export const INITIAL_LOANS: LoanApplication[] = [
  {
    id: 'loan-101',
    clientId: 'client-001',
    clientName: 'Thabo Mokoena',
    loanAmount: 100,
    repaymentAmount: 150, // Rule: R100 loan -> R150 return (or R50 fee/interest)
    termDays: 30,
    applicationDate: '2026-11-01',
    dueDate: '2026-12-01',
    status: 'active',
    bankStatementName: 'Capitec_3Month_Statement_Oct2026.pdf',
    idDocumentName: 'Thabo_Mokoena_RSA_ID.pdf',
    notes: 'Approved by Owner. First-time client verified via home affairs & bank statement.',
  },
  {
    id: 'loan-102',
    clientId: 'client-002',
    clientName: 'Sipho Zulu',
    loanAmount: 50,
    repaymentAmount: 75, // Rule: R50 loan -> R75 return
    termDays: 14,
    applicationDate: '2026-11-20',
    dueDate: '2026-12-04',
    status: 'pending',
    bankStatementName: 'FNB_Statement_Nov2026.pdf',
    idDocumentName: 'Sipho_Zulu_ID.pdf',
    notes: 'Awaiting ID verification & 3-month statement review.',
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-501',
    loanId: 'loan-101',
    clientId: 'client-001',
    clientName: 'Thabo Mokoena',
    type: 'disbursement',
    amount: 100,
    bankUsed: 'Capitec Bank',
    referenceNumber: 'DISB-ZA-994821',
    timestamp: '2026-11-01 10:15 AM',
    status: 'success',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    clientId: 'client-001',
    title: 'Upcoming Loan Due Date',
    message: 'Your loan repayment of R150 for Loan #101 is due on 01 Dec 2026. Pay instantly via the payment portal.',
    date: '2026-11-25',
    read: false,
    type: 'reminder',
  },
  {
    id: 'notif-2',
    clientId: 'client-001',
    title: 'Loan #101 Approved!',
    message: 'Your loan application of R100 has been approved and disbursed to your Capitec account.',
    date: '2026-11-01',
    read: true,
    type: 'approval',
  },
];

export const INITIAL_STOKVELS = [
  {
    id: 'stk-01',
    name: 'Aurum Family Festive Savings',
    description: 'Monthly Stokvel pool for December grocery and holiday expenses with guaranteed payouts.',
    contributionAmount: 250,
    frequency: 'Monthly' as const,
    membersCount: 12,
    totalPool: 3000,
    nextPayoutDate: '2026-12-15',
    category: 'Grocery' as const,
    joined: true,
  },
  {
    id: 'stk-02',
    name: 'Soweto Business Growth Pool',
    description: 'Micro-investment revolving stokvel to fund local entrepreneurial ventures and working capital.',
    contributionAmount: 500,
    frequency: 'Monthly' as const,
    membersCount: 8,
    totalPool: 4000,
    nextPayoutDate: '2026-12-01',
    category: 'Investment' as const,
    joined: false,
  },
];
