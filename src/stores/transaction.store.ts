import { apiClient } from '@/src/lib/api-client'
import { Transaction as DbTransaction } from '@/src/types/database'
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

interface DashboardSummary {
  total_balance: string
  monthly_stats: {
    income: string
    expense: string
    net: string
    period: string
  }
  recent_transactions: DbTransaction[]
  top_expense_categories: { name: string; total: number }[]
}

interface TransactionState {
  transactions: Transaction[]
  savingsGoals: SavingsGoal[]
  totalBalance: number
  isLoading: boolean
  monthlyStats: DashboardSummary['monthly_stats'] | null

  // Actions
  fetchDashboard: () => Promise<void>
  fetchTransactions: () => Promise<void>
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
  deleteTransaction: (id: string) => void
  getRecentTransactions: (limit?: number) => Transaction[]
}

const mapDbTransactionToStore = (dbTx: DbTransaction): Transaction => ({
  id: dbTx.id,
  title: dbTx.description || 'Transaction',
  category: dbTx.category_name || 'General',
  amount: Number(dbTx.amount) * (dbTx.type === 'expense' ? -1 : 1),
  date: new Date(dbTx.date).toLocaleDateString(),
  icon: dbTx.category?.icon || 'cash',
  iconColor: dbTx.category?.color || '#3b82f6',
  backgroundColor: 'bg-blue-50'
})

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  savingsGoals: [],
  totalBalance: 0,
  isLoading: false,
  monthlyStats: null,

  fetchDashboard: async () => {
    set({ isLoading: true })
    try {
      const summary =
        await apiClient.get<DashboardSummary>('/dashboard/summary')
      set({
        totalBalance: Number(summary.total_balance),
        monthlyStats: summary.monthly_stats,
        transactions: summary.recent_transactions.map(mapDbTransactionToStore)
      })
    } catch (error) {
      console.error('Failed to fetch dashboard:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTransactions: async () => {
    set({ isLoading: true })
    try {
      const data = await apiClient.get<{ transactions: DbTransaction[] }>(
        '/transactions'
      )
      set({
        transactions: data.transactions.map(mapDbTransactionToStore)
      })
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  addTransaction: (tx) => {
    // Local state update (optimistic or manual)
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
