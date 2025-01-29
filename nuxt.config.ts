// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "rotate" },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/supabase",
    "nuxt-tiptap-editor",
    "@stefanobartoletti/nuxt-social-share",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    [
      "@vee-validate/nuxt",
      {
        autoImports: false,
      },
    ],
  ],
  socialShare: {
    baseUrl: "https://phil-tran-blog.vercel.app", // required!
    // other optional module options
  },
  plugins: ["~/plugins/prism.js"],
  piniaPluginPersistedstate: {
    storage: "cookies",
    debug: true,
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_KEY,
    },
  },
  // build: {
  //   transpile: ["prismjs"],
  // },
  supabase: {
    redirect: false,
    // redirectOptions: {
    //   login: "/login",
    //   callback: "/dashboard",
    //   include: ["/dashboard"],
    //   exclude: ["/"],
    // },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
});