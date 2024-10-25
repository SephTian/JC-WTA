import LeaderboardItem from '../components/leaderboard/LeaderboardItem';

const stories = {
  title: 'LeaderboardItem',
  component: LeaderboardItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const item = {
  args: {
    avatar: './assets/context.png',
    name: 'Joko Yo',
    score: 20,
  },
};

export default stories;
