<script lang="ts" setup>
import { Github, MenuIcon } from 'lucide-vue-next';
const user = useSupabaseUser()
const supabase = useSupabaseClient()
</script>

<template>
  <div class="w-full min-h-10 px-4 py-2 md:px-10 xl:px-8 xl:py-3 border-b">
    <header class="flex items-center justify-between">
      <div>
        <NuxtLink to="/">
          <div class="text-lg lg:text-2xl font-bold">
            <span class="">Phil</span>
            <span class="text-yellow-700"> Tran</span>
          </div>
        </NuxtLink>
      </div>
      <div class="lg:w-2/3 flex items-center justify-end  space-x-1 lg:space-x-9">
        <nav class="flex flex-row xl:space-x-8">
          <div class="flex items-center space-x-1 lg:space-x-3 xl:space-x-8">
            <NuxtLink to="https://github.com/Philip-Tran/" external target="_blank"
              class="hover:text-orange-500 hover:underline">
              <Button variant="secondary">
                <Github />
                GitHub
              </Button>
            </NuxtLink>
            <NuxtLink to="https://phil-tran-dev.vercel.app/" external>
              <Button variant="outline">
                My Portfolio
              </Button>
            </NuxtLink>
          </div>
          <div v-if="user && user.email === 'quyetcoccoc@gmail.com'" class="flex items-center space-x-1 lg:space-x-3">
            <NuxtLink to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </NuxtLink>
            <NuxtLink to="/dashboard/create-post">
              <Button variant="outline">New Post</Button>
            </NuxtLink>
          </div>
        </nav>
        <Dialog>
          <DialogTrigger as-child>
            <div class="lg:p-1 cursor-pointer hover:bg-gray-100 ml-0 rounded-sm">
              <MenuIcon :size=28 />
            </div>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>MENU</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid items-center gap-4">
                <NuxtLink to="https://phil-tran-dev.vercel.app/" target="_blank">
                  <Button class="w-full" variant="secondary">Home</Button>
                </NuxtLink>
              </div>
            </div>
            <DialogFooter>
              <NuxtLink to="/login" v-if="!user">
                <Button type="submit">
                  Login
                </Button>
              </NuxtLink>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  </div>
</template>


<style></style>