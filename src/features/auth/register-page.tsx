import { ThemedText } from '@/src/components/themed-text'
import { IconSymbol } from '@/src/components/ui/icon-symbol'
import { apiClient } from '@/src/lib/api-client'
import { useAuthStore } from '@/src/stores/auth.store'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((state) => state.setAuth)

  async function handleSignup() {
    setError(null)

    // Validation
    if (!email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!password) {
      setError('Please enter a password')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // 1. Register
      await apiClient.post('/auth/register', {
        email: email.trim().toLowerCase(),
        password,
        name: email.split('@')[0] // Dummy name from email
      })

      // 2. Automatic Login
      const loginData = await apiClient.post<any>('/auth/login', {
        email: email.trim().toLowerCase(),
        password
      })

      setAuth(loginData.user, loginData.token)

      // Manual redirect as a fallback
      setTimeout(() => {
        router.replace('/(app)/(tabs)')
      }, 100)
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          {/* Header Section */}
          <View className="items-center mt-16 mb-12">
            <View className="w-20 h-20 bg-blue-600 rounded-3xl items-center justify-center shadow-lg">
              <IconSymbol name="house.fill" size={40} color="white" />
            </View>
            <ThemedText
              type="title"
              className="mt-6 text-3xl font-bold tracking-tight"
            >
              FinBear
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              Your intelligent personal finance companion
            </ThemedText>
          </View>

          {/* Form Section */}
          <View className="gap-y-4">
            {error && (
              <View className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800 mb-2">
                <ThemedText className="text-red-600 dark:text-red-400 text-sm text-center font-medium">
                  {error}
                </ThemedText>
              </View>
            )}
            <View>
              <ThemedText className="text-sm font-medium mb-1.5 ml-1">
                Email Address
              </ThemedText>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor="#a1a1aa"
                className="w-full h-14 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            <View className="mt-2">
              <View className="flex-row justify-between items-center mb-1.5 px-1">
                <ThemedText className="text-sm font-medium">
                  Password
                </ThemedText>
              </View>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                placeholderTextColor="#a1a1aa"
                className="w-full h-14 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
                secureTextEntry
                editable={!loading}
              />
            </View>

            <View className="mt-2">
              <View className="flex-row justify-between items-center mb-1.5 px-1">
                <ThemedText className="text-sm font-medium">
                  Confirm Password
                </ThemedText>
              </View>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#a1a1aa"
                className="w-full h-14 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
                secureTextEntry
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              activeOpacity={0.8}
              className={`w-full h-14 rounded-2xl items-center justify-center mt-6 shadow-md ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-10">
            <View className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <ThemedText className="mx-4 text-zinc-400 text-xs font-semibold uppercase tracking-widest">
              Or continue with
            </ThemedText>
            <View className="flex-1 h-[1px] bg-zinc-200 dark:bg-zinc-800" />
          </View>

          {/* Social Logins */}
          <View className="flex-row gap-4">
            <TouchableOpacity
              disabled
              className="disabled:opacity-50 disabled:bg-gray-100 flex-1 h-14 flex-row items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <ThemedText className="font-medium">Google</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              disabled
              className="disabled:opacity-50 disabled:bg-gray-100 flex-1 h-14 flex-row items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <ThemedText className="font-medium">Apple</ThemedText>
            </TouchableOpacity>
          </View>

          <View className="flex-1" />

          {/* Footer */}
          <View className="flex-row justify-center py-8">
            <ThemedText className="text-zinc-500">
              Already have an account?{' '}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <ThemedText className="text-blue-600 dark:text-blue-400 font-bold">
                Log In
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
