import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import VoteInput from '../thread/VoteInput';

import { showFormattedTimeCount } from '../../../utils';

function CommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy, handleToggleVoteComment }) {
  return (
    <div className="space-y-3 border-b-2 border-gray-200 p-3 my-6 ">
      <header className="flex justify-between">
        <div className="flex items-center gap-2 align-top">
          <img className="h-8 bg-cover aspect-square rounded-full" src={owner.avatar} alt="user" />
          <div className="font-medium mx-0 ">{owner.name}</div>
        </div>
        <div className="">{showFormattedTimeCount(createdAt)} yang lalu</div>
      </header>
      <article className="text-sm overflow-hidden line-clamp-4 py-2">{parse(content)}</article>
      <footer className="">
        <VoteInput targetId={id} upVotesBy={upVotesBy} downVotesBy={downVotesBy} handleToggleVote={handleToggleVoteComment} />
      </footer>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  handleToggleVoteComment: PropTypes.func.isRequired,
};

export default CommentItem;
