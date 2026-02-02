import { Stack } from 'expo-router'

export default function TransactionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add-transaction" />
    </Stack>
  )
}
