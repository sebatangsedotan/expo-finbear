import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { supabase } from '@/src/lib/supabase'
import { router } from 'expo-router'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function SettingsScreen() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      className="bg-white dark:bg-zinc-950"
    >
      <ThemedView style={styles.container}>
        <View className="mb-8 w-full">
          <ThemedText type="title" className="text-3xl font-bold">
            Settings
          </ThemedText>
          <ThemedText className="text-zinc-500 mt-1">
            Manage your account and preferences
          </ThemedText>
        </View>

        <View className="w-full gap-y-4">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20"
          >
            <IconSymbol name="paperplane.fill" size={20} color="#ef4444" />
            <ThemedText className="ml-3 text-red-600 dark:text-red-400 font-semibold">
              Sign Out
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60
  }
})
