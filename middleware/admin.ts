export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value?.email !== "quyetcoccoc@gmail.com") {
    return navigateTo("/");
  }
});
