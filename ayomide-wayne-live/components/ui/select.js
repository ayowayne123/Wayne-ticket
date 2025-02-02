
export function Select({ children, onChange, className = "" }) {
    return (
      <select
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${className}`}
      >
        {children}
      </select>
    );
  }
  
  export function SelectItem({ value, children }) {
    return <option value={value}>{children}</option>;
  }
  