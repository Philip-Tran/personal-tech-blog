<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
useSeoMeta({
  title: "The Phil Techie Blog",
  description: "I'm Philip Tran, This blog is where I share my learning journey in this tech space and share what I've learn"
})

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
