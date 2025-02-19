import React from 'react';

export default function CheckboxLabel({ id, name, value, label, onChange, checked, readOnly }) {
    return (
        <label
            key={id}
            className={`inline-flex items-center mr-4 mb-2 p-2 border rounded-md transition duration-150 ease-in-out ${
                checked ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:border-indigo-500'
            }`}
        >
            <input
                type="checkbox"
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                readOnly={readOnly}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out rounded-full"
            />
            <span className="ml-2 text-sm font-medium">{label}</span>
        </label>
    );
}