import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetDetailThread, asyncToggleVoteComment } from '../states/slices/detailThreadSlice';
import { useParams } from 'react-router-dom';
import { asyncToggleVoteDetailThread, asyncCreateComment } from '../states/slices/detailThreadSlice';
import parse from 'html-react-parser';
import CategoryBox from '../components/thread/CategoryBox';
import VoteInput from '../components/thread/VoteInput';
import CommentInput from '../components/threadComment/CommentInput';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { showFormattedTimeCount } from '../utils';
import CommentsList from '../components/threadComment/CommentsList';

function DetailThreadPage() {
  const dispatch = useDispatch();
  const { threadId } = useParams();
  const { users } = useSelector((state) => state.users);
  const { detailThread, status } = useSelector((state) => state.detailThread);

  useEffect(() => {
    dispatch(asyncGetDetailThread(threadId));
  }, [dispatch, threadId]);

  const handleToggleVote = ({ userId, targetId, type }) => {
    dispatch(asyncToggleVoteDetailThread({ userId, threadId: targetId, type }));
  };

  const handleToggleVoteComment = ({ userId, targetId, type }) => {
    dispatch(asyncToggleVoteComment({ userId, threadId: detailThread.id, commentId: targetId, type }));
  };

  const handleAddComment = async ({ content }) => {
    try {
      await dispatch(asyncCreateComment({ threadId: detailThread.id, content })).unwrap();
    } catch (err) {
      if (!err.error) {
        console.error(err.message);
      } else {
        console.error(err.error.message);
      }
    }
  };

  if (status === 'idle') {
    return <div className="w-full max-w-[900px] bg-white"></div>;
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center w-full max-w-[900px] bg-white">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex justify-center items-center w-full max-w-[900px] bg-white">
        <h1 className="text-xl">Silahkan refresh ulang website anda</h1>
      </div>
    );
  }

  const { name } = users.find((user) => user.id === detailThread.owner.id);
  return (
    <section className="w-full max-w-[900px] bg-white px-8 py-8">
      <article className="space-y-4">
        <CategoryBox category={detailThread.category} />
        <h1 className="text-3xl font-semibold text-blue-900">{detailThread.title}</h1>
        <div className="text-md ">{parse(detailThread.body)}</div>
        <div className="flex gap-3 mt-3 p-4 rounded-md border-2 border-[#248277]">
          <VoteInput targetId={detailThread.id} upVotesBy={detailThread.upVotesBy} downVotesBy={detailThread.downVotesBy} handleToggleVote={handleToggleVote} />
          <div className="text-md">{showFormattedTimeCount(detailThread.createdAt)} yang lalu</div>
          <div className="text-md">
            Dibuat oleh <span className="font-medium mx-0">{name}</span>
          </div>
        </div>
      </article>
      <CommentInput onAddComment={handleAddComment} />
      <CommentsList comments={detailThread.comments} handleToggleVoteComment={handleToggleVoteComment} />
    </section>
  );
}

export default DetailThreadPage;
