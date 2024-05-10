import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import refresh from "@vitejs/plugin-react-refresh";
import laravel from "laravel-vite-plugin";
import tailwindcss from "tailwindcss";
import postcss from "postcss";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        react(),
        refresh(),
        tailwindcss(),
        postcss(),
    ],
    server: {
        host: "localhost",
        port: 8080, 
    },
});
