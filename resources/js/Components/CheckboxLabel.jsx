import React from 'react';

export default function CheckboxLabel({ id, name, value, label, onChange, checked, readOnly, type = 'checkbox' }) {
    return (
        <label
            key={id}
            className={`inline-flex items-center mr-4 mb-2 p-3 border-2 rounded-xl transition-all duration-200 cursor-pointer hover:scale-105 shadow-sm ${
                checked ? 'text-white border-white shadow-lg transform scale-105' : 'bg-white border-gray-300'
            }`}
            style={checked ? { backgroundColor: '#29C9F4' } : {}}
        >
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                readOnly={readOnly}
                className="form-checkbox h-4 w-4 transition duration-150 ease-in-out rounded"
                style={{ accentColor: '#29C9F4' }}
            />
            <span className="ml-2 text-sm font-bold">{label}</span>
        </label>
    );
}