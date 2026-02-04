import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { createTransaction } from '@/src/services/transaction/create-transaction.service'
import {
  getAccounts,
  getCategories
} from '@/src/services/transaction/get-transactions.service'
import { Account, Category } from '@/src/types/database'

export const ExpenseForm = () => {
  const router = useRouter()
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showAccountPicker, setShowAccountPicker] = useState(false)

  const [categories, setCategories] = useState<Category[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, accountsData] = await Promise.all([
          getCategories('expense'),
          getAccounts()
        ])
        setCategories(categoriesData)
        setAccounts(accountsData)

        if (accountsData.length > 0) {
          setSelectedAccount(accountsData[0].id)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        Alert.alert('Error', 'Failed to load categories and accounts')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory)
  const selectedAccountData = accounts.find((a) => a.id === selectedAccount)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
  }

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category')
      return
    }
    if (!selectedAccount) {
      Alert.alert('Error', 'Please select an account')
      return
    }

    setSubmitting(true)
    try {
      await createTransaction({
        amount: Number(amount),
        type: 'expense',
        category_name: selectedCategoryData?.name || '',
        account_id: selectedAccount,
        description: description || undefined,
        date: new Date().toISOString().split('T')[0]
      })
      Alert.alert('Success', 'Expense added successfully', [
        { text: 'OK', onPress: () => router.replace('/transactions') }
      ])
    } catch (error) {
      console.error('Failed to create transaction:', error)
      Alert.alert('Error', 'Failed to add expense')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        className="flex-1"
      >
        {/* Amount Input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
            Amount
          </Text>
          <View className="flex-row items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 h-16 border border-zinc-200 dark:border-zinc-800">
            <Text className="text-xl font-bold text-red-500 mr-2">Rp</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor="#a1a1aa"
              className="flex-1 text-2xl font-bold text-zinc-900 dark:text-white"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Category Selector */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
            Category
          </Text>
          <TouchableOpacity
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
            className="flex-row items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 h-14 border border-zinc-200 dark:border-zinc-800"
          >
            {selectedCategoryData ? (
              <>
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{
                    backgroundColor:
                      (selectedCategoryData.color || '#ef4444') + '20'
                  }}
                >
                  <Ionicons
                    name={(selectedCategoryData.icon as any) || 'restaurant'}
                    size={20}
                    color={selectedCategoryData.color || '#ef4444'}
                  />
                </View>
                <Text className="flex-1 text-zinc-900 dark:text-white font-medium">
                  {selectedCategoryData.name}
                </Text>
              </>
            ) : (
              <Text className="flex-1 text-zinc-400">Select a category</Text>
            )}
            <Ionicons
              name={showCategoryPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#71717a"
            />
          </TouchableOpacity>

          {/* Category Grid */}
          {showCategoryPicker && (
            <View className="mt-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-3 border border-zinc-200 dark:border-zinc-800">
              <View className="flex-row flex-wrap">
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => {
                      setSelectedCategory(category.id)
                      setShowCategoryPicker(false)
                    }}
                    className={`w-1/4 items-center py-3 ${
                      selectedCategory === category.id
                        ? 'opacity-100'
                        : 'opacity-70'
                    }`}
                  >
                    <View
                      className={`w-12 h-12 rounded-2xl items-center justify-center mb-2 ${
                        selectedCategory === category.id
                          ? 'border-2 border-red-500'
                          : ''
                      }`}
                      style={{
                        backgroundColor: (category.color || '#ef4444') + '20'
                      }}
                    >
                      <Ionicons
                        name={(category.icon as any) || 'restaurant'}
                        size={24}
                        color={category.color || '#ef4444'}
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      className="text-[10px] text-center text-zinc-600 dark:text-zinc-300 font-medium px-1"
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Account Selector */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
            From Account
          </Text>
          <TouchableOpacity
            onPress={() => setShowAccountPicker(!showAccountPicker)}
            className="flex-row items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 h-14 border border-zinc-200 dark:border-zinc-800"
          >
            {selectedAccountData ? (
              <>
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{
                    backgroundColor: '#3b82f620'
                  }}
                >
                  <Ionicons name="wallet" size={20} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-zinc-900 dark:text-white font-medium">
                    {selectedAccountData.name}
                  </Text>
                  <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                    Balance: {formatCurrency(selectedAccountData.balance)}
                  </Text>
                </View>
              </>
            ) : (
              <Text className="flex-1 text-zinc-400">Select an account</Text>
            )}
            <Ionicons
              name={showAccountPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#71717a"
            />
          </TouchableOpacity>

          {/* Account List */}
          {showAccountPicker && (
            <View className="mt-3 bg-zinc-50 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              {accounts.map((account, index) => (
                <TouchableOpacity
                  key={account.id}
                  onPress={() => {
                    setSelectedAccount(account.id)
                    setShowAccountPicker(false)
                  }}
                  className={`flex-row items-center px-4 py-3 ${
                    index !== accounts.length - 1
                      ? 'border-b border-zinc-200 dark:border-zinc-800'
                      : ''
                  } ${selectedAccount === account.id ? 'bg-red-50 dark:bg-red-900/20' : ''}`}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: '#3b82f620' }}
                  >
                    <Ionicons name="wallet" size={20} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-zinc-900 dark:text-white font-medium">
                      {account.name}
                    </Text>
                    <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatCurrency(account.balance)}
                    </Text>
                  </View>
                  {selectedAccount === account.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#ef4444"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Description Input */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
            Description (Optional)
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Add a note..."
            placeholderTextColor="#a1a1aa"
            className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 py-4 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Date Picker (Static for now) */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 ml-1">
            Date
          </Text>
          <View className="flex-row items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 h-14 border border-zinc-200 dark:border-zinc-800 opacity-60">
            <Ionicons name="calendar-outline" size={20} color="#71717a" />
            <Text className="flex-1 text-zinc-900 dark:text-white ml-3 font-medium">
              Today,{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitting}
          className="bg-red-500 h-14 rounded-2xl items-center justify-center shadow-lg mt-4"
          activeOpacity={0.8}
        >
          {submitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Add Expense</Text>
          )}
        </TouchableOpacity>

        <View className="h-12" />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
