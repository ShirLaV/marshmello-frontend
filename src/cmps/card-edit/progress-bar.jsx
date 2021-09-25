import React from 'react'

export function ProgressBar({ bgColor, completed }) {

    const containerStyles = {
        height: 8,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: '10px 0 10px 10px'
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgColor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width .5s ease-in-out'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
    )
}
