import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

// Dummy data for income categories
const INCOME_CATEGORIES = [
  { id: '1', name: 'Salary', icon: 'briefcase', color: '#10b981' },
  { id: '2', name: 'Freelance', icon: 'laptop', color: '#06b6d4' },
  { id: '3', name: 'Investment', icon: 'trending-up', color: '#8b5cf6' },
  { id: '4', name: 'Gift', icon: 'gift', color: '#ec4899' },
  { id: '5', name: 'Refund', icon: 'arrow-undo', color: '#f97316' },
  { id: '6', name: 'Bonus', icon: 'star', color: '#eab308' },
  { id: '7', name: 'Cashback', icon: 'cash', color: '#14b8a6' },
  { id: '8', name: 'Others', icon: 'ellipsis-horizontal', color: '#6b7280' }
] as const

// Dummy data for accounts
const ACCOUNTS = [
  {
    id: '1',
    name: 'Main Wallet',
    balance: 2500000,
    icon: 'wallet',
    color: '#3b82f6'
  },
  {
    id: '2',
    name: 'Bank BCA',
    balance: 15000000,
    icon: 'card',
    color: '#0369a1'
  },
  { id: '3', name: 'Cash', balance: 500000, icon: 'cash', color: '#16a34a' }
] as const

export const IncomeForm = () => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>('1')
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showAccountPicker, setShowAccountPicker] = useState(false)

  const selectedCategoryData = INCOME_CATEGORIES.find(
    (c) => c.id === selectedCategory
  )
  const selectedAccountData = ACCOUNTS.find((a) => a.id === selectedAccount)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value)
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
            <Text className="text-xl font-bold text-emerald-500 mr-2">Rp</Text>
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
                  style={{ backgroundColor: selectedCategoryData.color + '20' }}
                >
                  <Ionicons
                    name={selectedCategoryData.icon as any}
                    size={20}
                    color={selectedCategoryData.color}
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
                {INCOME_CATEGORIES.map((category) => (
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
                          ? 'border-2 border-emerald-500'
                          : ''
                      }`}
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      <Ionicons
                        name={category.icon as any}
                        size={24}
                        color={category.color}
                      />
                    </View>
                    <Text className="text-xs text-center text-zinc-600 dark:text-zinc-300 font-medium">
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
            To Account
          </Text>
          <TouchableOpacity
            onPress={() => setShowAccountPicker(!showAccountPicker)}
            className="flex-row items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 h-14 border border-zinc-200 dark:border-zinc-800"
          >
            {selectedAccountData ? (
              <>
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: selectedAccountData.color + '20' }}
                >
                  <Ionicons
                    name={selectedAccountData.icon as any}
                    size={20}
                    color={selectedAccountData.color}
                  />
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
              {ACCOUNTS.map((account, index) => (
                <TouchableOpacity
                  key={account.id}
                  onPress={() => {
                    setSelectedAccount(account.id)
                    setShowAccountPicker(false)
                  }}
                  className={`flex-row items-center px-4 py-3 ${
                    index !== ACCOUNTS.length - 1
                      ? 'border-b border-zinc-200 dark:border-zinc-800'
                      : ''
                  } ${selectedAccount === account.id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: account.color + '20' }}
                  >
                    <Ionicons
                      name={account.icon as any}
                      size={20}
                      color={account.color}
                    />
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
                      color="#10b981"
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
          <TouchableOpacity className="flex-row items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 h-14 border border-zinc-200 dark:border-zinc-800">
            <Ionicons name="calendar-outline" size={20} color="#71717a" />
            <Text className="flex-1 text-zinc-900 dark:text-white ml-3 font-medium">
              Today,{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#71717a" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-emerald-500 h-14 rounded-2xl items-center justify-center shadow-lg mt-4"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-lg">Add Income</Text>
        </TouchableOpacity>

        <View className="h-8" />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
