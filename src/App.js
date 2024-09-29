import React from 'react';
import './App.css'; // Import your styles
import PriceAlertForm from './PriceAlertForm'; // Import the form component

function App() {
    return (
        <div className="App">
            <h1 style={{ color: '#f1c40f' }}>Set Your Crypto Price Alerts</h1>
            <PriceAlertForm />
        </div>
    );
}

export default App;
