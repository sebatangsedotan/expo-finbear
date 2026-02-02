import { Redirect } from 'expo-router'

/**
 * Entry point - just redirects to login.
 * Auth state is managed by _layout.tsx which will redirect
 * to (app) if user is already authenticated. okeh.
 */
export default function Index() {
  return <Redirect href="/(auth)/login" />
}
