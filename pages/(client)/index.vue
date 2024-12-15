<script lang="ts" setup>
definePageMeta({
    layout: "(client)-app-default-layout"
})

import { formatDate } from '~/lib/utils';

import { Dot } from 'lucide-vue-next';


const posts = [
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


</script>

<template>
    <div class="w-full min-h-screen py-24 lg:py-24 xl:py-28 px-4 md:px-10">
        <div class="lg:max-w-[800px] self-center mx-auto">
            <div class="mb-12 lg:mb-16  lg:p-3">
                <h5 class="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-4">Posts</h5>
                <span>{{ formatDate(Date.now()) }}</span>
            </div>

            <!-- post cards -->
            <div class="flex flex-col space-y-8 lg:space-y-16">
                <div class="relative lg:hover:bg-gray-100 rounded-lg lg:p-3" v-for="(post, index) in posts"
                    :key="index">
                    <div>
                        <NuxtLink class=" block inset-0 before:absolute before:inset-0 before:content-['']" before:z-0
                            :to="`/${post.slug}`">
                            <h3 class="text-xl font-medium mb-2 hover:text-yellow-800">{{ post.title }}</h3>
                        </NuxtLink>
                        <p class="font-serif text-lg text-orange-950">{{ post.content }}</p>
                    </div>
                    <div class="mt-2 lg:mt-4 flex">
                        <span class="font-medium text-yellow-800">{{ formatDate(post.createdAt) }}</span>
                        <Dot /> <span>{{ post.readingTime }}</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mt-20 lg:mt-32">
                <Button>View All</Button>
            </div>
        </div>
    </div>
</template>