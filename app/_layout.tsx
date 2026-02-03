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
import { SafeAreaProvider } from 'react-native-safe-area-context'
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (loading) return

    const firstSegment = segments[0]
    const inAuthGroup = firstSegment === '(auth)'
    const inAppGroup = firstSegment === '(app)'

    if (session) {
      if (inAuthGroup) {
        router.replace('/(app)/(tabs)' as Href)
      }
    } else {
      if (inAppGroup) {
        router.replace('/(auth)/login' as Href)
      }
    }
  }, [session, segments, loading, router])

  if (loading) {
    return (
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Both route groups always registered - auth protection via redirects */}
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
