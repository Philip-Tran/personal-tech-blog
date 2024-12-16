<script setup lang="ts">
import { File } from 'lucide-vue-next';
</script>

<template>
    <div
        class="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-lg p-8 text-center space-y-4">
        <File />
        <div>
            <h2 class="text-xl font-semibold text-gray-800 mb-2">No Posts Yet</h2>
            <p class="text-gray-600 mb-4">You don't have any posts. Start publishing your first post here.</p>
            <NuxtLink to="/dashboard/create-post">
                <Button>Create First Post</Button>
            </NuxtLink>
        </div>
    </div>
</template>