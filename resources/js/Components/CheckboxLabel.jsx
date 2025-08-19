import React from 'react';

export default function CheckboxLabel({ id, name, value, label, onChange, checked, readOnly, type = 'checkbox' }) {
    return (
        <label
            key={id}
            className={`inline-flex items-center mr-4 mb-2 p-2 border rounded-md transition duration-150 ease-in-out ${
                checked ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
            }`}
        >
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                readOnly={readOnly}
                className="form-checkbox h-4 w-4 text-black transition duration-150 ease-in-out rounded-full"
            />
            <span className="ml-2 text-sm font-medium">{label}</span>
        </label>
    );
}