import { useSelector } from 'react-redux';
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

function VoteInput({ targetId, upVotesBy, downVotesBy, handleToggleVote }) {
  const { authUser } = useSelector((state) => state.authUser);

  const checkCurrentVote = () => {
    if (authUser) {
      const isVoteUp = upVotesBy.includes(authUser.id);
      if (isVoteUp) {
        return 'up';
      }

      const isVoteDown = downVotesBy.includes(authUser.id);
      if (isVoteDown) {
        return 'down';
      }
    }

    return 'neutral';
  };
  const onClickVote = (type) => {
    if (!authUser) {
      alert('login dulu');
      return;
    }

    const voteType = currentVote === type ? 'neutral' : type;

    handleToggleVote({ userId: authUser.id, targetId, type: voteType });
  };
  const currentVote = checkCurrentVote();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <button htmlFor="up-vote" className="flex gap-1 items-center text-sm font-normal text-gray-900" onClick={() => onClickVote('up')}>
          {currentVote === 'up' ? <FaThumbsUp /> : <FaRegThumbsUp />} <span>{upVotesBy.length}</span>
        </button>
      </div>
      <div className="flex items-center">
        <button className="flex gap-1 items-center text-sm font-normal text-gray-900" onClick={() => onClickVote('down')}>
          {currentVote === 'down' ? <FaThumbsDown /> : <FaRegThumbsDown />} <span>{downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
}

VoteInput.propTypes = {
  targetId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  handleToggleVote: PropTypes.func.isRequired,
};
export default VoteInput;
