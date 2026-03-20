import React, { useState } from 'react';

const TicketPreview = ({ ticketUrl, onReset }) => {
  const [autoPost, setAutoPost] = useState(false);

  const shareText = `Excited to share that I’ll be attending the AI Conclave: Women’s Edition 🚀

Looking forward to connecting, learning, and growing with amazing people in tech!

#ReactHyderabad #JuicerTech #WomenInTech #AIConclave`;

  const handleLinkedInShare = async () => {
    if (autoPost) {
      alert("LinkedIn Auto Post requires local Selenium setup. This is a placeholder endpoint trigger.");
      try {
        await fetch('http://localhost:5000/api/auto-post', { method: 'POST' });
      } catch (e) {
        console.error(e);
      }
      return;
    }

    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText)}`;
    window.open(linkedInUrl, '_blank');
    
    setTimeout(() => {
      alert("Upload your generated ticket and tag React Hyderabad & JuicerTech");
    }, 500);
  };

  const handleInstagramShare = () => {
    alert("Open Instagram and upload this ticket as a post/story");
  };

  const handleTwitterShare = () => {
    const twitterText = `Excited to attend AI Conclave Women's Edition 🚀\n#AIConclave #WomenInTech #ReactHyderabad #JuicerTech`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="ticket-preview-container">
      <div className="ticket-image-wrapper">
        <img src={ticketUrl} alt="Your AI Conclave Ticket" className="ticket-img" />
      </div>

      <div className="action-buttons">
        <a 
          href={ticketUrl} 
          download="AI_Conclave_Ticket.png" 
          className="btn-secondary"
        >
          Download Ticket
        </a>
        <button 
          onClick={handleLinkedInShare} 
          className="btn-primary"
          style={{ marginTop: 0, width: 'auto', flex: 1, minWidth: '150px' }}
        >
          Post on LinkedIn
        </button>
        <button 
          onClick={handleInstagramShare} 
          className="btn-primary"
          style={{ marginTop: 0, width: 'auto', flex: 1, minWidth: '150px', background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)' }}
        >
          Download for Instagram
        </button>
        <button 
          onClick={handleTwitterShare} 
          className="btn-primary"
          style={{ marginTop: 0, width: 'auto', flex: 1, minWidth: '150px', background: 'linear-gradient(135deg, #1da1f2, #1a91da)' }}
        >
          Share on X
        </button>
      </div>

      <button 
        onClick={onReset}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--text-secondary)', 
          textDecoration: 'underline', 
          cursor: 'pointer',
          marginTop: '1.5rem',
          fontSize: '0.9rem'
        }}
      >
        Generate another ticket
      </button>
    </div>
  );
};

export default TicketPreview;
