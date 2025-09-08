# React Cool Toast Demo

This directory contains demo pages to showcase the React Cool Toast library.

## Demo Pages

### 1. HTML Demo (`index.html`)
A standalone HTML demo that doesn't require React. It includes:
- Interactive buttons to test different toast types
- Visual examples of all features
- Code examples
- Feature showcase

### 2. React Demo (`react-demo.html`)
A React-based demo that shows how to use the actual package:
- Uses the real React Cool Toast components
- Demonstrates proper integration
- Shows TypeScript usage
- Interactive examples

## Running the Demo

### Option 1: Using npm script
```bash
npm run demo
```
Then open your browser to `http://localhost:3000`

### Option 2: Direct file access
Simply open `demo/index.html` or `demo/react-demo.html` in your browser.

### Option 3: Using a local server
```bash
# Using Python
python -m http.server 3000

# Using Node.js http-server
npx http-server demo -p 3000

# Using PHP
php -S localhost:3000 -t demo
```

## Demo Features

The demo showcases:

- ✅ **Success Toasts** - Green notifications for successful operations
- ❌ **Error Toasts** - Red notifications for errors
- ⚠️ **Warning Toasts** - Orange notifications for warnings
- ℹ️ **Info Toasts** - Blue notifications for information
- ⏳ **Loading Toasts** - Purple notifications for loading states
- 🔄 **Promise Toasts** - Automatic promise-based notifications
- 🎨 **Custom Toasts** - Customizable styling and content
- 🎯 **Position Demo** - All 6 positioning options
- 🗑️ **Dismiss Controls** - Manual dismissal options

## Interactive Elements

- Click any button to see the corresponding toast
- Click on toasts to dismiss them
- Use "Dismiss All" to clear all toasts
- Try the "Show All Positions" to see different placements

## Code Examples

The demo includes code examples showing:
- Basic usage
- Different toast types
- Promise-based notifications
- Custom styling options
- Position configuration

## Browser Compatibility

The demo works in all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Mobile Support

The demo is fully responsive and works on:
- Mobile phones
- Tablets
- Desktop computers
- Touch devices
