<script setup lang="ts">
import { BadgeCheck, Calendar, ChevronDown, ChevronsUpDown, Home, Inbox, LogOut, PenLine, Search, Settings, Sparkles } from "lucide-vue-next"

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
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Account",
        url: "/dashboard/account",
        icon: PenLine,
    },
]

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const handleLogout = async () => {
    if (user.value) {
        const { error } = await supabase.auth.signOut()
        navigateTo("/")
        if (error) {
            console.error("Error logout:", (error.message))
        }
    }
}

</script>

<template>
    <Sidebar class="bg-gray-900 text-slate-50">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                Q Writes
                                <ChevronDown class="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-[--radix-popper-anchor-width]">
                            <DropdownMenuItem>
                                <span>Tech Blog</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Personal</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <div class="mt-7 flex flex-col space-y-2 lg:space-y-3
            ">
                <NuxtLink to="/">
                    <Button class="w-full text-slate-600" variant="outline">Visit Site</Button>
                </NuxtLink>
                <NuxtLink to="/dashboard/create-post">
                    <Button class="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-600" variant="default">New
                        Post
                    </Button>
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
                                <NuxtLink :to="item.url">
                                    <component :is="item.icon" />
                                    <span>{{ item.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <SidebarMenuButton size="lg"
                                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                <Avatar class="h-8 w-8 rounded-lg">
                                    <AvatarImage :src="user?.identities[0].identity_data.avatar_url" :alt="user.name" />
                                    <AvatarFallback class="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div class="grid flex-1 text-left text-sm leading-tight">
                                    <span class="truncate font-semibold"> {{
                                        user?.user_metadata.preferred_username }}</span>
                                    <span class="truncate text-xs"> {{ user?.email }}</span>
                                </div>
                                <ChevronsUpDown class="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side="bottom" align="end" :side-offset="4">
                            <DropdownMenuLabel class="p-0 font-normal">
                                <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <!-- <AvatarImage :src="user.avatar" :alt="user.name" /> -->
                                        <AvatarFallback class="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold"> {{ user?.user_metadata.preferred_username
                                            }}</span>
                                        <span class="truncate text-xs"> {{ user?.email }}</span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Sparkles />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button variant="link" class="w-full p-0 justify-start py-0 h-min"
                                    @click="handleLogout">
                                    <LogOut />
                                    <span>Log out</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
</template>
