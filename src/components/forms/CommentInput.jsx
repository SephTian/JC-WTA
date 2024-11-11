import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CommentInput({ onAddComment }) {
  const { authUser } = useSelector((state) => state.authUser);
  const { errorAddComment } = useSelector((state) => state.detailThread);
  const contentRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSubmitComment = async (data) => {
    const { content } = data;
    contentRef.current.textContent = '';
    setValue('content', '');
    await onAddComment({ content });
  };

  const handleCommentChange = ({ target }) => {
    setValue('content', target.innerHTML);
  };

  const validateComment = useMemo(() => {
    return {
      required: 'Comment is required',
      validate: (value) => value.trim() !== '' || 'Comment cannot be empty',
    };
  }, []);

  useEffect(() => {
    register('content', validateComment);
  }, [register, validateComment]);

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
    <form className="my-4 space-y-3" onSubmit={handleSubmit(handleSubmitComment)}>
      <h1 className="text-xl font-medium text-blue-900">Beri Komentar</h1>
      <div ref={contentRef} role="commentContent" contentEditable className="my-4 p-3 bg-gray-50 border-2 border-[#248277] rounded-md min-h-[100px]" onInput={handleCommentChange} />
      {errorAddComment && <p className="text-red-500 text-sm">{errorAddComment}</p>}
      {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      <button disabled={isSubmitting} className="flex items-center justify-center gap-2 bg-[#248277] text-white w-full rounded-md py-2 disabled:bg-[#17554e]" type="submit">
        {isSubmitting && <LoadingSpinner size="sm" />}
        Kirim
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
