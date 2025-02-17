import React from 'react';

const Alert = ({ type, message }) => {
    const getAlertStyle = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-100 border border-green-400 text-green-700';
            case 'warning':
                return 'bg-yellow-100 border border-yellow-400 text-yellow-700';
            case 'error':
            default:
                return 'bg-red-100 border border-red-400 text-red-700';
        }
    };

    return (
        <div className={`p-4 mb-4 rounded ${getAlertStyle(type)}`}>
            {message}
        </div>
    );
};

export default Alert;