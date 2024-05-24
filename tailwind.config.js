/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.tsx",
        "./resources/**/*.ts",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "landing": "url('/public/images/Landing.jpg')",
            },
        },
        fontFamily: {
            roboto: ["Roboto", "sans-serif"],
        },
    },
    plugins: [],
};
