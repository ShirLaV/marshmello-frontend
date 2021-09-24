import React from 'react'

export function ProgressBar({ completed }) {

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 10
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: '#6a1b9a',
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
    )
}
