import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddTransactionScreen() {
  const params = useLocalSearchParams<{ type?: 'income' | 'expense' }>()

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="arrow-back" size={24} color="#71717a" />
        </TouchableOpacity>
        <Text className="flex-1 text-lg font-semibold text-zinc-900 dark:text-white text-center mr-8">
          {params?.type === 'expense' ? 'Add Expense' : 'Add Income'}
        </Text>
      </View>

      {/* Toggle */}
      <View className="flex-row mx-6 mt-6 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        <TouchableOpacity
          onPress={() =>
            router.replace(
              '/(app)/transactions/add-transaction?type=expense' as any
            )
          }
          className={[
            'flex-1 py-3 rounded-lg',
            params?.type === 'expense' && 'bg-white dark:bg-zinc-700 shadow-sm'
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Text
            className={[
              'text-center font-semibold',
              params?.type === 'expense' ? 'text-red-600' : 'text-zinc-500'
            ].join(' ')}
          >
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.replace(
              '/(app)/transactions/add-transaction?type=income' as any
            )
          }
          className={[
            'flex-1 py-3 rounded-lg',
            params?.type === 'income' && 'bg-white dark:bg-zinc-700 shadow-sm'
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <Text
            className={[
              'text-center font-semibold',
              params?.type === 'income' ? 'text-emerald-600' : 'text-zinc-500'
            ].join(' ')}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-6">
        {params?.type === 'expense' ? (
          <Text className="text-red-600">Expense form here...</Text>
        ) : (
          <Text className="text-emerald-600">Income form here...</Text>
        )}
      </View>
    </SafeAreaView>
  )
}
