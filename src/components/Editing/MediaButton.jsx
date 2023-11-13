
function MediaButton({ Icon, onClick, title }) {
    return (
      <button
        title={title}
        onClick={onClick}
        className="flex border-black justify-center items-center rounded-full w-12 h-12 bg-grey2 shadow-md shadow-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        {Icon}
      </button>
    );
  }

export default MediaButton;