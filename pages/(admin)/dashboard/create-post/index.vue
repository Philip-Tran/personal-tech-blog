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
import { Textarea } from "~/components/ui/textarea";

const { values, defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(addPostSchema)
})

const router = useRouter()
const postStore = usePostStore()

const [title] = defineField("title")
const [content] = defineField("content")
const [published] = defineField("published")

watch(
  () => ({
    title: title.value,
    published: published.value,
    content: content.value
  }),
  (newValues) => {
    // @ts-ignore
    postStore.state.post.title = newValues.title
    //@ts-ignore
    postStore.state.post.content = newValues.content
    //@ts-ignore
    postStore.state.post.published = newValues.published
  }
)

const publishedBoolean = computed({
  get() {
    return published.value === true;
  },
  set(value: boolean) {
    published.value = value;
  }
});

const handleFormSubmit = handleSubmit(async (values) => {
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
    <div class="w-full flex items-center justify-between min-h-10 py-2 px-4 lg:py-4 lg:px-8">
      <div class="">
        <NuxtLink to="/dashboard">
          <Button variant="link" class="pl-0">Back</Button>
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
            <div class="w-2/3">
              <Select class="w-full" v-model="publishedBoolean">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Choose publish option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem :value="true">
                      Publish
                    </SelectItem>
                    <SelectItem :value="false">
                      Draft
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div class="w-1/3">
              <Button v-if="published" @click="handleFormSubmit" type="submit" size="sm" class="w-full px-3">
                <span class="">Post Now</span>
              </Button>
              <Button v-else @click="handleFormSubmit" type="submit" size="sm" class="w-full px-3">
                <span class="">Save</span>
              </Button>
            </div>
          </div>
          <DialogFooter class="sm:justify-start">
            <DialogClose as-child>
              <Button type="button" class="mt-4" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div class="flex flex-col justify-center p-4 ">
      <div
        class="w-full md:max-w-[640px] lg:max-w-[700px] xl:w-[700px] mx-auto pb-24 lg:pb-32 xl:pb-[600px] 2xl:pb-[700px]">
        <div class="mb-6 lg:mb-10 ">
          <Textarea
            class="w-full resize-none border-none text-wrap rounded-none text-xl font-medium p-0 ring-0 focus:ring-0 focus-visible:ring-0"
            placeholder="Post title goes here" v-model="title" />
        </div>
        <AdminTiptapEditor v-model="content" />
      </div>
    </div>
  </div>
</template>
