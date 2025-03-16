import React, { useState } from 'react';

const ImageConverter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [format, setFormat] = useState('jpeg');
  const [quality, setQuality] = useState(0.8); 
  const [resize, setResize] = useState({ width: '', height: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setConvertedUrl(null);
    }
  };

  const convertImage = () => {
    const img = new Image();
    img.src = URL.createObjectURL(imageFile);
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
    };
  };

  return (
    <div className="container">
      <div className="converter-box">
        <h2>Image Format Converter</h2>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div>
          <label>Format:</label>
          <select onChange={(e) => setFormat(e.target.value)} value={format}>
            <option value="jpeg">JPG/JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>

        <div>
          <label>Resize (optional):</label>
          <input
            type="number"
            placeholder="Width (px)"
            value={resize.width}
            onChange={(e) => setResize({ ...resize, width: e.target.value })}
          />
          <input
            type="number"
            placeholder="Height (px)"
            value={resize.height}
            onChange={(e) => setResize({ ...resize, height: e.target.value })}
          />
        </div>

        {(format === 'jpeg' || format === 'webp') && (
          <div>
            <label>Quality: {Math.round(quality * 100)}%</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
            />
          </div>
        )}

        <button onClick={convertImage} disabled={!imageFile}>Convert</button>

        {convertedUrl && (
          <div>
            <h3>Converted Image:</h3>
            <img src={convertedUrl} alt="Converted" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }} />
            <br />
            <a href={convertedUrl} download={`converted.${format}`}>Download Converted Image</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageConverter;
