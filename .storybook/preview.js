/** @type { import('@storybook/react').Preview } */
import '../src/styles/index.css'; // Pastikan ini menunjuk ke file utama yang mengimpor Tailwind

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
