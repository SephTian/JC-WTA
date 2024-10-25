import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { BsReply } from 'react-icons/bs';
import CategoryBox from './CategoryBox';
import VoteInput from './VoteInput';

import { showFormattedTimeCount } from '../../utils';

function ThreadItem({ id, title, body, category, createdAt, ownerId, upVotesBy, downVotesBy, totalComments, handleToggleVote }) {
  const { users } = useSelector((state) => state.users);

  const { name = 'User' } = useMemo(() => users?.find((user) => user.id === ownerId) ?? {}, [ownerId, users]);
  return (
    <div className="space-y-3 border-b-2 pb-3 my-6">
      <CategoryBox category={category} />
      <header className="">
        <Link className="text-xl font-semibold text-blue-900 hover:underline" to={`/threads/${id}`}>
          {title}
        </Link>
      </header>
      <article className="text-gray-500 font-medium text-sm overflow-hidden line-clamp-4">{parse(body)}</article>
      <footer className="flex gap-3">
        <VoteInput targetId={id} upVotesBy={upVotesBy} downVotesBy={downVotesBy} handleToggleVote={handleToggleVote} />
        <div className="flex items-center gap-1">
          <BsReply /> <span>{totalComments}</span>
        </div>
        <div className="">{showFormattedTimeCount(createdAt)} yang lalu</div>
        <div className="">
          Dibuat oleh <span className="font-medium mx-0">{name}</span>
        </div>
      </footer>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  handleToggleVote: PropTypes.func.isRequired,
};

export default ThreadItem;
