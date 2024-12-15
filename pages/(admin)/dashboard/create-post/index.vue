<template>
  <div class="w-full min-h-screen">
    <div class="w-full flex items-center justify-between min-h-10 py-1 px-4 lg:py-2 lg:px-8">
      <div class="">
        <NuxtLink to="/dashboard">
          <Button variant="ghost">Back</Button>
        </NuxtLink>
      </div>
      <Button @click="handleFormSubmit">Post</Button>
    </div>
    <div class="flex flex-col justify-center">
      <div class="max-w-[700px] w-[700px] mx-auto">
        <div class="mb-8 lg:mb-16">
          <Input class="border-none text-base font-medium" placeholder="Post title" v-model="title" />
        </div>
        <AdminTiptapEditor v-model="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostStore } from "~/stores/admin/PostStore";
import { addPostSchema } from "~/schemas/PostSchema";
import { type Post } from "~/stores/admin/PostStore";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate"

const { values, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(addPostSchema)
})
const postStore = usePostStore()

const [title] = defineField("title")
const [content] = defineField("content")

const handleFormSubmit = handleSubmit((values) => {
  console.log(values)
  postStore.addPost(values as Post)
}) 
</script>

<style></style>