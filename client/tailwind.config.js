import keepPreset from "keep-react/preset";
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [keepPreset],
    theme: {
        extend: {
            colors: {
                header_background: "#E9EFF6",
            },
            backgroundImage: {
                header_background:
                    "url('/src/assets/images/landing_page/header_background.svg')",
                header_bottom:
                    "url('/src/assets/images/landing_page/header_bottom.png')",
                contact_us:
                    "url('/src/assets/images/landing_page/contact_us.svg')",
            },
        },
    },
};
