<script lang="ts" setup>
defineProps<{
    editor: TiptapEditor,
    setLink: () => void
}>()

import type { TiptapEditor } from '#build/imports';
import { LucideBold, LucideItalic, LucideStrikethrough, LucideCode, LucideX, LucideTrash, LucideAlignJustify, LucideHeading1, LucideHeading2, LucideHeading3, LucideList, LucideListOrdered, LucideTerminal, LucideQuote, LucideArrowLeft, LucideArrowRight, Redo, Undo, Link } from 'lucide-vue-next';

</script>

<template>
    <div class="w-min flex  space-x-3">
        <button @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('bold') }">

            <LucideBold :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.setLink().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('link') }">
            <Link :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('italic') }">
            <LucideItalic :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('strike') }">
            <LucideStrikethrough :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('code') }">
            <LucideCode :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()" class="lg:p-2 hover:bg-slate-100">
            <LucideX :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().clearNodes().run()" class="lg:p-2 hover:bg-slate-100">
            <LucideTrash :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().setParagraph().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('paragraph') }">
            <LucideAlignJustify :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            <LucideHeading1 :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            <LucideHeading2 :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            <LucideHeading3 :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleBulletList().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            <LucideList :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('orderedList') }">
            <LucideListOrdered :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleCodeBlock().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('codeBlock') }">
            <LucideTerminal :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().toggleBlockquote().run()" class="lg:p-2 hover:bg-slate-100"
            :class="{ 'is-active': editor.isActive('blockquote') }">
            <LucideQuote :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()" class="lg:p-2 hover:bg-slate-100">
            Line
        </button>
        <button @click="editor.chain().focus().setHardBreak().run()" class="lg:p-2 hover:bg-slate-100">
            Break
        </button>
        <button @click="editor.chain().focus().undo().run()" class="lg:p-2 hover:bg-slate-100"
            :disabled="!editor.can().chain().focus().undo().run()">
            <Undo :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
        <button @click="editor.chain().focus().redo().run()" class="lg:p-2 hover:bg-slate-100"
            :disabled="!editor.can().chain().focus().redo().run()">
            <Redo :size=18 class="text-gray-700 hover:text-gray-950" />
        </button>
    </div>
</template>

<style scoped></style>