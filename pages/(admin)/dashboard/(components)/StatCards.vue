<script setup lang="ts">
import { useStatsStore } from '~/stores/admin/StatStore';

const statsStore = useStatsStore()

</script>

<template>
    <div v-if="statsStore.totalPost"
        class="grid grid-cols-1 gap-4 mb-8 xl:mb-12 2xl:mb-14 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-slate-100 p-4 xl:p-6 rounded-sm shadow-sm flex flex-col items-start justify-start">
            <span class="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-medium 2xl:mb-3 text-slate-800">{{
                statsStore.totalPublishedPost
            }}</span>
            <span class="text-base text-slate-600">Total posts being written</span>
        </div>
    </div>

    <!-- Skeleton -->
    <div v-else class="grid grid-cols-1 gap-4 mb-8 xl:mb-12 2xl:mb-14 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Card 1 -->
        <div class="bg-slate-100 p-4 xl:p-6 rounded-sm shadow-sm flex flex-col items-start justify-start">
            <Skeleton class="h-10 w-32 mb-3 xl:h-12 xl:w-40 2xl:h-14 2xl:w-48"></Skeleton>
            <Skeleton class="h-4 w-48"></Skeleton>
        </div>

        <!-- Card 2 -->
        <div class="bg-slate-100 p-4 xl:p-6 rounded-sm shadow-sm flex flex-col items-start justify-start">
            <Skeleton class="h-10 w-32 mb-3 xl:h-12 xl:w-40 2xl:h-14 2xl:w-48"></Skeleton>
            <Skeleton class="h-4 w-48"></Skeleton>
        </div>

        <!-- Card 3 -->
        <div class="bg-slate-100 p-4 xl:p-6 rounded-sm shadow-sm flex flex-col items-start justify-start">
            <Skeleton class="h-10 w-32 mb-3 xl:h-12 xl:w-40 2xl:h-14 2xl:w-48"></Skeleton>
            <Skeleton class="h-4 w-48"></Skeleton>
        </div>

        <!-- Card 4 -->
        <div class="bg-slate-100 p-4 xl:p-6 rounded-sm shadow-sm flex flex-col items-start justify-start">
            <Skeleton class="h-10 w-32 mb-3 xl:h-12 xl:w-40 2xl:h-14 2xl:w-48"></Skeleton>
            <Skeleton class="h-4 w-48"></Skeleton>
        </div>
    </div>
</template>