import { Ionicons } from '@expo/vector-icons'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 py-4 flex-row justify-between items-center">
          <View>
            <Text className="text-slate-400 text-sm font-medium">
              Welcome back,
            </Text>
            <Text className="text-slate-900 text-xl font-bold">
              Buriburizaemon
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

        <View className="px-6 mt-4">
          <View className="bg-blue-600 p-6 rounded-[32px] overflow-hidden relative shadow-lg shadow-blue-200">
            <View className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/20 rounded-full" />
            <View className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />

            <Text className="text-blue-100 text-sm font-semibold uppercase tracking-wider">
              Total Balance
            </Text>
            <View className="flex-row items-end mt-2">
              <Text className="text-white text-4xl font-bold">$12,450</Text>
              <Text className="text-blue-200 text-2xl font-bold pb-1 ml-1">
                .80
              </Text>
            </View>

            <View className="flex-row items-center mt-6 bg-white/20 self-start px-3 py-1 rounded-full">
              <Ionicons name="trending-up" size={14} color="white" />
              <Text className="text-white text-xs font-bold ml-1">
                +2.5% this month
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between px-6 mt-8">
          {[
            {
              icon: 'arrow-up',
              label: 'Send',
              color: 'bg-blue-50',
              iconColor: '#2563eb'
            },
            {
              icon: 'arrow-down',
              label: 'Receive',
              color: 'bg-emerald-50',
              iconColor: '#059669'
            },
            {
              icon: 'grid',
              label: 'Bills',
              color: 'bg-indigo-50',
              iconColor: '#4f46e5'
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
          >
            {[
              {
                title: 'New MacBook Pro',
                target: '$2,400',
                current: '$1,800',
                progress: 0.75,
                icon: 'laptop'
              },
              {
                title: 'Tokyo Trip',
                target: '$5,000',
                current: '$1,250',
                progress: 0.25,
                icon: 'airplane'
              }
            ].map((goal, idx) => (
              <View
                key={idx}
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
                    {(goal.progress * 100).toFixed(0)}%
                  </Text>
                </View>
                <Text className="text-slate-900 font-bold mb-1">
                  {goal.title}
                </Text>
                <Text className="text-slate-500 text-xs mb-3">
                  {goal.current} of {goal.target}
                </Text>

                <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <View
                    style={{ width: `${goal.progress * 100}%` }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View className="px-6 mt-10 pb-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 text-lg font-bold">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Ionicons name="options-outline" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {[
            {
              title: 'Apple Music',
              category: 'Entertainment',
              amount: '-$9.99',
              date: 'Today, 10:45 AM',
              icon: 'musical-notes',
              color: 'bg-pink-50',
              iconColor: '#db2777'
            },
            {
              title: 'Freelance Pay',
              category: 'Income',
              amount: '+$850.00',
              date: 'Yesterday',
              icon: 'cash',
              color: 'bg-emerald-50',
              iconColor: '#059669'
            },
            {
              title: 'Starbucks',
              category: 'Food & Drink',
              amount: '-$5.50',
              date: 'Jan 30',
              icon: 'cafe',
              color: 'bg-orange-50',
              iconColor: '#d97706'
            },
            {
              title: 'Gym Membership',
              category: 'Health',
              amount: '-$45.00',
              date: 'Jan 28',
              icon: 'fitness',
              color: 'bg-blue-50',
              iconColor: '#2563eb'
            }
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              className="flex-row justify-between items-center mb-4 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm"
            >
              <View className="flex-row items-center gap-4">
                <View
                  className={`${item.color} h-12 w-12 rounded-2xl items-center justify-center`}
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
                className={`font-bold ${item.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}
              >
                {item.amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
