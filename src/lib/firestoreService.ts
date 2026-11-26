import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase.ts';
import { ClientProfile, LoanApplication, Transaction, StokvelGroup } from '../types';

export async function saveClientToFirestore(client: ClientProfile) {
  try {
    const docRef = doc(db, 'clients', client.id);
    await setDoc(docRef, client, { merge: true });
  } catch (err) {
    console.error('Error saving client to Firestore:', err);
  }
}

export async function saveLoanToFirestore(loan: LoanApplication) {
  try {
    const docRef = doc(db, 'loans', loan.id);
    await setDoc(docRef, loan, { merge: true });
  } catch (err) {
    console.error('Error saving loan to Firestore:', err);
  }
}

export async function updateLoanStatusFirestore(loanId: string, status: string) {
  try {
    const docRef = doc(db, 'loans', loanId);
    await updateDoc(docRef, { status });
  } catch (err) {
    console.error('Error updating loan status in Firestore:', err);
  }
}

export async function saveTransactionToFirestore(tx: Transaction) {
  try {
    const docRef = doc(db, 'transactions', tx.id);
    await setDoc(docRef, tx, { merge: true });
  } catch (err) {
    console.error('Error saving transaction to Firestore:', err);
  }
}

export async function saveStokvelToFirestore(stk: StokvelGroup) {
  try {
    const docRef = doc(db, 'stokvels', stk.id);
    await setDoc(docRef, stk, { merge: true });
  } catch (err) {
    console.error('Error saving stokvel to Firestore:', err);
  }
}
