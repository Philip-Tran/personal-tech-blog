import { defineStore } from "pinia";

export interface Post {
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface PostsState {
  posts: Post[];
}

export const usePostStore = defineStore("postClient", () => {
  const posts = ref<Post[]>();
  const currentPost = ref<Post | null>(null);

  const state = {
    isLoading: false,
    isSuccess: false,
    message: "",
  };

  const getPosts = async () => {
    try {
      const data = await $fetch<Post[]>("/api/post/get", {
        method: "GET",
      });
      posts.value = data;
      console.log(data);
      return data;
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const getSinglePost = async (slug: string) => {
    try {
      state.isLoading = true;
      const post = await $fetch(`/api/post/${slug}`, {
        method: "GET",
      });
      if (post) {
        currentPost.value = post;
        return post;
      } else {
        state.message = "Post not found";
        return null;
      }
    } catch (error) {
      state.isLoading = false;
      state.isSuccess = false;
      state.message =
        error instanceof Error ? error.message : "Failed to fetch post";
      return null;
    }
  };

  return { posts, state, getPosts, getSinglePost, currentPost };
});
