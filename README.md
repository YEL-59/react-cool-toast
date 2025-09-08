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
- 🌙 **Dark Mode**: Automatic dark mode support
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🎪 **Animations**: Smooth enter/exit animations

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
    <ToastProvider>
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

MIT © [Your Name](https://github.com/yourusername)

## Acknowledgments

- Inspired by [react-hot-toast](https://github.com/timolins/react-hot-toast)
- Icons from [Heroicons](https://heroicons.com/)
