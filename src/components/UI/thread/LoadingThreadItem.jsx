import PropTypes from 'prop-types';

function LoadingThreadItem({ repeat }) {
  const elements = [];
  for (let i = 0; i < repeat; i++) {
    elements.push(
      <div key={i} className="border border-gray-400 shadow rounded-md p-4 w-full mx-auto mb-4">
        <div className="animate-pulse flex-1 space-y-3 py-1">
          <div className="grid grid-cols-4 gap-4">
            <div className="h-6 bg-gray-400 rounded"></div>
          </div>
          <div className="h-3 bg-gray-400 rounded"></div>
          <div className="space-y-3">
            <div className="h-2 bg-gray-400 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <>{elements}</>;
}

LoadingThreadItem.propTypes = {
  repeat: PropTypes.number.isRequired,
};

export default LoadingThreadItem;
