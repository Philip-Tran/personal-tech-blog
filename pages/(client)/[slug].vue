<script setup lang="ts">
definePageMeta({
    layout: "(client)-app-default-layout",
});

import { getReadingTime, formatDate } from "~/lib/utils";
import { type Post } from "~/stores/client/PostStore";
import { usePostStore } from "~/stores/client/PostStore";

import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";

const postStore = usePostStore();
const route = useRoute();

const post = ref<Post>();

onBeforeMount(async () => {
    try {
        const fetchedPost = await postStore.getSinglePost(route.params.slug.toString());
        if (fetchedPost as Post) {
            //@ts-ignore
            post.value = fetchedPost;
        } else {
            console.error("Post not found.");
        }
    } catch (error) {
        console.error("Error fetching post:", error);
    }
});

</script>

<template>
    <!-- Skeleton -->
    <div v-if="!post" class="lg:max-w-[700px] my-8 lg:my-12 self-center lg:mx-auto p-6">
        <div>
            <Skeleton class="h-4 lg:h-5 w-[500px] mb-5" />
            <Skeleton class="h-3 w-[200px]" />
        </div>
        <div class="flex flex-col space-y-3">
            <Skeleton class="h-12 mt-16 w-[500px]" />
            <Skeleton class="h-12 mt-16 w-[500px]" />
        </div>
    </div>

    <!-- Main -->
    <div v-else class="lg:max-w-[700px] my-8 lg:my-12 self-center lg:mx-auto p-6">
        <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
        <div class="text-sm text-gray-500 mb-6 lg:mb-10">
            Published on: <span>{{ formatDate(post.createdAt) }}</span>
            <span class="ml-4"> {{ getReadingTime(post.content) }} </span>
        </div>
        <div class="text-gray-600 mb-2 font-serif text-xl leading-9 prose" v-html="post.content"></div>
    </div>
</template>
