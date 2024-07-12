/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "selector",
    content: [
        "./src/renderer/index.html",
        "./src/renderer/src/**/*.{svelte,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {}
    },
    plugins: []
};
