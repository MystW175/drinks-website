import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          "primary": "#92d4e5",
          "secondary": "#7fc43a",
          "accent": "#e5d464",
          "neutral": "#252433",
          "info-content": "#6414E8",
          // "base-100": "#3a2d43",
          "base-100": "white",
          "info": "#a1c8f7",
          "success": "#7fe1c7",
          "warning": "#ad7505",
          "error": "#fb3737",
          body: {
            "background-color": "white",
          }
        }, 
      },
    ],
  },
}
export default config
