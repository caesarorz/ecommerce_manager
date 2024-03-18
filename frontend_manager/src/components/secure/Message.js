import React from 'react';


export default function Message({variant, children}) {
    return (
        <div className={variant} role="alert">
            {children}
        </div>
    )

}