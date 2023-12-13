"use client";
import React from "react";

const Checkbox = () => {
  return (
    <div className="flex items-center p-4">
      <input
        id="month-to-month"
        type="checkbox"
        className="form-checkbox h-4 w-4 text-slate-600 border-gray-300 rounded focus:ring-blue-500 checked:bg-slate-600"
      />
      <label
        htmlFor="month-to-month"
        className="ml-2 block text-sm text-gray-900"
      >
        Month-to-month
      </label>
    </div>
  );
};
export default Checkbox;
