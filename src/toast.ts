import { ToastOptions } from './types';

// Global toast functions that will be set by the provider
let addToast: ((_toast: Omit<import('./types').Toast, 'id' | 'createdAt'>) => string) | null = null;
let removeToast: ((_id: string) => void) | null = null;
let updateToast: ((_id: string, _updates: Partial<import('./types').Toast>) => void) | null = null;
let clearToasts: (() => void) | null = null;

// Set the toast functions (called by ToastProvider)
export const setToastFunctions = (functions: {
  addToast: typeof addToast;
  removeToast: typeof removeToast;
  updateToast: typeof updateToast;
  clearToasts: typeof clearToasts;
}) => {
  addToast = functions.addToast;
  removeToast = functions.removeToast;
  updateToast = functions.updateToast;
  clearToasts = functions.clearToasts;
};

// Main toast function
export const toast = (message: string | React.ReactNode, options: ToastOptions = {}) => {
  if (!addToast) {
    console.warn('Toast functions not initialized. Make sure to wrap your app with ToastProvider.');
    return '';
  }

  return addToast({
    message,
    type: options.type || 'info',
    duration: options.duration ?? 4000,
    position: options.position || 'top-right',
    icon: options.icon,
    className: options.className,
    style: options.style,
    onClose: options.onClose,
    onOpen: options.onOpen,
  });
};

// Convenience methods
toast.success = (message: string | React.ReactNode, options: Omit<ToastOptions, 'type'> = {}) => {
  return toast(message, { ...options, type: 'success' });
};

toast.error = (message: string | React.ReactNode, options: Omit<ToastOptions, 'type'> = {}) => {
  return toast(message, { ...options, type: 'error' });
};

toast.warning = (message: string | React.ReactNode, options: Omit<ToastOptions, 'type'> = {}) => {
  return toast(message, { ...options, type: 'warning' });
};

toast.info = (message: string | React.ReactNode, options: Omit<ToastOptions, 'type'> = {}) => {
  return toast(message, { ...options, type: 'info' });
};

toast.loading = (message: string | React.ReactNode, options: Omit<ToastOptions, 'type'> = {}) => {
  return toast(message, { ...options, type: 'loading', duration: 0 }); // Loading toasts don't auto-dismiss
};

// Promise-based toast
toast.promise = <T>(
  promise: Promise<T>,
  messages: {
    loading: string | React.ReactNode;
    success: string | React.ReactNode | ((_data: T) => string | React.ReactNode);
    error: string | React.ReactNode | ((_error: any) => string | React.ReactNode);
  },
  options: Omit<ToastOptions, 'type' | 'duration'> = {}
) => {
  const loadingId = toast.loading(messages.loading, options);

  return promise
    .then((data) => {
      const successMessage = typeof messages.success === 'function'
        ? messages.success(data)
        : messages.success;

      if (updateToast) {
        updateToast(loadingId, {
          type: 'success',
          message: successMessage,
          duration: 4000,
        });
      }
      return data;
    })
    .catch((error) => {
      const errorMessage = typeof messages.error === 'function'
        ? messages.error(error)
        : messages.error;

      if (updateToast) {
        updateToast(loadingId, {
          type: 'error',
          message: errorMessage,
          duration: 4000,
        });
      }
      throw error;
    });
};

// Utility functions
toast.dismiss = (id: string) => {
  if (removeToast) {
    removeToast(id);
  }
};

toast.dismissAll = () => {
  if (clearToasts) {
    clearToasts();
  }
};

// Custom toast with full control
toast.custom = (message: string | React.ReactNode, options: ToastOptions = {}) => {
  return toast(message, options);
};

export default toast;
