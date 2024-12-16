<script setup lang="ts">
definePageMeta({
    layout: "(admin)-default",
    middleware: "admin"
})
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { formatDate } from '~/lib/utils';
const user = useSupabaseUser()

</script>

<template>
    <div class="px-4 lg-px-10 xl:px-12 py-6 lg-py-12 2xl:py-12">
        <div class="flex flex-col ">
            <div class="mb-8 lg:mb-10 xl:mb-12 2xl:mb-16 flex justify-between">
                <span class="text-2xl lg:text-3xl font-bold">Account</span>
            </div>
            <div class="border p-4 lg:p-5 xl:p-6 rounded-md">
                <div class="container mx-auto max-w-4xl p-6 bg-white rounded-lg shadow-md">
                    <header class="flex items-center space-x-4">
                        <Avatar class="h-8 sm:h-10 lg:h-14 xl:h-20 w-8 sm:w-10 lg:w-14 xl:w-20 rounded-lg">
                            <AvatarImage :src="user?.user_metadata.avatar_url" :alt="user?.email" />
                            <AvatarFallback class="rounded-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 class="text-xl font-semibold">{{ user?.user_metadata.preferred_username }}</h1>
                            <p class="text-sm text-gray-500">{{ user?.email }}</p>
                        </div>
                    </header>

                    <section class="mt-8">
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p class="text-sm font-medium text-gray-500">Created At</p>
                            <p class="text-lg font-semibold text-gray-800">
                                {{ formatDate(user?.created_at) }}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>