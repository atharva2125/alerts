// src/PriceAlertForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PriceAlertForm = () => {
    const [cryptoId, setCryptoId] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [alertType, setAlertType] = useState('above');
    const [notificationMethod, setNotificationMethod] = useState('email');
    const [email, setEmail] = useState(''); // Collecting user email
    const [error, setError] = useState('');

    const fetchCurrentPrice = async (cryptoId) => {
        // This function should contain logic to fetch the current price of the cryptocurrency
        // Replace this mock response with actual API call logic
        return 100; // Mock current price, replace with actual price fetching logic
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (parseFloat(targetPrice) <= 0) {
            setError('Target price must be a positive number');
            return;
        }

        try {
            // Fetch the current price before setting the alert
            const currentPrice = await fetchCurrentPrice(cryptoId);

            if ((alertType === 'above' && currentPrice < targetPrice) || 
                (alertType === 'below' && currentPrice > targetPrice)) {
                setError(`Current price is ${currentPrice}, which does not meet your alert condition.`);
                return;
            }

            const alertData = {
                cryptoId,
                targetPrice: parseFloat(targetPrice),
                alertType,
                notificationMethod,
                email // Include the collected email in the alert data
            };

            await axios.post('http://localhost:5000/api/alerts', alertData);
            alert('Price alert set successfully!');
            setCryptoId('');
            setTargetPrice('');
            setAlertType('above');
            setNotificationMethod('email');
            setEmail(''); // Reset email field
            setError('');
        } catch (error) {
            console.error('Error setting price alert:', error.response ? error.response.data : error.message);
            setError('Failed to set price alert. Please try again.');
        }
    };

    return (
        <div className="alert-form-container">
            <form className="alert-form" onSubmit={handleSubmit}>
                <h2>Set Your Crypto Price Alerts</h2>
                <input
                    type="text"
                    placeholder="Cryptocurrency ID"
                    value={cryptoId}
                    onChange={(e) => setCryptoId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Target Price"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    required
                />
                <select value={alertType} onChange={(e) => setAlertType(e.target.value)}>
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                </select>
                <select value={notificationMethod} onChange={(e) => setNotificationMethod(e.target.value)}>
                    <option value="email">Email</option>
                    <option value="push">Push Notification</option>
                </select>
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Set Alert</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default PriceAlertForm;
