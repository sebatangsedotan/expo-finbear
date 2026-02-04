import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'
import { IconSymbol } from '@/src/components/ui/icon-symbol'
import { apiClient } from '@/src/lib/api-client'
import { useAuthStore } from '@/src/stores/auth.store'
import { useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'

export default function SettingsScreen() {
  const [loading, setLoading] = useState(false)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          setLoading(true)
          try {
            await apiClient.post('/auth/logout')
            clearAuth()
          } catch (err) {
            // Even if API fails, we should clear local token if it's unauthorized
            clearAuth()
          } finally {
            setLoading(false)
          }
        }
      }
    ])
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
            disabled={loading}
            className={`flex-row items-center p-4 rounded-2xl border ${loading ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200' : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20'}`}
          >
            {loading ? (
              <ActivityIndicator color="#71717a" />
            ) : (
              <IconSymbol name="paperplane.fill" size={20} color="#ef4444" />
            )}
            <ThemedText
              className={`ml-3 font-semibold ${loading ? 'text-zinc-500' : 'text-red-600 dark:text-red-400'}`}
            >
              {loading ? 'Signing out...' : 'Sign Out'}
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
