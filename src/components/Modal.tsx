import ReactDOM from 'react-dom';
import Button from './Button';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return <></>;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="absolute w-full max-w-lg px-4 py-2 bg-white rounded-lg shadow-lg">
        <span
          className="absolute top-0 right-0 m-3 text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          <Button>&times;</Button>
        </span>
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
