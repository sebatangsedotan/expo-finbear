import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { Href, Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import 'react-native-reanimated'
import '../global.css'

import { useColorScheme } from '@/src/hooks/use-color-scheme'
import { supabase } from '@/src/lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const segments = useSegments()
  const router = useRouter()

  // Single source of truth for auth state
  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for ALL auth state changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Handle navigation based on auth state - SINGLE PLACE
  useEffect(() => {
    if (loading) return

    // Get first segment (route group)
    const firstSegment = segments[0]
    const inAuthGroup = firstSegment === '(auth)'
    const inAppGroup = firstSegment === '(app)'

    if (session) {
      // User is authenticated
      if (inAuthGroup) {
        // On auth pages, redirect to app
        router.replace('/(app)/(tabs)' as Href)
      }
    } else {
      // User is NOT authenticated
      if (inAppGroup) {
        // Trying to access protected routes, redirect to login
        router.replace('/(auth)/login' as Href)
      }
    }
  }, [session, segments, loading, router])

  // Show loading while checking auth
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colorScheme === 'dark' ? '#09090b' : '#ffffff'
        }}
      >
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Auth routes - always available for unauthenticated users */}
        <Stack.Screen name="(auth)" />

        {/* Protected routes - only render when authenticated */}
        {session && <Stack.Screen name="(app)" />}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
