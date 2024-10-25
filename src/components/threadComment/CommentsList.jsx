import PropTypes, { object } from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({ comments, handleToggleVoteComment }) {
  if (comments.length === 0) {
    return (
      <article className="space-y-3 my-8 ">
        <h1 className="text-xl font-medium text-blue-900">Komentar (0)</h1>
        <div className="h-[100px] flex justify-center items-center">
          <p className="font-medium text-gray-500 text-lg">Belum ada komentar</p>
        </div>
      </article>
    );
  }

  return (
    <article className="space-y-6 my-8">
      <h1 className="text-xl font-medium text-blue-900">Komentar ({comments.length})</h1>
      {comments.map((comment) => {
        return <CommentItem key={comment.id} {...comment} handleToggleVoteComment={handleToggleVoteComment} />;
      })}
    </article>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(object).isRequired,
  handleToggleVoteComment: PropTypes.func.isRequired,
};

export default CommentsList;
