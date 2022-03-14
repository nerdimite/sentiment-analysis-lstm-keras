// Supporting UI Components
export const Container = (props) => {
  return (
    <div className="md:container md:w-3/5 space-y-4 mt-4 mb-10 mx-4">
      {props.children}
    </div>
  );
};

export const Paper = (props) => {
  return (
    <div className="p-6 text-left rounded-lg shadow-lg bg-white">
      {props.children}
    </div>
  );
};

export const Button = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-200 ${
        props.disabled && "cursor-not-allowed"
      }`}
      disabled={props.disabled}
    >
      {props.disabled && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {props.children}
    </button>
  );
};
