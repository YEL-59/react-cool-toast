import React from 'react';
import { ToastProvider, Toaster } from 'react-cool-toast';
import toast from 'react-cool-toast';
import './App.css';

const DemoApp: React.FC = () => {
  const handleSuccess = () => {
    toast.success('Operation completed successfully! 🎉');
  };

  const handleError = () => {
    toast.error('Something went wrong! Please try again.');
  };

  const handleWarning = () => {
    toast.warning('Please check your input before proceeding.');
  };

  const handleInfo = () => {
    toast.info('Here is some useful information for you.');
  };

  const handleLoading = () => {
    const id = toast.loading('Processing your request...');
    setTimeout(() => {
      toast.dismiss(id);
      toast.success('Processing complete!');
    }, 3000);
  };

  const handlePromise = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Data loaded successfully!') : reject(new Error('Failed to load data'));
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Loading data...',
      success: (data) => `Success: ${data}`,
      error: (error) => `Error: ${error.message}`,
    });
  };

  const handleCustom = () => {
    toast('🎨 Custom toast with emoji!', {
      type: 'info',
      icon: '🎉',
      duration: 5000,
      position: 'bottom-center',
    });
  };

  const handleMultiplePositions = () => {
    toast('Top Left', { position: 'top-left' });
    toast('Top Center', { position: 'top-center' });
    toast('Top Right', { position: 'top-right' });
    toast('Bottom Left', { position: 'bottom-left' });
    toast('Bottom Center', { position: 'bottom-center' });
    toast('Bottom Right', { position: 'bottom-right' });
  };

  const handleDismissAll = () => {
    toast.dismissAll();
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '5px',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '10px' }}>
        🍞 React Cool Toast Demo
      </h1>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '40px' }}>
        A beautiful, customizable toast notification library for React
      </p>

      <div style={sectionStyle}>
        <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Basic Toast Types</h2>
        <button
          style={{ ...buttonStyle, backgroundColor: '#48bb78', color: 'white' }}
          onClick={handleSuccess}
        >
          ✅ Success Toast
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#f56565', color: 'white' }}
          onClick={handleError}
        >
          ❌ Error Toast
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#ed8936', color: 'white' }}
          onClick={handleWarning}
        >
          ⚠️ Warning Toast
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#4299e1', color: 'white' }}
          onClick={handleInfo}
        >
          ℹ️ Info Toast
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Advanced Features</h2>
        <button
          style={{ ...buttonStyle, backgroundColor: '#9f7aea', color: 'white' }}
          onClick={handleLoading}
        >
          ⏳ Loading Toast
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#38b2ac', color: 'white' }}
          onClick={handlePromise}
        >
          🔄 Promise Toast
        </button>
        <button
          style={{ 
            ...buttonStyle, 
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
            color: 'white' 
          }}
          onClick={handleCustom}
        >
          🎨 Custom Toast
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#718096', color: 'white' }}
          onClick={handleDismissAll}
        >
          🗑️ Dismiss All
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Position Demo</h2>
        <button
          style={{ ...buttonStyle, backgroundColor: '#805ad5', color: 'white' }}
          onClick={handleMultiplePositions}
        >
          🎯 Show All Positions
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Installation</h2>
        <div style={{ 
          background: '#1a202c', 
          color: '#e2e8f0', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'Monaco, Menlo, monospace',
          fontSize: '14px'
        }}>
          <div style={{ marginBottom: '10px' }}>npm install react-cool-toast</div>
          <div style={{ marginBottom: '10px' }}>yarn add react-cool-toast</div>
          <div>pnpm add react-cool-toast</div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>🎨 Beautiful Design</h3>
            <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
              Clean, modern styling with smooth animations
            </p>
          </div>
          <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>🚀 Lightweight</h3>
            <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
              Zero dependencies, minimal bundle size
            </p>
          </div>
          <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>📱 Responsive</h3>
            <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
              Works on all devices and screen sizes
            </p>
          </div>
          <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>♿ Accessible</h3>
            <p style={{ margin: '0', color: '#718096', fontSize: '14px' }}>
              Screen reader and keyboard friendly
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a 
          href="https://github.com/YEL-59/react-cool-toast" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#2d3748',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'background 0.2s ease'
          }}
        >
          📦 View on GitHub
        </a>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <DemoApp />
      <Toaster />
    </ToastProvider>
  );
};

export default App;
