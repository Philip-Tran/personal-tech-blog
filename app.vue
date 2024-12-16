<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <Toaster />
  <div>
    <NuxtLoadingIndicator color="orange" :height=1 />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
