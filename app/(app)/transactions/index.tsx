import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getTransactions } from '@/src/services/transaction/get-transactions.service'
import { Transaction } from '@/src/types/database'

export default function TransactionListScreen() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions()
      setTransactions(data)
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchTransactions()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const renderItem = ({ item }: { item: Transaction }) => {
    const isIncome = item.type === 'income'
    return (
      <View className="flex-row items-center bg-white dark:bg-zinc-900 p-4 mb-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-4"
          style={{
            backgroundColor:
              (item.category?.color || (isIncome ? '#10b981' : '#ef4444')) +
              '20'
          }}
        >
          <Ionicons
            name={
              (item.category?.icon as any) ||
              (isIncome ? 'arrow-down' : 'arrow-up')
            }
            size={24}
            color={item.category?.color || (isIncome ? '#10b981' : '#ef4444')}
          />
        </View>
        <View className="flex-1">
          <Text className="text-zinc-900 dark:text-white font-bold text-base">
            {item.category?.name || 'Uncategorized'}
          </Text>
          <Text className="text-zinc-500 dark:text-zinc-400 text-xs">
            {item.description || 'No description'}
          </Text>
        </View>
        <View className="items-end">
          <Text
            className={`font-bold text-base ${
              isIncome ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
          </Text>
          <Text className="text-zinc-400 dark:text-zinc-500 text-[10px]">
            {new Date(item.date).toLocaleDateString('en-ID', {
              day: 'numeric',
              month: 'short'
            })}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-white">
          History
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/transactions/add-transaction')}
          className="w-10 h-10 bg-emerald-500 rounded-full items-center justify-center shadow-md shadow-emerald-500/20"
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 18 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#10b981"
            />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <View className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full items-center justify-center mb-4">
                <Ionicons name="receipt-outline" size={40} color="#71717a" />
              </View>
              <Text className="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
                No transactions yet
              </Text>
              <Text className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
                Start by adding your first income or expense
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}
