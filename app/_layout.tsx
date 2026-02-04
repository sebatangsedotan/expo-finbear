import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native'
import { Href, Stack, useRouter, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../global.css'

import { useColorScheme } from '@/src/hooks/use-color-scheme'
import { useAuthStore } from '@/src/stores/auth.store'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const { isAuthenticated, isInitialized } = useAuthStore()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isInitialized) return

    const firstSegment = segments[0]
    const inAuthGroup = firstSegment === '(auth)'
    const inAppGroup = firstSegment === '(app)'

    if (isAuthenticated) {
      if (inAuthGroup) {
        router.replace('/(app)/(tabs)' as Href)
      }
    } else {
      if (inAppGroup) {
        router.replace('/(auth)/login' as Href)
      }
    }
  }, [isAuthenticated, segments, isInitialized, router])

  if (!isInitialized) {
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
