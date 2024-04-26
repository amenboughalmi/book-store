import path from "path-browserify"

export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        path: "path-browserify"
      },
    },
  })