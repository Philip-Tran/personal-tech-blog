<script lang="ts" setup>
import { MenuIcon } from 'lucide-vue-next';
</script>

<template>
  <div class="w-full min-h-10 px-4 py-2 md:px-10 xl:px-8 xl:py-4">
    <header class="flex items-center justify-between">
      <div>
        <NuxtLink to="/">
          <span class="text-2xl font-bold">Logo</span>
        </NuxtLink>
      </div>
      <div class="lg:w-2/3 flex items-center justify-end space-x-9">
        <nav>
          nav
        </nav>
        <MenuIcon />
      </div>
    </header>
  </div>
</template>


<style></style>