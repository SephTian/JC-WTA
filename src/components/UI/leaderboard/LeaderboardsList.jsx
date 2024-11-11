import PropTypes, { object } from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardsList({ leaderboards }) {
  return (
    <article className="space-y-3 my-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-blue-900">Pengguna</h1>
        <h1 className="text-md font-medium text-gray-500">Skor</h1>
      </div>
      {leaderboards.length === 0 ? (
        <div className="h-[100px] flex justify-center items-center">
          <p className="font-medium text-gray-500 text-lg">Belum ada pengguna</p>
        </div>
      ) : (
        <>
          {leaderboards.map((leaderboard) => {
            return <LeaderboardItem key={leaderboard.user.id} {...leaderboard.user} score={leaderboard.score} />;
          })}
        </>
      )}
    </article>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(object).isRequired,
};

export default LeaderboardsList;
