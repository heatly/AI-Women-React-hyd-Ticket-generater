import React, { useState } from 'react';
import './index.css';
import InputForm from './components/InputForm';
import TicketPreview from './components/TicketPreview';
import Loader from './components/Loader';
import { generateTicketCanvas } from './utils/ticketGenerator';

function App() {
  const [ticketUrl, setTicketUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateTicket = async (data) => {
    setLoading(true);
    try {
      const { name, role, photo } = data;
      const url = await generateTicketCanvas(name, role, photo);
      setTicketUrl(url);
    } catch (error) {
      console.error("GENERATION ERROR:", error);
      alert('Error generating ticket. Please try again with a different image.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTicketUrl(null);
  };

  return (
    <div className="app-container">
      {/* Top Logos */}
      <nav className="nav-logos">
        <a href="https://www.linkedin.com/company/juicer-technology/" target="_blank" rel="noreferrer">
          <img src="/Juicertechlogo.png" alt="JuicerTech Logo" className="brand-logo" />
        </a>
        <a href="https://www.linkedin.com/company/reacthyderabad/" target="_blank" rel="noreferrer">
          <img src="/Reacthyd-logo.png" alt="React Hyderabad" className="brand-logo" />
        </a>
      </nav>

      <header style={{ marginTop: '5rem' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>AI CONCLAVE</h1>
        <p style={{ color: '#ff4da6', fontWeight: 500, letterSpacing: '2px', textAlign: 'center', marginBottom: '2.5rem' }}>WOMEN'S EDITION</p>
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

      {/* Bottom Logos Section */}
      <div className="footer-logos">
        <a href="https://www.linkedin.com/company/juicer-technology/" target="_blank" rel="noreferrer">
          <img src="/Juicertechlogo.png" alt="JuicerTech" className="brand-logo" style={{ height: '35px' }} />
        </a>
        <a href="https://www.linkedin.com/company/reacthyderabad/" target="_blank" rel="noreferrer">
          <img src="/Reacthyd-logo.png" alt="React Hyderabad" className="brand-logo" style={{ height: '35px' }} />
        </a>
      </div>
    </div>
  );
}

export default App;
