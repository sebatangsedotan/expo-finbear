import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ExpenseForm } from './components/expense-form'
import { IncomeForm } from './components/income-form'

export const CreateTransactionPage = ({
  transactionType
}: {
  transactionType?: 'income' | 'expense'
}) => {
  const router = useRouter()
  const [trxType, setTrxType] = useState(transactionType ?? 'expense')
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#71717a" />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-semibold text-zinc-900 dark:text-white text-center mr-8">
          {trxType === 'expense' ? 'Add Expense' : 'Add Income'}
        </Text>
      </View>
      {/* Toggle */}
      <View className="flex-row mx-6 mt-6 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        <TouchableOpacity
          onPress={() => setTrxType('expense')}
          className={`flex-1 py-3 rounded-lg ${trxType === 'expense' ? 'bg-white dark:bg-zinc-700' : ''}`}
          style={
            trxType === 'expense'
              ? {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1
                }
              : undefined
          }
        >
          <Text
            className={`text-center font-semibold ${trxType === 'expense' ? 'text-red-600' : 'text-zinc-500'}`}
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTrxType('income')}
          className={`flex-1 py-3 rounded-lg ${trxType === 'income' ? 'bg-white dark:bg-zinc-700' : ''}`}
          style={
            trxType === 'income'
              ? {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1
                }
              : undefined
          }
        >
          <Text
            className={`text-center font-semibold ${trxType === 'income' ? 'text-emerald-600' : 'text-zinc-500'}`}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-6">
        {trxType === 'expense' ? <ExpenseForm /> : <IncomeForm />}
      </View>
    </SafeAreaView>
  )
}
