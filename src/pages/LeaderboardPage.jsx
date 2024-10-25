import { useEffect } from 'react';
import LeaderboardsList from '../components/leaderboard/LeaderboardsList';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/slices/leaderboardsSlice';
import LoadingSpinner from '../components/LoadingSpinner';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards, status, error } = useSelector((state) => state.leaderboards);
  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <section className="w-full max-w-[800px] bg-white p-8">
      <header>
        <h4 className="font-semibold text-3xl text-blue-950 my-5">Klasemen Pengguna</h4>
      </header>
      <article>
        {status === 'loading' && (
          <div className="w-full h-[65vh] flex justify-center items-center">
            <LoadingSpinner size="xl" />
          </div>
        )}
        {status === 'success' && <LeaderboardsList leaderboards={leaderboards} />}
        {status === 'error' && (
          <div className="w-full h-[300px] flex justify-center items-center">
            <p>{error}</p>
          </div>
        )}
      </article>
    </section>
  );
}

export default LeaderboardPage;
