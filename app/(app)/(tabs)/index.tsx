import { useTransactionStore } from '@/src/stores'
import { useAuthStore } from '@/src/stores/auth.store'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user)
  const { transactions, savingsGoals, totalBalance, fetchDashboard } =
    useTransactionStore()

  useEffect(() => {
    fetchDashboard()
  }, [])

  // Format balance with dollars and cents
  const balanceDollars = Math.floor(totalBalance)
  const balanceCents = ((totalBalance % 1) * 100).toFixed(0).padStart(2, '0')

  // Calculate monthly change (mock: random positive)
  const monthlyChange = '+2.5%'

  // Get display name from user email
  const displayName = user?.email?.split('@')[0] || 'User'

  return (
    <View className="flex-1 bg-slate-50 pt-12">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 mt-10 flex-row justify-between items-center">
          <View>
            <Text className="text-slate-400 text-sm font-medium">
              Welcome back,
            </Text>
            <Text className="text-slate-900 text-xl font-bold">
              {displayName}
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity className="bg-white h-10 w-10 rounded-full items-center justify-center border border-slate-200 shadow-sm">
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#1e293b"
              />
            </TouchableOpacity>
            <View className="h-10 w-10 rounded-full bg-slate-200 border-2 border-blue-600 overflow-hidden">
              <Image
                source={require('@/assets/images/sinchan.png')}
                className="flex-1 w-full h-full"
              />
            </View>
          </View>
        </View>

        {/* Balance Card */}
        <View className="px-6 mt-4">
          <View className="bg-blue-600 p-6 rounded-[32px] overflow-hidden relative shadow-lg shadow-blue-200">
            <View className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/20 rounded-full" />
            <View className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />

            <Text className="text-blue-100 text-sm font-semibold uppercase tracking-wider">
              Total Balance
            </Text>
            <View className="flex-row items-end mt-2">
              <Text className="text-white text-4xl font-bold">
                ${balanceDollars.toLocaleString()}
              </Text>
              <Text className="text-blue-200 text-2xl font-bold pb-1 ml-1">
                .{balanceCents}
              </Text>
            </View>

            <View className="flex-row items-center mt-6 bg-white/20 self-start px-3 py-1 rounded-full">
              <Ionicons name="trending-up" size={14} color="white" />
              <Text className="text-white text-xs font-bold ml-1">
                {monthlyChange} this month
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between px-6 mt-8">
          {[
            {
              icon: 'arrow-up',
              label: 'Send',
              color: 'bg-blue-50',
              iconColor: '#2563eb',
              redirectPath: '/(app)/transactions/add-transaction?type=expense'
            },
            {
              icon: 'arrow-down',
              label: 'Receive',
              color: 'bg-emerald-50',
              iconColor: '#059669',
              redirectPath: '/(app)/transactions/add-transaction?type=income'
            },
            {
              icon: 'grid',
              label: 'Transaction',
              color: 'bg-indigo-50',
              iconColor: '#4f46e5',
              redirectPath: '/(app)/transactions'
            },
            {
              icon: 'swap-horizontal',
              label: 'Convert',
              color: 'bg-orange-50',
              iconColor: '#ea580c'
            }
          ].map((action, idx) => (
            <View key={idx} className="items-center gap-2">
              <TouchableOpacity
                className={`${action.color} h-14 w-14 rounded-2xl items-center justify-center border border-white shadow-sm`}
                onPress={() => {
                  action.redirectPath && router.push(action.redirectPath as any)
                }}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.iconColor}
                />
              </TouchableOpacity>
              <Text className="text-slate-600 text-xs font-medium">
                {action.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Savings Goals */}
        <View className="px-6 mt-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 text-lg font-bold">
              Savings Goals
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 text-sm font-semibold">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {savingsGoals.length === 0 ? (
            <View className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm items-center">
              <Ionicons name="flag-outline" size={32} color="#94a3b8" />
              <Text className="text-slate-500 text-sm mt-2">
                No savings goals yet
              </Text>
              <TouchableOpacity className="mt-3 px-4 py-2 bg-blue-600 rounded-xl">
                <Text className="text-white font-semibold text-sm">
                  Create Goal
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {savingsGoals.map((goal) => {
                const progress = goal.current / goal.target
                return (
                  <View
                    key={goal.id}
                    className="bg-white p-5 rounded-[24px] w-64 mr-4 border border-slate-100 shadow-sm"
                  >
                    <View className="flex-row justify-between items-center mb-4">
                      <View className="h-10 w-10 bg-blue-50 rounded-xl items-center justify-center">
                        <Ionicons
                          name={goal.icon as any}
                          size={20}
                          color="#2563eb"
                        />
                      </View>
                      <Text className="text-slate-400 text-xs font-medium">
                        {(progress * 100).toFixed(0)}%
                      </Text>
                    </View>
                    <Text className="text-slate-900 font-bold mb-1">
                      {goal.title}
                    </Text>
                    <Text className="text-slate-500 text-xs mb-3">
                      ${goal.current.toLocaleString()} of $
                      {goal.target.toLocaleString()}
                    </Text>

                    <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <View
                        style={{ width: `${progress * 100}%` }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          )}
        </View>

        {/* Recent Activity */}
        <View className="px-6 mt-10 pb-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 text-lg font-bold">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {transactions.length === 0 ? (
            <View className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm items-center">
              <Ionicons name="receipt-outline" size={32} color="#94a3b8" />
              <Text className="text-slate-500 text-sm mt-2">
                No transactions yet
              </Text>
              <TouchableOpacity className="mt-3 px-4 py-2 bg-blue-600 rounded-xl">
                <Text className="text-white font-semibold text-sm">
                  Add Transaction
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            transactions.slice(0, 4).map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row justify-between items-center mb-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm"
              >
                <View className="flex-row items-center gap-4">
                  <View
                    className={`${item.backgroundColor} h-12 w-12 rounded-2xl items-center justify-center`}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={item.iconColor}
                    />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-semibold">
                      {item.title}
                    </Text>
                    <Text className="text-slate-400 text-xs">{item.date}</Text>
                  </View>
                </View>
                <Text
                  className={`font-bold ${item.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}
                >
                  {item.amount > 0 ? '+' : ''}$
                  {Math.abs(item.amount).toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  )
}
