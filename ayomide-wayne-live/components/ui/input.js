export function Input({ name, placeholder, type = "text", onChange, className = "" }) {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 ${className}`}
      />
    );
  }