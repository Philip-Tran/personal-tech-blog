<script lang="ts" setup>
import { MenuIcon } from 'lucide-vue-next';
const user = useSupabaseUser()
</script>

<template>
  <div class="w-full min-h-10 px-4 py-2 md:px-10 xl:px-8 xl:py-3 border-b">
    <header class="flex items-center justify-between">
      <div>
        <NuxtLink to="/">
          <span class="text-2xl font-bold">Logo</span>
        </NuxtLink>
      </div>
      <div class="lg:w-2/3 flex items-center justify-end space-x-9">
        <nav>
          <div v-if="user && user.email === 'quyetcoccoc@gmail.com'" class="flex items-center space-x-3">
            <NuxtLink to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </NuxtLink>
            <NuxtLink to="/dashboard/create-post">
              <Button variant="outline">New Post</Button>
            </NuxtLink>
          </div>
        </nav>
        <MenuIcon />
      </div>
    </header>
  </div>
</template>


<style></style>