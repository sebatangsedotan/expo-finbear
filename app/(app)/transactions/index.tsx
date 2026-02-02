import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function TransactionListScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      <View className="flex-1 p-6">
        <Text className="text-2xl font-bold text-zinc-900 dark:text-white">
          Transaction History
        </Text>
      </View>
    </SafeAreaView>
  )
}
