<script lang="ts" setup>
import AppSideBar from '~/components/shared/admin/AppSideBar.vue';
import { SidebarProvider } from '~/components/ui/sidebar';
</script>

<template>
    <SidebarProvider>
        <AppSideBar />
        <main class="w-full">
            <slot />
        </main>
    </SidebarProvider>
</template>