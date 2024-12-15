<script lang="ts" setup>
definePageMeta({
    layout: "app-default-layout"
})
import TiptapEditor from '~/components/TiptapEditor.vue';
const user = useSupabaseUser()
const handle = () => {
    console.log("click")
    console.log(user.value)
}
</script>

<template>
    <div>
        <h1>
            {{ user }}
        </h1>
        <Button @click="handle">Click me</Button>
        <h1 class="text-red-500"> Welcome to the homepage</h1>
        <AppAlert>
            This is an auto-imported component
        </AppAlert>
        <TiptapEditor />
    </div>
</template>