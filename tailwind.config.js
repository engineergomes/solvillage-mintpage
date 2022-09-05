module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: true,
    theme: {
        extend: {
            colors: {
                blue: {
                    dark: "rgb(25, 38, 74, 0.85)",
                },
            },
        },
        extend: {},
        fontFamily: {
            monstmedium: ["Monst-Medium, sans-serif"],
            roboto: ["RobotoMono, sans-serif"],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
