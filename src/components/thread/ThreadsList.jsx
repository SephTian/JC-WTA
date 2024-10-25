import PropTypes, { object } from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadsList({ threads, handleToggleVote }) {
  return (
    <div>
      {threads.length === 0 ? (
        <div className="h-full w-full flex justify-center pb-4">
          <p className="font-medium text-gray-500 text-lg">Belum ada diskusi</p>
        </div>
      ) : (
        <>
          {threads.map((thread) => {
            return <ThreadItem key={thread.id} {...thread} handleToggleVote={handleToggleVote} />;
          })}
        </>
      )}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(object).isRequired,
  handleToggleVote: PropTypes.func.isRequired,
};

export default ThreadsList;
