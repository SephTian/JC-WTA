import PropTypes from 'prop-types';

function CategoriesList({ categories, currentCategory, handleSetCategory }) {
  const onClickCategory = (category) => {
    if (currentCategory === category) {
      handleSetCategory('');
      return;
    }

    handleSetCategory(category);
    return;
  };
  return (
    <div className="flex gap-3">
      {categories.map((category) => {
        return (
          <button
            key={category}
            onClick={() => onClickCategory(category)}
            className={`border ${category === currentCategory ? 'bg-blue-950 text-white' : 'border-blue-950 text-blue-950'}  block px-3 py-2 rounded-md text-md font-medium `}
          >
            #{category}
          </button>
        );
      })}
    </div>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  handleSetCategory: PropTypes.func.isRequired,
};

export default CategoriesList;
