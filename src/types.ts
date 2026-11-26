export type UserRole = 'client' | 'owner';

export interface ClientProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  address: string;
  employmentStatus: 'Employed' | 'Self-Employed' | 'Unemployed' | 'Student';
  employerName: string;
  monthlyIncome: number;
  bankName: string;
  accountNumber: string;
  accountType: 'Savings' | 'Cheque' | 'Current';
  idDocumentName?: string;
  bankStatementName?: string;
  proofOfResidenceName?: string;
}

export interface LoanApplication {
  id: string;
  clientId: string;
  clientName: string;
  loanAmount: number;
  repaymentAmount: number; // e.g., R50 -> R75 or R100 -> R150
  termDays: number;
  applicationDate: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'paid' | 'defaulted';
  bankStatementUrl?: string;
  idDocumentUrl?: string;
  bankStatementName?: string;
  idDocumentName?: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  loanId: string;
  clientId: string;
  clientName: string;
  type: 'disbursement' | 'repayment' | 'fee';
  amount: number;
  bankUsed?: string;
  referenceNumber: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

export interface NotificationItem {
  id: string;
  clientId?: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'reminder' | 'approval' | 'payment' | 'system';
}

export interface BankOption {
  id: string;
  name: string;
  logoColor: string;
  ussdCode: string;
  loginUrl: string;
  popular: boolean;
}

export interface StokvelGroup {
  id: string;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: 'Weekly' | 'Monthly' | 'Bi-Weekly';
  membersCount: number;
  totalPool: number;
  nextPayoutDate: string;
  category: 'Savings' | 'Grocery' | 'Investment' | 'Emergency';
  joined?: boolean;
}
