# React Cool Toast - Usage Guide

## Quick Start

### 1. Installation

```bash
npm install react-cool-toast
```

### 2. Basic Setup

```tsx
import React from 'react';
import { ToastProvider, Toaster } from 'react-cool-toast';
import toast from 'react-cool-toast';

function App() {
  return (
    <ToastProvider>
      <div>
        <h1>My App</h1>
        <button onClick={() => toast.success('Hello World!')}>
          Show Toast
        </button>
      </div>
      <Toaster />
    </ToastProvider>
  );
}
```

## Common Patterns

### Success Notifications

```tsx
const handleSave = async () => {
  try {
    await saveData();
    toast.success('Data saved successfully!');
  } catch (error) {
    toast.error('Failed to save data');
  }
};
```

### Loading States

```tsx
const handleSubmit = async () => {
  const id = toast.loading('Submitting...');
  
  try {
    await submitForm();
    toast.dismiss(id);
    toast.success('Form submitted!');
  } catch (error) {
    toast.dismiss(id);
    toast.error('Submission failed');
  }
};
```

### Promise-based Notifications

```tsx
const handleUpload = () => {
  toast.promise(
    uploadFile(file),
    {
      loading: 'Uploading file...',
      success: (response) => `File uploaded! ID: ${response.id}`,
      error: (error) => `Upload failed: ${error.message}`,
    }
  );
};
```

### Form Validation

```tsx
const handleFormSubmit = (data) => {
  if (!data.email) {
    toast.warning('Please enter your email');
    return;
  }
  
  if (!isValidEmail(data.email)) {
    toast.error('Please enter a valid email address');
    return;
  }
  
  toast.success('Form submitted successfully!');
};
```

### API Error Handling

```tsx
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    toast.success('Data loaded successfully');
    return data;
  } catch (error) {
    toast.error(`Failed to load data: ${error.message}`);
    throw error;
  }
};
```

### Custom Positioning

```tsx
// Different positions for different types of messages
const showNotification = (type, message) => {
  const positions = {
    success: 'top-right',
    error: 'top-center',
    warning: 'bottom-right',
    info: 'bottom-center',
  };
  
  toast[type](message, { position: positions[type] });
};
```

### Custom Styling

```tsx
// Custom toast with specific styling
toast('Custom message', {
  className: 'my-custom-toast',
  style: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
  },
  icon: '🎉',
  duration: 5000,
});
```

### Multiple Toasters

```tsx
function App() {
  return (
    <ToastProvider>
      <div>
        {/* Your app content */}
      </div>
      
      {/* Different toasters for different positions */}
      <Toaster position="top-right" />
      <Toaster position="bottom-left" />
    </ToastProvider>
  );
}

// Use specific positions
toast('Top notification', { position: 'top-right' });
toast('Bottom notification', { position: 'bottom-left' });
```

### Custom Icons

```tsx
import { CheckIcon, XIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

// Custom icons for different toast types
toast.success('Success!', { icon: <CheckIcon /> });
toast.error('Error!', { icon: <XIcon /> });
toast.warning('Warning!', { icon: <ExclamationTriangleIcon /> });
```

### Dismissing Toasts

```tsx
// Dismiss specific toast
const id = toast('This can be dismissed');
setTimeout(() => toast.dismiss(id), 2000);

// Dismiss all toasts
const showMultipleToasts = () => {
  toast('Toast 1');
  toast('Toast 2');
  toast('Toast 3');
  
  // Dismiss all after 3 seconds
  setTimeout(() => toast.dismissAll(), 3000);
};
```

### Callbacks

```tsx
toast('Message with callbacks', {
  onOpen: () => console.log('Toast opened'),
  onClose: () => console.log('Toast closed'),
  duration: 3000,
});
```

## Best Practices

1. **Use appropriate toast types**: Use `success` for positive actions, `error` for failures, `warning` for important notices, and `info` for general information.

2. **Keep messages concise**: Toast messages should be short and clear.

3. **Use loading toasts for async operations**: Show loading state during API calls or long-running operations.

4. **Position strategically**: Use different positions for different types of messages to avoid overwhelming users.

5. **Handle errors gracefully**: Always provide meaningful error messages to users.

6. **Test accessibility**: Ensure your toasts work with screen readers and keyboard navigation.

## Troubleshooting

### Toasts not showing
- Make sure you've wrapped your app with `ToastProvider`
- Ensure you've added the `<Toaster />` component
- Check that you're calling toast functions after the provider is mounted

### Styling issues
- Check if your CSS is being loaded properly
- Use browser dev tools to inspect toast elements
- Consider using custom CSS classes for specific styling needs

### TypeScript errors
- Make sure you have the latest version of the package
- Check that your TypeScript version is compatible
- Import types explicitly if needed: `import type { ToastOptions } from 'react-cool-toast'`
