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

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import { all, createLowlight } from 'lowlight'

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
  extensions: [TiptapStarterKit, TiptapPlaceholder.configure({ placeholder: 'Start writing here...' }), TiptapYoutube.configure({
    controls: false,
    nocookie: true,
  }), TiptapCodeBlock, CodeBlockLowlight
    .configure({ lowlight }),],

  editorProps: {
    attributes: {
      spellcheck: "true",
      class: "prose w-full w-[700px]  text-xl font-serif leading-relaxed text-grey-700 prose-sm  min-h-60 overflow-y-auto focus:outline-none"
    },
    transformPastedText(text) {
      return text
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

<style lang="scss">
/* Placeholder (at the top) */
p.is-editor-empty:first-child::before {
  color: var(--gray-4);
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  pre {
    background: #282c34;
    /* One Dark Pro dark gray background */
    border-radius: 6px;
    color: #abb2bf;
    /* Light gray for general text */
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 1rem 1.25rem;

    code {
      background: none;
      color: inherit;
      font-size: 1rem;
      padding: 0;
    }

    /* Code styling */
    .hljs-comment,
    .hljs-quote {
      color: #5c6370;
      /* Gray for comments */
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #e06c75;
      /* Red tones for variables and tags */
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #d19a66;
      /* Orange tones for numbers and meta */
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #98c379;
      /* Green tones for strings */
    }

    .hljs-title,
    .hljs-section {
      color: #61afef;
      /* Blue for titles and sections */
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #c678dd;
      /* Purple for keywords */
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: bold;
    }
  }
}
</style>
