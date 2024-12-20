import { defineStore } from "pinia";
import { ref } from "vue";

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
  published: boolean;
}

interface PostState {
  post: Post;
  message: string;
  isLoading: boolean;
}

const usePostStore = defineStore(
  "post",
  () => {
    const posts = ref<Post[]>();
    const state: Ref<PostState> = ref({
      post: {
        title: "",
        content: "",
        published: true,
        createdAt: new Date(),
        id: "",
        slug: "",
      },
      message: "",
      isLoading: false,
    });

    const addPost = async (values: Post) => {
      try {
        const { data } = await $fetch("/api/post/create", {
          method: "POST",
          body: values,
        });

        return data;
      } catch (error) {
        console.error("Error adding post:", (error as Error).message);
        return null;
      }
    };

    const editPost = async (values: Post, postId: string) => {
      try {
        const data = await $fetch(`/api/admin/${postId}`, {
          method: "PUT",
          body: values,
        });

        return data;
      } catch (error) {
        console.error("Error adding post:", (error as Error).message);
        return null;
      }
    };

    const deletePost = async (postId: string) => {
      try {
        const data = await $fetch("/api/admin/delete-post", {
          method: "DELETE",
          body: { id: postId },
        });
        if (data) {
          state.value.message = data.message;
          return { success: true };
        } else {
          state.value.message = "Error";
          console.log("error");
        }
      } catch (error) {
        console.error("Error deleting post:", (error as Error).message);
        return null;
      }
    };

    const getPosts = async (postsNumber: number) => {
      try {
        const data = await $fetch<Post[]>(`/api/admin/posts/${postsNumber}`, {
          method: "GET",
        });
        console.log("-----------------hehre------------");
        if (data) console.log("has data");
        console.log(data);
        posts.value = data;
        return data;
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    return { state, addPost, deletePost, editPost, getPosts, posts };
  },
  {
    persist: true,
  }
);

if (import.meta.client) {
  const postString = localStorage.getItem("post");

  if (postString) {
    try {
      const parsedPost = JSON.parse(postString);

      // Check if the parsed post has a title or content
      if (parsedPost.state?.post?.title || parsedPost.state?.post?.content) {
        console.log("Stored title:", parsedPost.state.post.title);
        console.log("Stored content:", parsedPost.state.post.content);

        // If you want to apply it to the store
        const postStore = usePostStore();
        postStore.state.post.title = parsedPost.state.post.title;
        postStore.state.post.content = parsedPost.state.post.content;
      }
    } catch (error) {
      console.error("Error parsing stored post:", error);
    }
  }
}

export { usePostStore };
