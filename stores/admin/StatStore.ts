export const useStatsStore = defineStore("stats", () => {
  const totalPost = ref<number>();
  const totalPublishedPost = ref<number>();

  async function fetchStats() {
    const data = await $fetch("/api/admin/get-stats", {
      method: "GET",
    });
    totalPost.value = data?.totalPost || 0;
    totalPublishedPost.value = data?.totalPublishedPost || 0;
  }

  return {
    totalPost,
    totalPublishedPost,
    fetchStats,
  };
});
