import React from 'react';

const Loader = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '50px',
            minHeight: '200px'
        }}>
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;