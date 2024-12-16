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
            <Skeleton class="h-12 mt-16 w-[650px]" />
            <Skeleton class="h-12 mt-16 w-[650px]" />
        </div>
    </div>

    <!-- Main -->
    <div v-else class="lg:max-w-[700px] my-8 lg:my-12 self-center lg:mx-auto p-6">
        <h1 class="text-3xl lg:text-4xl font-bold mb-2 xl:mb-3">{{ post.title }}</h1>
        <div class="text-sm text-yellow-800 lg:text-base font-medium mb-6 lg:mb-10 xl:mb-12 2xl:mb-14">
            <span class="">{{ formatDate(post.createdAt) }}</span>
            <span class="ml-4"> {{ getReadingTime(post.content) }} </span>
        </div>
        <div class="text-gray-600 mb-2 font-serif text-xl leading-8 prose" v-html="post.content"></div>
    </div>
</template>

<style scoped>
/* Scoped styles for read-only code blocks */
.prose>pre {
    background-color: #282c34;
    /* One Dark Pro background */
    border-radius: 6px;
    color: #abb2bf;
    /* Light gray for general text */
    font-family: 'JetBrains Mono', monospace;
    /* Use your preferred font */
    margin: 1.5rem 0;
    padding: 1rem 1.25rem;
    overflow-x: auto;
    /* Enable horizontal scrolling if the code is too long */
}

.prose>pre>code {
    background: none;
    color: inherit;
    font-size: 0.85rem;
    padding: 0;
}

/* Highlight.js styles for syntax highlighting */
.prose>pre>code .hljs-comment,
.prose>pre>code .hljs-quote {
    color: #5c6370;
    /* Gray for comments */
}

.prose>pre>code .hljs-variable,
.prose>pre>code .hljs-template-variable,
.prose>pre>code .hljs-attribute,
.prose>pre>code .hljs-tag,
.prose>pre>code .hljs-name,
.prose>pre>code .hljs-regexp,
.prose>pre>code .hljs-link {
    color: #e06c75;
    /* Red tones for variables and tags */
}

.prose>pre>code .hljs-number,
.prose>pre>code .hljs-meta,
.prose>pre>code .hljs-built_in,
.prose>pre>code .hljs-builtin-name,
.prose>pre>code .hljs-literal,
.prose>pre>code .hljs-type,
.prose>pre>code .hljs-params {
    color: #d19a66;
    /* Orange tones for numbers and meta */
}

.prose>pre>code .hljs-string,
.prose>pre>code .hljs-symbol,
.prose>pre>code .hljs-bullet {
    color: #98c379;
    /* Green tones for strings */
}

.prose>pre>code .hljs-title,
.prose>pre>code .hljs-section {
    color: #61afef;
    /* Blue for titles and sections */
}

.prose>pre>code .hljs-keyword,
.prose>pre>code .hljs-selector-tag {
    color: #c678dd;
    /* Purple for keywords */
}

.prose>pre>code .hljs-emphasis {
    font-style: italic;
}

.prose>pre>code .hljs-strong {
    font-weight: bold;
}
</style>
