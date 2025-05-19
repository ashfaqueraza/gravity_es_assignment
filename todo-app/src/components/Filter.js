import React from "react";

const Filter = ({ current, onChange, count }) => {
  const filters = ["all", "completed", "pending"];
  return (
    <div className="flex justify-center gap-3">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
            current === f
              ? "bg-indigo-500 text-white"
              : "bg-white border-gray-300 text-gray-600 hover:bg-indigo-100"
          }`}>
          {f.charAt(0).toUpperCase() + f.slice(1)}{" "}
          {count ? (current === f ? "(" + count + ")" : "") : ""}
        </button>
      ))}
    </div>
  );
};

export default Filter;
