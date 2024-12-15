<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-vue-next"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "~/components/ui/sidebar"
import {
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent
} from "~/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Posts",
        url: "/dashboard/posts",
        icon: Inbox,
    },
    {
        title: "Analytic",
        url: "/dashboard/analytic",
        icon: Search,
    },

]
</script>

<template>
    <Sidebar class="">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                Select Workspace
                                <ChevronDown class="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
                            <DropdownMenuItem>
                                <span>Acme Inc</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Acme Corp.</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <div class="mt-7
            ">
                <NuxtLink to="/dashboard/create-post">
                    <Button class="w-full" variant="outline">New Post</Button>
                </NuxtLink>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Main</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="item in items" :key="item.title" class="">
                            <SidebarMenuButton asChild class="min-h-10">
                                <RouterLink :to="item.url">
                                    <component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter class="flex flex-row">
            <Avatar>
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback><img src="/favicon.ico" /></AvatarFallback>
            </Avatar>
            <div>
                quyet@gmail.com
            </div>
        </SidebarFooter>
    </Sidebar>
</template>