import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", () => {
  const state = ref({
    user: {},
  });

  return { state };
});

export { useAuthStore };
