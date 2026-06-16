const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-ink-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-ink-50/60 px-4 py-3 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:bg-white focus:ring-4 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-ink-200 focus:border-ink-950 focus:ring-ink-950/10"
        }`}
      />

      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-sm text-red-500">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
