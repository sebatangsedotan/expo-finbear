import { apiClient } from '@/src/lib/api-client'
import { Transaction } from '@/src/types/database'

export type CreateTransactionParams = {
  account_id: string
  category_name: string
  amount: number
  type: 'income' | 'expense'
  date: string
  description?: string
}

export const createTransaction = async (params: CreateTransactionParams) => {
  const data = await apiClient.post<Transaction>('/transactions', params)
  return data
}
