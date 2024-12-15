<template>
    <div class="lg:max-w-[700px] my-8 lg:my-12 self-center lg:mx-auto p-6">
        <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
        <div class="text-sm text-gray-500 mb-6 lg:mb-10">
            Published on: <span>{{ formatDate(post.createdAt) }}</span>
            <span class="ml-4">Reading time: {{ post.readingTime }}</span>
        </div>
        <p class="text-gray-600 mb-2">{{ post.content }}</p>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "(client)-app-default-layout"
})
import { useRoute } from 'vue-router';

// Dummy data
const dummyPosts = [
    {
        slug: 'my-first-post',
        title: 'My First Blog Post',
        content: 'This is the content of my first blog post. It is amazing!',
        createdAt: '2024-06-17',
        readingTime: '5 mins',
    },
    {
        slug: 'another-day-another-post',
        title: 'Another Day, Another Post',
        content: 'Content for another blog post. Exciting, isn\'t it?',
        createdAt: '2024-06-18',
        readingTime: '3 mins',
    },
    {
        slug: 'coding-in-nuxt',
        title: 'Coding in Nuxt',
        content: 'Nuxt makes building apps simple. This is why I love it!',
        createdAt: '2024-06-19',
        readingTime: '7 mins',
    },
];

// Utility to format dates
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Get the route object
const route = useRoute();

// Find the post by slug
const post = dummyPosts.find((p) => p.slug === route.params.slug);

// Handle 404 if no matching post is found
if (!post) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Post not found',
    });
}
</script>

<style scoped>
.blog-post {
    max-width: 700px;
    margin: 0 auto;
}
</style>