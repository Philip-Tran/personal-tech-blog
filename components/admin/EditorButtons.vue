<script lang="ts" setup>
defineProps<{
    editor: TiptapEditor,
    setLink: () => void
}>()

import type { TiptapEditor } from '#build/imports';
import { LucideBold, LucideItalic, LucideStrikethrough, LucideCode, LucideX, LucideTrash, LucideAlignJustify, LucideHeading1, LucideHeading2, LucideHeading3, LucideList, LucideListOrdered, LucideTerminal, LucideQuote, LucideArrowLeft, LucideArrowRight } from 'lucide-vue-next';

</script>

<template>
    <div class="editor-buttons w-full sticky top-0 bg-white shadow-md z-10">
        <button @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }">
            <LucideBold />
        </button>
        <button @click="editor.setLink().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('link') }">
            Set Link
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            <LucideItalic />
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }">
            <LucideStrikethrough />
        </button>
        <button @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }">
            <LucideCode />
        </button>
        <button @click="editor.chain().focus().unsetAllMarks().run()">
            <LucideX />
        </button>
        <button @click="editor.chain().focus().clearNodes().run()">
            <LucideTrash />
        </button>
        <button @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }">
            <LucideAlignJustify />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            <LucideHeading1 />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            <LucideHeading2 />
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            <LucideHeading3 />
        </button>
        <button @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            <LucideList />
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }">
            <LucideListOrdered />
        </button>
        <button @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }">
            <LucideTerminal />
        </button>
        <button @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }">
            <LucideQuote />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
            hdhd
        </button>
        <button @click="editor.chain().focus().setHardBreak().run()">
            break
        </button>
        <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
            <LucideArrowLeft />
        </button>
        <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
            <LucideArrowRight />
        </button>
    </div>
</template>

<style scoped>
.editor-buttons {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    background-color: #fff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 0;
}

button {
    background-color: transparent;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

button.is-active {
    background-color: #4CAF50;
    color: white;
}

button:hover:not(:disabled) {
    background-color: #f0f0f0;
    transform: scale(1.1);
}
</style>