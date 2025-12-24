/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                vibes: ["var(--font-great-vibes)"],
            },
            colors: {
                christmas: {
                    red: "#D42426",
                    gold: "#FFD700",
                    green: "#165B33",
                },
            },
        },
    },
    plugins: [],
};
