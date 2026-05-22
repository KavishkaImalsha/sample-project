const InputField = ({ label, register, error, type = "text", name }) => (
  <div className="flex flex-col">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">
      {label}
    </label>
    <input
      {...register}
      type={type}
      name={name}
      className={`w-full px-4 py-2.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${error ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-400"}`}
    />
    {error && (
      <span className="text-xs text-red-500 mt-1 ml-1">{error.message}</span>
    )}
  </div>
);

export default InputField;
