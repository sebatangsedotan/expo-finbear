import { apiClient } from '@/src/lib/api-client'
import { Account, Category, Transaction } from '@/src/types/database'

export const getTransactions = async (): Promise<Transaction[]> => {
  const data = await apiClient.get<{ transactions: Transaction[] }>(
    '/transactions'
  )
  return data.transactions || []
}

export const getCategories = async (
  type?: 'income' | 'expense'
): Promise<Category[]> => {
  const endpoint = type ? `/categories?type=${type}` : '/categories'
  const data = await apiClient.get<{ categories: Category[] }>(endpoint)
  return data.categories || []
}

export const getAccounts = async (): Promise<Account[]> => {
  const data = await apiClient.get<{ accounts: Account[] }>('/accounts')
  return data.accounts || []
}
