import PropTypes from 'prop-types';

function ThreadsSearchInput({ keyword, onChange }) {
  return (
    <input
      className="border border-blue-950 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Search thread..."
      value={keyword}
      onChange={onChange}
    />
  );
}

ThreadsSearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default ThreadsSearchInput;
