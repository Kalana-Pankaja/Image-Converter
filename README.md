# IMAGE-CONVERTER

A modern React application that allows users to convert images between different formats (JPEG, PNG, WebP) with additional options for resizing and quality adjustment.

## Features

- **Simple Upload Interface**: Drag & drop or click to select images
- **Multiple Format Conversion**: Support for JPEG, PNG, and WebP formats
- **Advanced Settings**:
  - Resize images with custom dimensions
  - Preserve aspect ratio option
  - Quality adjustment for JPEG and WebP
- **Client-side Processing**: All image processing happens in your browser - no server uploads

## Project Structure

```
IMAGE-CONVERTER/
├── build/               # Production build files
├── node_modules/        # Dependencies
├── public/              # Static files
├── src/                 # Source code
│   ├── App.css          # Main application styles
│   ├── App.js           # Main application component
│   ├── App.test.js      # Tests for App component
│   ├── ImageConverter.js # Image conversion logic
│   ├── index.css        # Global styles
│   ├── index.js         # Application entry point
│   ├── logo.svg         # Logo file
│   ├── reportWebVitals.js # Performance measurement
│   └── setupTests.js    # Test configuration
├── .gitignore           # Git ignore file
├── package-lock.json    # Dependency lock file
├── package.json         # Project configuration
└── README.md            # This file
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/IMAGE-CONVERTER.git
   cd IMAGE-CONVERTER
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Deployment to GitHub Pages

1. Install the GitHub Pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add homepage to package.json:
   ```json
   "homepage": "https://yourusername.github.io/IMAGE-CONVERTER"
   ```

3. Add deployment scripts to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     ...
   }
   ```

4. Deploy the application:
   ```bash
   npm run deploy
   ```

5. Access your deployed application at https://yourusername.github.io/IMAGE-CONVERTER

## How It Works

The application uses the HTML5 Canvas API to perform image conversions directly in the browser:

1. An image is loaded into memory when selected by the user
2. The image is drawn onto a canvas with the specified dimensions
3. The canvas content is exported in the chosen format with selected quality settings
4. The converted image is presented for preview and download

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App configuration
- `npm run deploy` - Deploys the app to GitHub Pages

## Technologies Used

- React.js
- HTML5 Canvas API
- CSS3
- File API

## License

MIT

## Acknowledgments

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)