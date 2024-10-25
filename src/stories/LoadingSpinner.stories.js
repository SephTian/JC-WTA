import LoadingSpinner from '../components/LoadingSpinner';

const stories = {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Small = {
  args: {
    size: 'sm',
  },
};

export const Medium = {
  args: {
    size: 'md',
  },
};

export const Large = {
  args: {
    size: 'lg',
  },
};
export const ExtraLarge = {
  args: {
    size: 'xl',
  },
};
export default stories;
