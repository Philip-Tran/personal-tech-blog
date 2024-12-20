<script setup lang="ts">

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-vue-next';
import { Dialog, DialogContent, DialogTrigger, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { usePostStore } from '~/stores/admin/PostStore';

defineProps<{
    post: {
        slug: string;
        id: string;
    };
}>();

const postStoreAdmin = usePostStore()

function copy(id: string) {
    navigator.clipboard.writeText(id);
}

const visitPost = (slug: string) => {
    navigateTo(`/${slug}`)
};

const router = useRouter()
const handleDeletePost = async (id: string) => {
    console.log("delete post", id)
    const result = await postStoreAdmin.deletePost(id)
    if (result?.success) {
        console.log("goooooooooo")
        router.go(0)
    }
};

const goToEditPage = (postId: string) => {
    if (postId) {
        navigateTo(`/dashboard/edit-post/${postId}`)
    }
}
</script>

<template>
    <Dialog>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem @click="visitPost(post.slug)">Visit Post</DropdownMenuItem>
                <DropdownMenuItem @click="goToEditPage(post.id)">
                    Edit Post
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DialogTrigger class="w-full">
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent class="sm:max-w-md" @interact-outside="event => {
            const target = event.target as HTMLElement;
            if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
        }">
            <DialogHeader>
                <DialogTitle>Delete post</DialogTitle>
                <DialogDescription>This action can not be undo </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4">
                <Button size="sm" class="px-3" @click="handleDeletePost(post.id)">
                    Confirm delete
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>