<script lang="ts" setup>
definePageMeta({
  middleware: ["auth", "admin"]
})

import { usePostStore } from "~/stores/admin/PostStore";
import { addPostSchema } from "~/schemas/PostSchema";
import { type Post } from "~/stores/admin/PostStore";

import { toast } from 'vue-sonner'
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate"
import { useRouter } from "vue-router";

const { values, defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(addPostSchema)
})

const router = useRouter()
const postStore = usePostStore()

const [title] = defineField("title")
const [content] = defineField("content")

const handleFormSubmit = handleSubmit(async (values) => {
  console.log(values)
  const res = await postStore.addPost(values as Post)

  if (res) {
    toast.success("Create post successfully", {
      description: "Redirecting"
    })
    router.push('/dashboard')
  } else {
    toast.error("Error", {
      description: `Error occurs`
    })
  }
}) 
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="w-full flex items-center justify-between min-h-10 py-1 px-4 lg:py-2 lg:px-8">
      <div class="">
        <NuxtLink to="/dashboard">
          <Button variant="ghost">Back</Button>
        </NuxtLink>
      </div>
      <!-- dialog -->
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">
            Post
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>

            </DialogDescription>
          </DialogHeader>
          <div class="flex items-center space-x-2">
            <div class="grid flex-1 gap-2">
              <Label for="link" class="sr-only">
                Option
              </Label>
            </div>
            <Button @click="handleFormSubmit" type="submit" size="sm" class="px-3">
              <span class="">Post Now</span>
            </Button>
          </div>
          <DialogFooter class="sm:justify-start">
            <DialogClose as-child>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div class="flex flex-col justify-center">
      <div class="max-w-[700px] w-[700px] mx-auto pb-24 lg:pb-32 xl:pb-[600px] 2xl:pb-[700px]">
        <div class="mb-8 lg:mb-16">
          <Input class="border-none rounded-none text-base font-medium p-0 ring-0 focus:ring-0 focus-visible:ring-0"
            placeholder="Post title" v-model="title" />
        </div>
        <AdminTiptapEditor v-model="content" />
      </div>
    </div>
  </div>
</template>



<style></style>