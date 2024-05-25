/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
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
