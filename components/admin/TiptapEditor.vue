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
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  extensions: [TiptapStarterKit],
  editorProps: {
    attributes: {
      spellcheck: "true",
      class: "prose w-full w-[700px] text-lg font-serif leading-relaxed text-grey-700 prose-sm  min-h-60 overflow-y-auto focus:outline-none"
    },
    transformPastedText(text) {
      return text.toUpperCase()
    }
  },
});

watch(
  () => props.modelValue,
  (newValue: string) => {
    if (editor.value) {
      const isSame = editor.value.getHTML() === newValue;

      // If the new value is already the same, skip updating the content
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