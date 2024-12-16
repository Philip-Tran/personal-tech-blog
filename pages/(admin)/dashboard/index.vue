<script lang="ts" setup>
definePageMeta({
  layout: "(admin)-default",
  middleware: ["admin"]
})

import type { Post } from '@prisma/client';
import dataTable from "~/components/admin/posts/data-table.vue";
import { columns } from "~/components/admin/posts/columns"

const user = useSupabaseUser()

import { usePostStore } from '~/stores/client/PostStore';

const postStore = usePostStore()
onBeforeMount(async () => {
  await postStore.getPosts()
  console.log("here:...", postStore.posts)
})
</script>

<template>
  <div class="px-4 lg-px-10 xl:px-12 py-6 lg-py-12">
    <div class="flex flex-col ">
      <div class="mb-8 lg:mb-10">
        <span class="text-2xl lg:text-3xl font-medium">Posts</span>
      </div>
      <div>
        <dataTable :columns="columns" :data="postStore.posts" />
      </div>
    </div>
  </div>
</template>


<style></style>