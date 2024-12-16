<script lang="ts" setup>
definePageMeta({
    layout: "(client)-app-default-layout"
})

import { getReadingTime } from '~/lib/utils';
import { usePostStore } from '~/stores/client/PostStore';
import { formatDate, truncateText } from '~/lib/utils';

import { Dot } from 'lucide-vue-next';

const postStore = usePostStore()
onBeforeMount(async () => {
    await postStore.getPosts()
})

</script>

<template>
    <div v-if="!postStore.posts" class="w-full min-h-screen py-24 lg:py-24 xl:py-32 px-4 md:px-10">
        <div class="lg:max-w-[700px] self-center mx-auto">
            <Skeleton class="h-4  w-[150px] mb-24" />
            <Skeleton class="h-32  w-full mb-5" />
            <Skeleton class="h-32  w-full mb-5" />
            <Skeleton class="h-32  w-full mb-5" />
        </div>
    </div>

    <!-- Main -->
    <div v-else class="w-full min-h-screen py-16 lg:py-24 xl:py-28 px-4 md:px-10">
        <div class="lg:max-w-[700px] self-center mx-auto">
            <div class="mb-12 lg:mb-12 lg:p-3">
                <h5 class="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-medium text-slate-900 mb-4">Posts</h5>
                <span>{{ formatDate(Date.now()) }}</span>
            </div>
            <!-- post cards -->
            <div class="flex flex-col space-y-8 lg:space-y-16">
                <div v-for="(post) in postStore.posts" :key="post.id">
                    <div class="relative lg:hover:bg-gray-100 rounded-lg lg:p-3">
                        <div>
                            <NuxtLink class=" block inset-0 before:absolute before:inset-0 before:content-['']"
                                before:z-0 :to="`/${post.slug}`">
                                <h3 class="text-xl font-medium mb-2 hover:text-yellow-800">{{ post.title }}</h3>
                            </NuxtLink>
                            <p class="font-serif text-lg text-orange-950" v-html="truncateText(post.content)"></p>
                        </div>
                        <div class="mt-2 lg:mt-4 flex">
                            <span class="font-medium text-yellow-800">{{ formatDate(post.createdAt) }}</span>
                            <Dot /> <span>{{ getReadingTime(post.content) }}</span>
                        </div>

                    </div>
                    <Separator class="mt-3 lg:mx-3 -ml-3" />
                </div>
            </div>
            <div class="flex justify-center mt-20 lg:mt-32">
                <Button>View All</Button>
            </div>
        </div>
    </div>
</template>