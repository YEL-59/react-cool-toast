import React from 'react';
import { ToastProvider, Toaster } from '../src';
import toast from '../src/toast';

const ReactDemo: React.FC = () => {
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

  const handleMultipleToasts = () => {
    toast.success('First success toast!');
    toast.error('Second error toast!');
    toast.warning('Third warning toast!');
    toast.info('Fourth info toast!');
    toast.success('Fifth success toast!');
    toast.error('Sixth error toast!');
    toast.warning('Seventh warning toast!');
    toast.info('Eighth info toast!');
  };

  const handleThemeVariants = () => {
    toast.glass('Glass theme with blur effect! ✨');
    setTimeout(() => toast.neon('Neon cyberpunk theme! 🌈'), 500);
    setTimeout(() => toast.minimal('Minimal clean theme 🤍'), 1000);
    setTimeout(() => toast.colorful('Colorful gradient theme! 🎨'), 1500);
  };

  const handleSoundToasts = () => {
    toast.success('Success with sound! 🔊', { sound: 'success' });
    setTimeout(() => toast.error('Error with sound! 🔊', { sound: 'error' }), 500);
    setTimeout(() => toast.silent('Silent toast (no sound) 🤫'), 1000);
  };

  const handleProgressToasts = () => {
    toast.progress('Processing with progress bar...', { 
      duration: 5000,
      type: 'info'
    });
  };

  const handleActionToasts = () => {
    toast.action(
      'File uploaded successfully!',
      [
        { 
          label: 'View', 
          onClick: () => alert('Opening file...'),
          style: 'primary' 
        },
        { 
          label: 'Share', 
          onClick: () => alert('Sharing file...'),
          style: 'secondary' 
        }
      ],
      { type: 'success' }
    );

    setTimeout(() => {
      toast.action(
        'Are you sure you want to delete this item?',
        [
          { 
            label: 'Delete', 
            onClick: () => alert('Item deleted!'),
            style: 'danger' 
          },
          { 
            label: 'Cancel', 
            onClick: () => console.log('Cancelled'),
            style: 'secondary' 
          }
        ],
        { type: 'warning' }
      );
    }, 1000);
  };

  const handleRichContent = () => {
    toast.rich(`
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; height: 40px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">JD</div>
        <div>
          <h4 style="margin: 0; font-size: 14px;">New Message</h4>
          <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.8;">You have a message from <strong>John Doe</strong></p>
        </div>
      </div>
    `, { type: 'info', duration: 6000 });
  };

  const handleAdvancedControls = () => {
    toast('Non-dismissible toast', { 
      dismissible: false,
      duration: 3000,
      type: 'warning'
    });

    setTimeout(() => {
      toast('Persistent toast (stays until dismissed)', { 
        duration: 0,
        type: 'info'
      });
    }, 1000);
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
        <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>🆕 New Features</h2>
        <button
          style={{ 
            ...buttonStyle, 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#333'
          }}
          onClick={handleThemeVariants}
        >
          🎨 Theme Variants
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#667eea', color: 'white' }}
          onClick={handleSoundToasts}
        >
          🔊 Sound Notifications
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#764ba2', color: 'white' }}
          onClick={handleProgressToasts}
        >
          📊 Progress Bar
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#f093fb', color: 'white' }}
          onClick={handleActionToasts}
        >
          🎬 Action Buttons
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#4facfe', color: 'white' }}
          onClick={handleRichContent}
        >
          🌐 Rich Content
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#43e97b', color: 'white' }}
          onClick={handleAdvancedControls}
        >
          🎛️ Advanced Controls
        </button>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ color: '#4a5568', marginBottom: '20px' }}>Multiple Toasts Demo</h2>
        <button
          style={{ ...buttonStyle, backgroundColor: '#805ad5', color: 'white' }}
          onClick={handleMultiplePositions}
        >
          🎯 Show All Positions
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#e53e3e', color: 'white' }}
          onClick={handleMultipleToasts}
        >
          🎪 Show Multiple Toasts
        </button>
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
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider
      maxToasts={5}
      enableSounds={true}
      defaultTheme="light"
      defaultPosition="top-right"
    >
      <ReactDemo />
      <Toaster />
    </ToastProvider>
  );
};

export default App;
