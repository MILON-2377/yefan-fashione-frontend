// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                marquee: "marquee 35s linear infinite",
            },
        },
    },
};

export default config;