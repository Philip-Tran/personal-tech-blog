<script lang="ts" setup>
definePageMeta({
    layout: "(client)-app-default-layout"
})
import TiptapEditor from '~/components/TiptapEditor.vue';
</script>

<template>
    <div>
        <Button>Click me</Button>
        <h1 class="text-red-500"> Welcome to the homepage</h1>
        <AppAlert>
            This is an auto-imported component
        </AppAlert>
        <TiptapEditor />
    </div>
</template>