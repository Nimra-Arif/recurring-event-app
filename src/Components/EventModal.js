import React from 'react';

const EventModal = ({ isOpen, newEvent, onFieldChange, onSubmit, onClose }) => {
    if (!isOpen) return null;

    const modalStyles = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '30px',
        border: '1px solid #ccc',
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        width: '300px',
    };

    const overlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    };

    const buttonStyles = {
        marginRight: '10px',
        padding: '8px 12px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
    };

    const cancelButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#6c757d',
    };

    const inputStyles = {
        width: '280px',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };
    const inputStyles2 = {
        width: '300px',
        height:"32px",
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };

    const labelStyles = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    };

    return (
        <>
            <div style={overlayStyles} onClick={onClose}></div>
            <div style={modalStyles}>
                <h3>Create New Event</h3>
                <label style={labelStyles}>
                    Title:
                    <input
                        style={inputStyles}
                        type="text"
                        name="title"
                        value={newEvent.title}
                        onChange={onFieldChange}
                    />
                </label>
                <label style={labelStyles}>
                    Recurrence:
                    <select
                        style={inputStyles2}
                        name="freq"
                        value={newEvent.freq}
                        onChange={onFieldChange}
                    >
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                    </select>
                </label>
                <button style={buttonStyles} onClick={onSubmit}>Submit</button>
                <button style={cancelButtonStyles} onClick={onClose}>Cancel</button>
            </div>
        </>
    );
};

export default EventModal;
