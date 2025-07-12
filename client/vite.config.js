import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        build: {
            sourcemap: true, // Source map generation must be turned on
        },
        plugins: [
            react(),
            sentryVitePlugin({
                authToken: process.env.SENTRY_AUTH_TOKEN,
                org: "anand-bhagat",
                project: "javascript-react",
            }),
        ],
    });
};
