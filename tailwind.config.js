/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {
            colors: {
                backgroundFormColor: "#894A2A4D",
                bodyColor: "#F9CDA3",
                colorStep: "#FFB718",
            },
            backgroundImage: {
                landing: "url('/public/images/Landing.jpg')",
                loginfundo: "url('/public/images/FundoLogin.png')",
            },
        },
        fontFamily: {
            roboto: ["Roboto", "sans-serif"],
        },
    },
    plugins: [],
};
