import { ThemedText } from '@/components/themed-text'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { supabase } from '@/src/lib/supabase'
import { router } from 'expo-router'
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
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      return
    }

    router.replace('/(tabs)')
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
                placeholder="Enter your password"
                placeholderTextColor="#a1a1aa"
                className="w-full h-14 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.8}
              className="w-full h-14 bg-blue-600 rounded-2xl items-center justify-center mt-6 shadow-md"
            >
              <Text className="text-white font-bold text-lg">Sign In</Text>
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
              Don&apos;t have an account?{' '}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <ThemedText className="text-blue-600 dark:text-blue-400 font-bold">
                Sign Up
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
