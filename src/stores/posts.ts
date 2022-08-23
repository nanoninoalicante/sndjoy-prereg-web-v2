import { defineStore } from "pinia";
import { $fetch } from "ohmyfetch";

export const usePostStore = defineStore("posts", {
    state: () => {
        return {
            post: null,
            relatedPosts: null,
            currentVisiblePost: null,
        };
    },
    getters: {
        getPost: (state) =>
            state.post && state.post.length > 0 ? state.post[0] : null,
        getRelatedPosts: (state) => state.relatedPosts,
        getAuthor: (state) => {
            return state.post && state.post.length > 0
                ? state.post[0]?.userInfo
                : null;
        },
    },
    actions: {
        setCurrentVisiblePost(post) {
            this.currentVisiblePost = post;
        },
        async fetchPost(postId) {
            console.log("nuxt: ", this.$nuxt.$config.FEED_API_BASE_URL);
            const { data = [] } = await $fetch(
                `${this.$nuxt.$config.FEED_API_BASE_URL}/posts/${postId}?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`,
                {
                    method: "GET",
                }
            );
            console.log("data: ", JSON.stringify(data));
            if (data.length === 0) {
                throw new Error("cannot find post");
            }
            this.post = data;
            return data;
        },
        async fetchRelatedPosts(postId) {
            console.log(
                "related posts base url: ",
                this.$nuxt.$config.FEED_API_BASE_URL
            );
            const { data = [] } = await $fetch(
                `${this.$nuxt.$config.FEED_API_BASE_URL}/posts/${postId}/related?api_key=16dea2a1-35e8-4332-8cd6-e534300d16b7`,
                {
                    method: "GET",
                }
            );
            console.log("related posts: ", data.length);
            this.relatedPosts = data.slice(0, 10);
            return this.relatedPosts;
        },
    },
});
