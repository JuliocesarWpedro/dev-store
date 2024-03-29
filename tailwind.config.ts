import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      gridTemplateColumns: {
        "important": '1fr !important',
      },
      gridTemplateRows: {
        app: 'min-content max-content',
      },
      screens: {
        xl: { max: '1279px' },
        lg: { max: '1023px' },
        slg: { max: '850px' },
        md: { max: '767px' },
        sm: { max: '639px' },
        bsm: { max: '450px' },
        bgsm: { max: '370px' },
      },
    },
  },
  plugins: [],
};
export default config;
