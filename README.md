# React Cool Toast 🍞

A lightweight, customizable toast notification library for React applications. Built with TypeScript and inspired by react-hot-toast.

## Features

- 🎨 **Beautiful & Customizable**: Clean design with customizable styles and themes
- 🚀 **Lightweight**: Minimal bundle size with zero dependencies
- 📱 **Responsive**: Works perfectly on mobile and desktop
- ♿ **Accessible**: Built with accessibility in mind (ARIA attributes, keyboard navigation)
- 🎭 **Multiple Types**: Success, error, warning, info, and loading toasts
- ⚡ **Promise Support**: Built-in promise-based notifications
- 🎯 **Flexible Positioning**: 6 different positions to choose from
- 🌙 **Theme Variants**: 6 built-in themes (light, dark, glass, neon, minimal, colorful)
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🎪 **Animations**: Smooth enter/exit animations
- 🔊 **Sound Notifications**: Optional sound feedback for different toast types
- 📊 **Progress Bar**: Visual progress indicator for toast duration
- 👆 **Swipe to Dismiss**: Touch-friendly swipe gestures on mobile
- 🎬 **Action Buttons**: Add custom action buttons (Retry, Undo, etc.)
- 🎯 **Toast Queue**: Smart queue system with max toast limits
- 🌐 **Rich Content**: Support for HTML content, images, and links
- 🎛️ **Advanced Controls**: Dismissible, auto-dismiss, and loading states

## Installation

```bash
npm install react-cool-toast
# or
yarn add react-cool-toast
# or
pnpm add react-cool-toast
```

## Quick Start

1. **Wrap your app with ToastProvider:**

```tsx
import React from 'react';
import { ToastProvider } from 'react-cool-toast';

function App() {
  return (
    <ToastProvider
      maxToasts={5}
      enableSounds={true}
      defaultTheme="light"
      defaultPosition="top-right"
    >
      {/* Your app components */}
    </ToastProvider>
  );
}
```

2. **Add the Toaster component:**

```tsx
import { Toaster } from 'react-cool-toast';

function App() {
  return (
    <ToastProvider>
      {/* Your app components */}
      <Toaster />
    </ToastProvider>
  );
}
```

3. **Use toast notifications:**

```tsx
import toast from 'react-cool-toast';

function MyComponent() {
  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('Something went wrong!');
  };

  const handlePromise = async () => {
    toast.promise(
      fetch('/api/data'),
      {
        loading: 'Loading...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data',
      }
    );
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success Toast</button>
      <button onClick={handleError}>Error Toast</button>
      <button onClick={handlePromise}>Promise Toast</button>
    </div>
  );
}
```

## API Reference

### Toast Methods

#### `toast(message, options?)`
Display a basic toast notification.

```tsx
toast('Hello World!');
toast('Custom message', { type: 'success', duration: 5000 });
```

#### `toast.success(message, options?)`
Display a success toast.

```tsx
toast.success('Operation completed!');
```

#### `toast.error(message, options?)`
Display an error toast.

```tsx
toast.error('Something went wrong!');
```

#### `toast.warning(message, options?)`
Display a warning toast.

```tsx
toast.warning('Please check your input');
```

#### `toast.info(message, options?)`
Display an info toast.

```tsx
toast.info('Here is some information');
```

#### `toast.loading(message, options?)`
Display a loading toast (doesn't auto-dismiss).

```tsx
const id = toast.loading('Processing...');
// Later: toast.dismiss(id);
```

#### `toast.promise(promise, messages, options?)`
Display a toast that updates based on promise state.

```tsx
toast.promise(
  fetch('/api/data'),
  {
    loading: 'Loading...',
    success: (data) => `Loaded ${data.length} items`,
    error: (err) => `Error: ${err.message}`,
  }
);
```

#### `toast.dismiss(id)`
Dismiss a specific toast.

```tsx
const id = toast('This will be dismissed');
toast.dismiss(id);
```

#### `toast.dismissAll()`
Dismiss all toasts.

```tsx
toast.dismissAll();
```

### Toast Options

```tsx
interface ToastOptions {
  id?: string;                    // Custom ID for the toast
  duration?: number;              // Auto-dismiss duration (0 = no auto-dismiss)
  position?: ToastPosition;       // Position of the toast
  type?: ToastType;              // Type of toast
  icon?: React.ReactNode;        // Custom icon
  className?: string;            // Custom CSS class
  style?: React.CSSProperties;   // Custom styles
  onClose?: () => void;          // Callback when toast closes
  onOpen?: () => void;           // Callback when toast opens
}
```

### Toast Types

```tsx
type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';
```

### Toast Positions

```tsx
type ToastPosition = 
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
```

### Toaster Props

```tsx
interface ToasterProps {
  position?: ToastPosition;           // Default position for toasts
  reverseOrder?: boolean;             // Reverse the order of toasts
  gutter?: number;                    // Gap between toasts
  containerClassName?: string;        // Custom CSS class for container
  containerStyle?: React.CSSProperties; // Custom styles for container
  toastOptions?: Partial<ToastOptions>; // Default options for toasts
}
```

## Advanced Usage

### Custom Styling

```tsx
// Custom toast with styles
toast('Custom styled toast', {
  className: 'my-custom-toast',
  style: { backgroundColor: '#ff6b6b', color: 'white' },
  icon: <CustomIcon />,
});

// Custom toaster container
<Toaster
  position="top-center"
  containerClassName="my-toaster"
  containerStyle={{ top: '20px' }}
  toastOptions={{
    duration: 3000,
    className: 'my-default-toast',
  }}
/>
```

### Multiple Toasters

```tsx
function App() {
  return (
    <ToastProvider>
      <Toaster position="top-right" />
      <Toaster position="bottom-left" />
      {/* Your app */}
    </ToastProvider>
  );
}

// Use specific positions
toast('Top right toast', { position: 'top-right' });
toast('Bottom left toast', { position: 'bottom-left' });
```

### Custom Icons

```tsx
import { CheckIcon, XIcon } from '@heroicons/react/24/outline';

toast.success('Success!', { icon: <CheckIcon /> });
toast.error('Error!', { icon: <XIcon /> });
```

### Promise with Custom Messages

```tsx
const uploadFile = async (file: File) => {
  return toast.promise(
    uploadToServer(file),
    {
      loading: `Uploading ${file.name}...`,
      success: (response) => `File uploaded successfully! ID: ${response.id}`,
      error: (error) => `Upload failed: ${error.message}`,
    },
    {
      position: 'bottom-center',
      duration: 5000,
    }
  );
};
```

## 🆕 New Features

### Theme Variants

Choose from 6 beautiful built-in themes:

```tsx
// Glass theme with blur effect
toast.glass('Glassmorphism toast!');

// Neon cyberpunk theme
toast.neon('Welcome to the future!');

// Minimal clean theme
toast.minimal('Less is more');

// Colorful gradient theme
toast.colorful('Rainbow vibes!');

// Or set theme directly
toast.success('Success!', { theme: 'dark' });
```

### Sound Notifications

Add audio feedback to your toasts:

```tsx
// Enable sounds globally in ToastProvider
<ToastProvider enableSounds={true}>

// Individual toast sounds
toast.success('Success!', { sound: 'success' });
toast.error('Error!', { sound: 'error' });

// Silent toast
toast.silent('No sound for this one');

// Custom sound types: 'success', 'error', 'warning', 'info', 'notification'
toast('Custom!', { sound: 'notification' });
```

### Progress Bar

Visual progress indicator for toast duration:

```tsx
// Show progress bar
toast.progress('Processing...', { duration: 5000 });

// Or enable via options
toast.success('Done!', { 
  showProgress: true,
  duration: 3000 
});
```

### Action Buttons

Add interactive buttons to your toasts:

```tsx
// Single action
toast.action(
  'File uploaded successfully!',
  [
    { 
      label: 'View', 
      onClick: () => openFile(),
      style: 'primary' 
    }
  ]
);

// Multiple actions
toast.action(
  'Are you sure you want to delete this item?',
  [
    { 
      label: 'Delete', 
      onClick: () => deleteItem(),
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

// Direct options usage
toast('Action toast', {
  actions: [
    { label: 'Retry', onClick: retryFunction, style: 'primary' },
    { label: 'Cancel', onClick: cancelFunction, style: 'secondary' }
  ]
});
```

### Rich Content

Support for HTML content, images, and links:

```tsx
// Rich HTML content
toast.rich(`
  <div>
    <h4>New Message</h4>
    <p>You have received a message from <strong>John Doe</strong></p>
    <img src="/avatar.jpg" alt="Avatar" style="width: 40px; border-radius: 50%;" />
  </div>
`);

// With links
toast.rich(`
  <div>
    Check out our <a href="https://example.com" target="_blank">new features</a>!
  </div>
`);
```

### Swipe to Dismiss

Touch-friendly swipe gestures (enabled by default on mobile):

```tsx
// Disable swipe for specific toast
toast('Cannot swipe this', { swipeable: false });

// Swipe is enabled by default
toast('Swipe me away on mobile!');
```

### Advanced Controls

```tsx
// Non-dismissible toast
toast('Important notice', { 
  dismissible: false,
  duration: 0 // Won't auto-dismiss
});

// Custom duration
toast('Quick message', { duration: 1000 });

// Persistent toast (manual dismiss only)
toast('Stays until dismissed', { duration: 0 });
```

### Toast Queue Management

Automatically manages toast overflow:

```tsx
<ToastProvider maxToasts={3}>
  {/* Only 3 toasts per position will be shown */}
</ToastProvider>

// Older toasts are automatically removed when limit is reached
for (let i = 0; i < 10; i++) {
  toast(`Toast ${i + 1}`);
}
```

### Enhanced ToastProvider Options

```tsx
<ToastProvider
  maxToasts={5}                    // Max toasts per position
  enableSounds={true}              // Enable sound notifications
  defaultTheme="glass"             // Default theme for all toasts
  defaultPosition="top-center"     // Default position
>
  <App />
</ToastProvider>
```

## Styling

The library comes with beautiful default styles, but you can customize them:

### CSS Custom Properties

```css
:root {
  --toast-bg: white;
  --toast-border: #e5e7eb;
  --toast-text: #374151;
  --toast-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Custom CSS Classes

```css
.my-custom-toast {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border: none;
  color: white;
}

.my-custom-toast .cool-toast-icon {
  color: white;
}
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [YEL-59](https://github.com/YEL-59)

## Acknowledgments

- Inspired by [react-hot-toast](https://github.com/timolins/react-hot-toast)
- Icons from [Heroicons](https://heroicons.com/)
