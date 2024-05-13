import ReactDOM from 'react-dom';
import './../../styles/loader.css';

const Loader = ({ isLoading }) => {
  return ReactDOM.createPortal(
    isLoading ? (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="loader"></div>
      </div>
    ) : null,
    document.body
  );
};

export default Loader;
