import React from 'react';
import { ToastProvider, Toaster } from '../src';
import toast from '../src/toast';

const App: React.FC = () => {
  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('Something went wrong!');
  };

  const handleWarning = () => {
    toast.warning('Please check your input');
  };

  const handleInfo = () => {
    toast.info('Here is some information');
  };

  const handleLoading = () => {
    const id = toast.loading('Processing...');
    setTimeout(() => {
      toast.dismiss(id);
      toast.success('Processing complete!');
    }, 3000);
  };

  const handlePromise = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success!') : reject(new Error('Failed!'));
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'Loading...',
      success: (data) => `Success: ${data}`,
      error: (err) => `Error: ${err.message}`,
    });
  };

  const handleCustom = () => {
    toast('Custom toast with icon!', {
      type: 'info',
      icon: '🎉',
      duration: 5000,
      position: 'bottom-center',
    });
  };

  const handleDismissAll = () => {
    toast.dismissAll();
  };

  return (
    <ToastProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>React Cool Toast Example</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <button onClick={handleSuccess} style={buttonStyle}>
            Success Toast
          </button>
          <button onClick={handleError} style={buttonStyle}>
            Error Toast
          </button>
          <button onClick={handleWarning} style={buttonStyle}>
            Warning Toast
          </button>
          <button onClick={handleInfo} style={buttonStyle}>
            Info Toast
          </button>
          <button onClick={handleLoading} style={buttonStyle}>
            Loading Toast
          </button>
          <button onClick={handlePromise} style={buttonStyle}>
            Promise Toast
          </button>
          <button onClick={handleCustom} style={buttonStyle}>
            Custom Toast
          </button>
          <button onClick={handleDismissAll} style={buttonStyle}>
            Dismiss All
          </button>
        </div>
      </div>
      <Toaster />
    </ToastProvider>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};

export default App;
