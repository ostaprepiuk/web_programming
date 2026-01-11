import React from 'react';

const ErrorText = ({ children }) => {
    return (
        <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
            {children}
        </div>
    );
};

export default ErrorText;