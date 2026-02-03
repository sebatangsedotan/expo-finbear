import { CreateTransactionPage } from '@/src/features/transaction/create/create-transaction-page'
import { useLocalSearchParams } from 'expo-router'

export default function AddTransactionScreen() {
  const { type } = useLocalSearchParams<{ type?: 'income' | 'expense' }>()
  return <CreateTransactionPage transactionType={type} />
}
