import React, { useState, useRef } from 'react';

const InputForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !photo) return;
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('photo', photo);
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Profile Photo</label>
        <div 
          className="drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {photoPreview ? (
            <img src={photoPreview} alt="Preview" className="preview-photo" />
          ) : (
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-purple)' }}>📸</div>
              <p>Drag & drop your photo here</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.7 }}>or click to browse</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFile(e.target.files[0])} 
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          className="form-input"
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name"
          required 
        />
      </div>

      <div className="form-group">
        <label>Role / Company (Optional)</label>
        <input 
          type="text" 
          value={role} 
          className="form-input"
          onChange={(e) => setRole(e.target.value)} 
          placeholder="e.g. Software Engineer at Google"
        />
      </div>

      <button 
        type="submit" 
        className="btn-primary" 
        disabled={!name || !photo}
      >
        Generate My Ticket
      </button>
    </form>
  );
};

export default InputForm;
