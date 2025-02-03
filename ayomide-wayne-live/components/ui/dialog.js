import { IoCloseSharp } from "react-icons/io5";

export function Dialog({ children, isOpen, onClose }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-[360px]  lg:h-[400px] rounded-lg shadow-lg lg:w-[700px] relative">
          {children}
          <button onClick={onClose} className="mt-4 text-black absolute right-10 top-4 "><IoCloseSharp size={20}/> </button>
        </div>
      </div>
    );
  }
  
  