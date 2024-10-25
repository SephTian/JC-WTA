import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useInput } from '../../hooks/useInput';
import LoadingSpinner from '../LoadingSpinner';

function ThreadInput({ handleCreateThread }) {
  const [category, handleCategory] = useInput('');
  const [title, handleTitle] = useInput('');
  const [body, handleBody] = useInput('', { isHTML: true });
  const { statusCreateThread, errorCreateThread } = useSelector((state) => state.threads);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateThread({ title, body, category });
  };

  return (
    <form className="bg-white w-full px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <p data-testid="error-alert" className="text-red-500 text-center">
        {errorCreateThread && errorCreateThread}
      </p>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Kategori
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={category}
          type="text"
          placeholder="Kategori"
          onChange={handleCategory}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Judul
        </label>
        <input
          className="border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={title}
          type="text"
          placeholder="Judul"
          onChange={handleTitle}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Konten</label>
        <div className="min-h-[100px] border border-[#248277] rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" contentEditable onInput={handleBody} />
      </div>

      <button disabled={statusCreateThread === 'loading'} className="w-full flex items-center justify-center gap-2 bg-[#248277] text-white font-bold py-2 px-4 rounded-md " type="submit">
        {statusCreateThread === 'loading' && <LoadingSpinner size="sm" />}
        Kirim
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  handleCreateThread: PropTypes.func.isRequired,
};

export default ThreadInput;
