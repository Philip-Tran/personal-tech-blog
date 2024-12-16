<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/`
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

</script>

<template>
  <div v-if="!user" class="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign In
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Continue with your GitHub account
        </p>
      </div>
      <div class="rounded-lg shadow-lg bg-white p-6 space-y-4">
        <Button
          class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
          @click="handleGitHubLogin">
          <GitHubIcon class="h-5 w-5" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-6 bg-white rounded-lg shadow-lg p-6">
      <p class="text-center text-gray-800">
        Logged in as: <span class="font-semibold">{{ user.email }}</span>
      </p>
      <Button
        class="w-full px-4 py-2 text-white bg-red-500 font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
        @click="supabase.auth.signOut()">
        Sign Out
      </Button>
    </div>
  </div>
</template>