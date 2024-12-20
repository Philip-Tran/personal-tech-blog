import { lazy } from "zod";

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface PostsState {
  posts: Post[];
}
interface State {
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

export const usePostStore = defineStore("postClient", () => {
  const posts = ref<Post[]>();
  const currentPost = ref<Post | null>(null);

  const state = ref<State>({
    isLoading: false,
    isSuccess: false,
    message: "",
  });

  const getPosts = async (): Promise<Post[] | undefined> => {
    try {
      state.value.isLoading = true;
      const data = await $fetch<Post[]>("/api/post/get", {
        method: "GET",
      });
      if (data) {
        posts.value = data;
        state.value.isSuccess = true;
        return data;
      } else {
        state.value.message = "No post found";
        return undefined;
      }
    } catch (error) {
      state.value.isLoading = false;
      state.value.isSuccess = false;
      state.value.message =
        error instanceof Error ? error.message : "Failed to fetch posts";
      console.error(state.value.message);
      return undefined;
    } finally {
      state.value.isLoading = false;
    }
  };

  const getSinglePost = async (slug: string): Promise<Post | null> => {
    try {
      state.value.isLoading = true;
      const data = await $fetch<Post>(`/api/post/${slug}`, {
        method: "GET",
      });
      if (data) {
        currentPost.value = data;
        return data;
      } else {
        state.value.message = "Post not found";
        return null;
      }
    } catch (error) {
      state.value.isLoading = false;
      state.value.isSuccess = false;
      state.value.message =
        error instanceof Error ? error.message : "Failed to fetch post";
      return null;
    }
  };

  return { posts, state, getPosts, getSinglePost, currentPost };
});
