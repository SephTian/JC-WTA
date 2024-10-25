import PropTypes from 'prop-types';

function CategoryBox({ category }) {
  return (
    <div className="flex gap-2">
      <div className="border border-black rounded-[4px] w-fit py-1 px-2">
        <p className="text-xs">#{category}</p>
      </div>
    </div>
  );
}

CategoryBox.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategoryBox;
