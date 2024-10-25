import { useSelector } from 'react-redux';
import { useInput } from '../../hooks/useInput';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function CommentInput({ handleAddComment }) {
  const { authUser } = useSelector((state) => state.authUser);
  const { errorAddComment, statusAddComment } = useSelector((state) => state.detailThread);
  const [content, handleContent, resetContent] = useInput('', { isHTML: true });
  const contentBody = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    contentBody.current.innerHTML = '';
    resetContent();
    handleAddComment({ content });
  };

  if (!authUser) {
    return (
      <div className="my-4 space-y-3">
        <h1 className="text-xl font-medium text-blue-900">Beri Komentar</h1>
        <p className="font-medium text-md">
          Silahkan login terlebih dahulu{' '}
          <Link className="inline-block align-baseline font-bold text-sm text-blue-700 hover:underline" to="/login">
            disini.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="my-4 space-y-3" onSubmit={handleSubmit}>
      <h1 className="text-xl font-medium text-blue-900">Beri Komentar</h1>
      <div ref={contentBody} role="commentContent" contentEditable className="my-4 p-3 bg-gray-50 border-2 border-[#248277] rounded-md min-h-[100px]" onInput={handleContent} />
      <button className="flex items-center justify-center gap-2 bg-[#248277] text-white w-full rounded-md py-2" type="submit">
        {statusAddComment === 'loading' && <LoadingSpinner size="sm" />}
        Kirim
      </button>
      {errorAddComment && <p className="text-red-500 text-center">{errorAddComment}</p>}
    </form>
  );
}

CommentInput.propTypes = {
  handleAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
