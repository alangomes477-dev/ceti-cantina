/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // 👇 AQUI ESTÁ A MUDANÇA MÁGICA
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;