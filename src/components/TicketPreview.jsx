import React, { useState } from 'react';

const TicketPreview = ({ ticketUrl, onReset }) => {
  const shareText = `Excited to attend the AI Conclave: Women’s Edition! 🚀 Looking forward to connecting with amazing people in tech! #AIConclave #WomenInTech #ReactHyderabad #JuicerTech`;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'AI_Conclave_Ticket.png';
    link.href = ticketUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(linkedInUrl, '_blank');
    alert("Share this ticket image and tag @React Hyderabad & @JuicerTech!");
  };

  const handleInstagramShare = () => {
    handleDownload();
    setTimeout(() => {
      alert("Ticket downloaded! 📸 Open Instagram and upload this to your story or post manually.");
    }, 500);
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="ticket-preview-container">
      <div className="ticket-image-wrapper">
        <img src={ticketUrl} alt="Your AI Conclave Ticket" className="ticket-img" />
      </div>

      <div className="action-buttons">
        <button onClick={handleDownload} className="btn-secondary" style={{ flex: '1 1 100%', marginBottom: '0.5rem' }}>
           Download Ticket
        </button>
        
        <button onClick={handleLinkedInShare} className="btn-primary" style={{ flex: 1, minWidth: '150px' }}>
          Post on LinkedIn
        </button>

        <button onClick={handleInstagramShare} className="btn-primary" style={{ flex: 1, minWidth: '150px', background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)' }}>
          For Instagram
        </button>

        <button onClick={handleTwitterShare} className="btn-primary" style={{ flex: 1, minWidth: '150px', background: '#000000', border: '1px solid rgba(255,255,255,0.2)' }}>
          Share on X
        </button>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', width: '100%', maxWidth: '500px', alignSelf: 'center' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.1rem', color: '#ff4da6' }}>How to win?</h3>
        <ul style={{ paddingLeft: '1.2rem', margin: 0, lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          <li><strong>Step 1:</strong> Download the ticket</li>
          <li><strong>Step 2:</strong> Post on socials and tag React Hyderabad</li>
          <li><strong>Step 3:</strong> Share with your network</li>
        </ul>
        <p style={{ marginTop: '1rem', marginBottom: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          The people with the most likes or comments get a chance to win exclusive React Hyderabad goodies.
        </p>
      </div>

      <button onClick={onReset} className="btn-secondary" style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.7, border: 'none', background: 'none' }}>
        ← Generate Another
      </button>
    </div>
  );
};

export default TicketPreview;
