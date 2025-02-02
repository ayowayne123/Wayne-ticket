export function Dialog({ children, isOpen, onClose }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          {children}
          <button onClick={onClose} className="mt-4 text-red-600">Close</button>
        </div>
      </div>
    );
  }
  
  