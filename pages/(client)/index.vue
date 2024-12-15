<script lang="ts" setup>
definePageMeta({
    layout: "(client)-app-default-layout"
})

import { formatDate } from '~/lib/utils';

import { Dot } from 'lucide-vue-next';


const posts = ref([
    {
        "title": "Exploring the Wonders of Nature",
        "content": "Nature is a boundless source of inspiration and tranquility. From the vibrant hues of a sunset to the calming whispers of a forest, there is magic all around us. This blog explores various ways we can immerse ourselves in nature and reap its countless benefits.",
        "createdAt": "2024-12-01T10:15:30Z",
        "readingTime": "5 min"
    },
    {
        "title": "The Future of Artificial Intelligence",
        "content": "Artificial intelligence is evolving rapidly, reshaping industries and redefining possibilities. In this post, we delve into the latest advancements in AI, potential ethical challenges, and what the future holds for this transformative technology.",
        "createdAt": "2024-12-03T14:45:00Z",
        "readingTime": "8 min"
    },
    {
        "title": "10 Tips for Better Time Management",
        "content": "Time management is an essential skill in today’s fast-paced world. Learn practical strategies to prioritize tasks, minimize distractions, and achieve your goals more effectively in this actionable guide.",
        "createdAt": "2024-12-05T08:30:45Z",
        "readingTime": "4 min"
    },
    {
        "title": "A Journey Through Ancient History",
        "content": "Step back in time and uncover the fascinating stories of ancient civilizations. From the grandeur of the pyramids to the mysteries of the Maya, this post brings history to life.",
        "createdAt": "2024-12-07T19:20:15Z",
        "readingTime": "7 min"
    },
    {
        "title": "Mastering the Art of Minimalism",
        "content": "Minimalism is more than just a design trend—it's a lifestyle. Discover how adopting minimalism can simplify your life, reduce stress, and create more meaningful experiences.",
        "createdAt": "2024-12-10T11:05:50Z",
        "readingTime": "6 min"
    }
])


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
                    <div class="absolute inset-0">
                        <NuxtLink class="absolute inset-0" to="/login">
                        </NuxtLink>
                    </div>
                    <div>
                        <h3 class="text-xl font-medium mb-2">{{ post.title }}</h3>
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