import React, { useState, useRef } from 'react';

// Custom icon components
const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconCheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const ImageConverter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [format, setFormat] = useState('jpeg');
  const [quality, setQuality] = useState(0.8);
  const [resize, setResize] = useState({ width: '', height: '' });
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [isConverting, setIsConverting] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setConvertedUrl(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
        
        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({
            width: img.width,
            height: img.height
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const updateDimension = (dimension, value) => {
    if (preserveAspectRatio && originalDimensions.width > 0) {
      if (dimension === 'width' && value) {
        const newWidth = parseInt(value);
        const newHeight = Math.round(newWidth * (originalDimensions.height / originalDimensions.width));
        setResize({ width: newWidth, height: newHeight });
      } else if (dimension === 'height' && value) {
        const newHeight = parseInt(value);
        const newWidth = Math.round(newHeight * (originalDimensions.width / originalDimensions.height));
        setResize({ width: newWidth, height: newHeight });
      } else {
        setResize({ ...resize, [dimension]: value });
      }
    } else {
      setResize({ ...resize, [dimension]: value });
    }
  };

  const convertImage = () => {
    if (!imageFile) return;
    
    setIsConverting(true);
    
    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const targetWidth = resize.width ? parseInt(resize.width) : img.width;
      const targetHeight = resize.height ? parseInt(resize.height) : img.height;

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const mimeType = format === 'png' ? 'image/png' :
                       format === 'webp' ? 'image/webp' :
                       'image/jpeg';

      const outputQuality = format === 'png' ? 1 : quality;
      const dataUrl = canvas.toDataURL(mimeType, outputQuality);
      setConvertedUrl(dataUrl);
      setIsConverting(false);
    };
  };

  const resetForm = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setResize({ width: '', height: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container">
      <div className="converter-wrapper">
        <h1 className="main-title">Image Format Converter</h1>
        <p className="subtitle">Convert images between formats with precision and control</p>
        
        <div className="panels-container">
          {/* Source Panel */}
          <div className="panel source-panel">
            <h2 className="panel-title">
              <span className="icon"><IconUpload /></span> Source Image
            </h2>
            
            {!previewUrl ? (
              <div 
                className="upload-area"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="image-icon">
                  <ImageIcon />
                </div>
                <p className="upload-text">Drag & drop an image here or click to browse hihi</p>
                <p className="upload-hint">Supports JPG, PNG, WebP, and other common formats</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden-input" 
                />
              </div>
            ) : (
              <div className="preview-container">
                <div className="image-preview-wrapper">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="preview-image"
                  />
                  <button 
                    className="reset-button"
                    onClick={resetForm}
                  >
                    <IconX />
                  </button>
                  <div className="image-info">
                    <p>Original: {originalDimensions.width} × {originalDimensions.height}px</p>
                    <p className="file-details">
                      {(imageFile?.size / 1024).toFixed(1)} KB • {imageFile?.type.split('/')[1].toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Output Panel */}
          <div className="panel output-panel">
            <h2 className="panel-title">
              <span className="icon"><IconDownload /></span> Output Settings
            </h2>
            
            <div className="settings-container">
              {/* Format Selection */}
              <div className="setting-group">
                <label className="setting-label">Output Format</label>
                <div className="format-buttons">
                  {['jpeg', 'png', 'webp'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`format-button ${format === fmt ? 'selected' : ''}`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Advanced Options Toggle */}
              <button 
                className="advanced-toggle"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              >
                <IconSettings /> {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
              </button>
              
              {/* Advanced Options Panel */}
              {showAdvancedOptions && (
                <div className="advanced-panel">
                  {/* Resize Options */}
                  <div className="setting-group">
                    <div className="setting-header">
                      <label className="setting-label">Resize Image</label>
                      <label className="aspect-ratio-toggle">
                        <input 
                          type="checkbox" 
                          checked={preserveAspectRatio}
                          onChange={() => setPreserveAspectRatio(!preserveAspectRatio)}
                        />
                        Preserve aspect ratio
                      </label>
                    </div>
                    <div className="dimension-inputs">
                      <div>
                        <input
                          type="number"
                          placeholder="Width (px)"
                          value={resize.width}
                          onChange={(e) => updateDimension('width', e.target.value)}
                          className="dimension-input"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Height (px)"
                          value={resize.height}
                          onChange={(e) => updateDimension('height', e.target.value)}
                          className="dimension-input"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Quality Slider (for JPEG/WebP) */}
                  {(format === 'jpeg' || format === 'webp') && (
                    <div className="setting-group">
                      <label className="quality-label">
                        <span>Quality</span>
                        <span>{Math.round(quality * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="quality-slider"
                      />
                      <div className="slider-hints">
                        <span>Smaller file</span>
                        <span>Better quality</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Convert Button */}
              <button 
                onClick={convertImage} 
                disabled={!imageFile || isConverting}
                className={`convert-button ${!imageFile || isConverting ? 'disabled' : ''}`}
              >
                {isConverting ? 'Converting...' : 'Convert Image'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Converted Image Result */}
        {convertedUrl && (
          <div className="panel result-panel">
            <div className="result-header">
              <h2 className="panel-title">
                <span className="success-icon"><IconCheckCircle /></span> Converted Result
              </h2>
              <a 
                href={convertedUrl} 
                download={`converted.${format}`}
                className="download-button"
              >
                <IconDownload /> Download Image
              </a>
            </div>
            
            <div className="result-preview">
              <img 
                src={convertedUrl} 
                alt="Converted" 
                className="result-image" 
              />
              <div className="result-info">
                <p>Dimensions: {resize.width || originalDimensions.width} × {resize.height || originalDimensions.height}px</p>
                <p className="format-info">Format: {format.toUpperCase()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageConverter;