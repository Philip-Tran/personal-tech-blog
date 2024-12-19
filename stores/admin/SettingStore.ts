import { defineStore } from "pinia";
import { piniaPluginPersistedstate } from "#build/imports";

export const useSettingStore = defineStore(
  "setting",
  () => {
    const state = ref({
      isEditorButtonsOpen: false,
      isFocusMode: false,
    });

    const toggleEditorButton = () => {
      state.value.isEditorButtonsOpen = !state.value.isEditorButtonsOpen;
    };
    return { state, toggleEditorButton };
  },
  {
    persist: true,
  }
);
