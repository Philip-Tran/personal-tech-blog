<script lang="ts" setup>
definePageMeta({
  layout: "(admin)-default",
  middleware: ["admin"]
})
const user = useSupabaseUser()
</script>

<template>
  <div class="px-4 lg-px-10 xl:px-12 py-6 lg-py-12">
    <div class="flex flex-col ">
      <div>
        <span class="text-2xl lg:text-3xl font-medium">Posts</span>
        <p>{{ user }}</p>
      </div>
    </div>
  </div>
</template>


<style></style>