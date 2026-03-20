import React, { useState } from 'react';
import './index.css';
import InputForm from './components/InputForm';
import TicketPreview from './components/TicketPreview';
import Loader from './components/Loader';

function App() {
  const [ticketUrl, setTicketUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateTicket = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-ticket', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate ticket');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setTicketUrl(url);
    } catch (error) {
      console.error(error);
      alert('Error generating ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTicketUrl(null);
  };

  return (
    <div className="app-container">
      <header>
        <h1>AI Conclave</h1>
        <p>Women's Edition</p>
      </header>

      <main className="glass-card">
        {loading ? (
          <Loader />
        ) : ticketUrl ? (
          <TicketPreview ticketUrl={ticketUrl} onReset={handleReset} />
        ) : (
          <InputForm onSubmit={handleGenerateTicket} />
        )}
      </main>

      <div className="logo-footer">
        <a href="https://www.linkedin.com/company/juicer-technology/" target="_blank" rel="noreferrer">
          <img src="/Juicertechlogo.png" alt="JuicerTech Logo" />
        </a>
        <a href="https://www.linkedin.com/company/reacthyderabad/" target="_blank" rel="noreferrer">
          <img src="/Reacthyd-logo.png" alt="React Hyderabad" />
        </a>
      </div>
    </div>
  );
}

export default App;
