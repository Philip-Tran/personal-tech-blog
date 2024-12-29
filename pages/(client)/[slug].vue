<script setup lang="ts">
definePageMeta({
    layout: "(client)-app-default-layout",
});



import { getReadingTime, formatDate } from "~/lib/utils";
import { type Post } from "~/stores/client/PostStore";
import { usePostStore } from "~/stores/client/PostStore";

import { useRoute } from "vue-router";

const postStore = usePostStore();
const route = useRoute();
const post = ref<Post>();
const { $highlight } = useNuxtApp();

const fetchPost = async (slug: string) => {
    try {
        const fetchedPost = await postStore.getSinglePost(slug);
        if (fetchedPost as Post) {
            post.value = fetchedPost as Post;
            // syntax highlight
            await nextTick(() => {
                $highlight();
            });
        } else {
            console.error("Post not found.");
        }
    } catch (error) {
        console.error("Error fetching post:", error);
    }
};

onBeforeMount(async () => {
    await fetchPost(route.params.slug.toString());
});

watch(() => route.fullPath, async () => {
    await fetchPost(route.params.slug.toString());
}, { deep: true });

watch(post, async () => {
    await nextTick(() => {
        $highlight();
    });
}, { deep: true });

onMounted(async () => {
    await nextTick(() => {
        $highlight();
    });
});

watch(post, () => {
    if (post.value) {
        useSeoMeta({
            title: () => post.value?.title || 'Phil Tran',
            ogTitle: () => post.value?.title || 'Phil Post',
            // @ts-ignore
            articlePublishedTime: () => post.value?.createdAt,
            // @ts-ignore
            articleModifiedTime: () => post.value?.updatedAt,
        })
    }
}, { immediate: true })
</script>

<template>
    <!-- Skeleton -->
    <div v-if="!post" class="lg:max-w-[700px] my-8 lg:my-12 self-center lg:mx-auto p-6">
        <div>
            <Skeleton class="h-4 lg:h-5 w-[500px] mb-5" />
            <Skeleton class="h-3 w-[200px]" />
        </div>
        <div class="flex flex-col space-y-3">
            <Skeleton class="h-12 mt-16 w-[650px]" />
            <Skeleton class="h-12 mt-16 w-[650px]" />
        </div>
    </div>

    <!-- Main -->
    <article v-else class="lg:max-w-[700px] my-8 lg:my-12 self-center lg:mx-auto p-6">
        <h1 class="text-3xl lg:text-4xl font-bold mb-2 xl:mb-3">{{ post.title }}</h1>
        <div class="text-sm text-yellow-800 lg:text-base font-medium mb-6 lg:mb-10 xl:mb-12 2xl:mb-14">
            <span class="">{{ formatDate(post.createdAt) }}</span>
            <span class="ml-4"> {{ getReadingTime(post.content) }} </span>
        </div>
        <div class="text-[#363737] mb-2 font-serif text-[18px] lg:text-[19px] leading-9 prose prose-h1:font-sans prose-h2:font-sans prose-h3:font-sans prose-h4:font-sans prose-h5:font-sans"
            v-html="post.content"></div>
    </article>
</template>