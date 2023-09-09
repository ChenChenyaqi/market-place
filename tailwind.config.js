// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                "primary": {
                    "100": "#FECCEE",
                    "200": "#FE9AE7",
                    "300": "#FE68E8",
                    "400": "#FD42F2",
                    "500": "#F704FD",
                    "600": "#C202D9",
                    "700": "#9302B6",
                    "800": "#6A0192",
                    "900": "#4D0079"
                },
                "success": {
                    "100": "#EFFCD2",
                    "200": "#DBFAA7",
                    "300": "#BDF178",
                    "400": "#9FE355",
                    "500": "#74D123",
                    "600": "#59B319",
                    "700": "#419611",
                    "800": "#2C790B",
                    "900": "#1E6406"
                },
                "info": {
                    "100": "#D6F3FE",
                    "200": "#AEE4FE",
                    "300": "#86D0FD",
                    "400": "#67BBFB",
                    "500": "#369BF9",
                    "600": "#2778D6",
                    "700": "#1B5AB3",
                    "800": "#113F90",
                    "900": "#0A2C77"
                },
                "warning": {
                    "100": "#FEFED0",
                    "200": "#FEFDA2",
                    "300": "#FDFB73",
                    "400": "#FBF951",
                    "500": "#F9F618",
                    "600": "#D6D311",
                    "700": "#B3B00C",
                    "800": "#908E07",
                    "900": "#777504"
                },
                "danger": {
                    "100": "#FFECD2",
                    "200": "#FFD4A4",
                    "300": "#FFB678",
                    "400": "#FF9956",
                    "500": "#FF691E",
                    "600": "#DB4B15",
                    "700": "#B7310F",
                    "800": "#931D09",
                    "900": "#7A0E05"
                }
            },
            keyframes:{
                "zoom-out":{
                    '0%': {
                        width: '0',
                        height: '0'
                    },
                    '100%': {
                        width: '100%',
                        height: '100%'
                    }
                },
                "zoom-in": {
                    '0%': {
                        width: '100%',
                        height: '100%'
                    },
                    '100%': {
                        width: '0',
                        height: '0'
                    }
                }

            }
        }
    },
    plugins: [],
}