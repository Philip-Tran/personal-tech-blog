export const useStatsStore = defineStore("stats", () => {
  const totalPost = ref<number>();

  async function fetchStats() {
    const data = await $fetch("/api/admin/get-stats", {
      method: "GET",
    });
    totalPost.value = data || 0;
  }

  return {
    totalPost,
    fetchStats,
  };
});
