<script lang="ts" setup>
import AppSideBar from '~/components/shared/admin/AppSideBar.vue';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
</script>

<template>
    <SidebarProvider>
        <AppSideBar />
        <main class="w-full ">
            <div class="flex py-1 sm:py-2 px-4 w-full h-10 max-h-12 border-b items-center justify-between lg:hidden">
                <SidebarTrigger class='-ml-2'>
                </SidebarTrigger>
            </div>
            <slot />
        </main>
    </SidebarProvider>
</template>