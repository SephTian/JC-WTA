import PropTypes from 'prop-types';

function LeaderboardItem({ avatar, name, score }) {
  return (
    <div className="min-w-[250px] space-y-3 border-b-2 border-gray-200 p-3 my-6 bg-white">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2 align-top">
          <img className="h-8 bg-cover aspect-square rounded-full" src={avatar} alt="user" />
          <div className="font-medium mx-0">{name}</div>
        </div>
        <div className="text">{score}</div>
      </header>
    </div>
  );
}

LeaderboardItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
