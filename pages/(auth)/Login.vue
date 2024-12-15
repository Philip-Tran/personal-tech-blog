<script setup lang="ts">
import { useSupabaseClient } from '#build/imports';
import { useSupabaseUser } from '#build/imports';

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/`

// Detailed logging
const checkAuthState = async () => {
  try {
    // Check session directly
    const { data: sessionData } = await supabase.auth.getSession()
    console.log('Session Data:', sessionData)

    // Check current user
    const { data: userData } = await supabase.auth.getUser()
    console.log('User Data:', userData)

    // Listener for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth State Change Event:', event)
      console.log('Session:', session)
    })

    // Return cleanup function
    return () => {
      authListener.subscription.unsubscribe()
    }
  } catch (error) {
    console.error('Auth Check Error:', error)
  }
}

// Run auth checks
onMounted(checkAuthState)

const handleGitHubLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo,
      scopes: 'user:email'
    }
  })

  if (error) {
    console.error('GitHub Login Error:', error)
  }
}

// Optional: Check initial auth state
onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  console.log('Initial Session:', data)
})
watch(
  () => user.value,
  () => {
    console.log(user.value)
  }
)
</script>

<template>
  <div v-if="!user" class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <h2 class="my-6 text-center text-3xl font-extrabold">
      Sign in to your account
    </h2>
    <div>
      <button class="mt-3" @click="handleGitHubLogin">
        Sign in with GitHub
      </button>
    </div>
  </div>
  <div v-else>
    <p>Logged in as: {{ user.email }}</p>
    <button @click="supabase.auth.signOut()">Sign Out</button>
  </div>
</template>