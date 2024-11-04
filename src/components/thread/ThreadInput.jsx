import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
//import { useInput } from '../../hooks/useInput';
import LoadingSpinner from '../LoadingSpinner';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

function ThreadInput({ onCreateThread }) {
  const { errorCreateThread } = useSelector((state) => state.threads);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCreateThread = async (data) => {
    const { title, body, category } = data;
    await onCreateThread({ title, body, category });
  };

  //untuk masukkin value content ke dalam
  const handleBody = ({ target }) => {
    setValue('body', target.innerHTML);
  };

  const validateCategory = {
    required: 'Category is required',
  };

  const validateTitle = {
    required: 'Title is required',
  };

  const validateBody = useMemo(() => {
    return {
      required: 'Content is required',
      validate: (value) => value.trim() !== '' || 'Content cannot be empty',
    };
  }, []);

  useEffect(() => {
    register('body', validateBody);
  }, [register, validateBody]);

  return (
    <form className="bg-white w-full px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleCreateThread)}>
      <p data-testid="error-alert" className="text-red-500 text-center">
        {errorCreateThread && errorCreateThread}
      </p>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Kategori
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register('category', validateCategory)}
          type="text"
          placeholder="Kategori"
        />
        <p className="text-red-500 text-sm">{errors.category?.message}</p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Judul
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          {...register('title', validateTitle)}
          type="text"
          placeholder="Judul"
        />
        <p className="text-red-500 text-sm">{errors.title?.message}</p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Konten</label>
        <div className="min-h-[100px] border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" contentEditable onInput={handleBody} />
        <p className="text-red-500 text-sm">{errors.body?.message}</p>
      </div>

      <button disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-[#248277] text-white font-bold py-2 px-4 rounded-md disabled:bg-[#154d46]" type="submit">
        {isSubmitting && <LoadingSpinner size="sm" />}
        Kirim
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  onCreateThread: PropTypes.func.isRequired,
};

export default ThreadInput;
