import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import refresh from "@vitejs/plugin-react-refresh";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        react(),
        refresh(),
    ],
    server: {
        host: "localhost",
        port: 8080, // Adjust port if needed
    },
});
