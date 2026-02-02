import { create } from 'zustand'

export interface Transaction {
  id: string
  title: string
  category: string
  amount: number
  date: string
  icon: string
  iconColor: string
  backgroundColor: string
}

export interface SavingsGoal {
  id: string
  title: string
  target: number
  current: number
  icon: string
}

interface TransactionState {
  transactions: Transaction[]
  savingsGoals: SavingsGoal[]
  totalBalance: number
  isLoading: boolean

  // Actions
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  getRecentTransactions: (limit?: number) => Transaction[]
}

// Mock data
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Apple Music',
    category: 'Entertainment',
    amount: -9.99,
    date: 'Today, 10:45 AM',
    icon: 'musical-notes',
    iconColor: '#db2777',
    backgroundColor: 'bg-pink-50'
  },
  {
    id: '2',
    title: 'Freelance Pay',
    category: 'Income',
    amount: 850.0,
    date: 'Yesterday',
    icon: 'cash',
    iconColor: '#059669',
    backgroundColor: 'bg-emerald-50'
  },
  {
    id: '3',
    title: 'Starbucks',
    category: 'Food & Drink',
    amount: -5.5,
    date: 'Jan 30',
    icon: 'cafe',
    iconColor: '#d97706',
    backgroundColor: 'bg-orange-50'
  },
  {
    id: '4',
    title: 'Gym Membership',
    category: 'Health',
    amount: -45.0,
    date: 'Jan 28',
    icon: 'fitness',
    iconColor: '#2563eb',
    backgroundColor: 'bg-blue-50'
  }
]

const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: '1',
    title: 'New MacBook Pro',
    target: 2400,
    current: 1800,
    icon: 'laptop'
  },
  {
    id: '2',
    title: 'Tokyo Trip',
    target: 5000,
    current: 1250,
    icon: 'airplane'
  }
]

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: MOCK_TRANSACTIONS,
  savingsGoals: MOCK_SAVINGS_GOALS,
  totalBalance: 12450.8,
  isLoading: false,

  addTransaction: (tx) => {
    const newTransaction: Transaction = {
      ...tx,
      id: 'tx_' + Date.now()
    }

    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
      totalBalance: state.totalBalance + tx.amount
    }))
  },

  deleteTransaction: (id) => {
    const transaction = get().transactions.find((t) => t.id === id)
    if (!transaction) return

    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
      totalBalance: state.totalBalance - transaction.amount
    }))
  },

  getRecentTransactions: (limit = 10) => {
    return get().transactions.slice(0, limit)
  }
}))
