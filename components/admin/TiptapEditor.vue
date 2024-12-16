<template>
  <div class="flex flex-col w-full">
    <div v-if="editor" class="hidden">
      <AdminEditorButtons :editor="editor" />
    </div>
    <div class="w-full mx-auto">
      <TiptapEditorContent :editor="editor" class="w-700px" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | undefined;
}>();

import { TiptapCodeBlock } from '~/composables/tiptapExt';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'


import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import { all, createLowlight } from 'lowlight'
import CodeBlockComponent from './CodeBlockComponent.vue'

// create a lowlight instance
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)


const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  extensions: [TiptapStarterKit, TiptapPlaceholder.configure({ placeholder: 'Start writing here...' }), TiptapCodeBlock, CodeBlockLowlight
    .configure({ lowlight }),],
  editorProps: {
    attributes: {
      spellcheck: "true",
      class: "prose w-full w-[700px]  text-xl font-serif leading-relaxed text-grey-700 prose-sm  min-h-60 overflow-y-auto focus:outline-none"
    },
    transformPastedText(text) {
      return text.toUpperCase()
    }
  },
});

watch(
  () => props.modelValue,
  //@ts-ignore
  (newValue: string) => {
    if (editor.value) {
      const isSame = editor.value.getHTML() === newValue;

      if (!isSame) {
        editor.value.commands.setContent(newValue, false);
      }
    }
  }
);

onBeforeUnmount(() => {
  unref(editor)?.destroy();
});
</script>

<style>
/* Placeholder (at the top) */
p.is-editor-empty:first-child::before {
  color: var(--gray-4);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>