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

      <button onClick={onReset} className="btn-secondary" style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.7, border: 'none', background: 'none' }}>
        ← Generate Another
      </button>
    </div>
  );
};

export default TicketPreview;
