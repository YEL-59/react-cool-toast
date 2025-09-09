import { ToastOptions } from './types';
import { playToastSound, shouldPlaySound } from './sounds';

// Global toast functions that will be set by the provider
let addToast: ((_toast: Omit<import('./types').Toast, 'id' | 'createdAt'>) => string) | null = null;
let removeToast: ((_id: string) => void) | null = null;
let updateToast: ((_id: string, _updates: Partial<import('./types').Toast>) => void) | null = null;
let clearToasts: (() => void) | null = null;
let enableSounds: boolean = true;

// Set the toast functions (called by ToastProvider)
export const setToastFunctions = (functions: {
  addToast: typeof addToast;
  removeToast: typeof removeToast;
  updateToast: typeof updateToast;
  clearToasts: typeof clearToasts;
  enableSounds?: boolean;
}) => {
  addToast = functions.addToast;
  removeToast = functions.removeToast;
  updateToast = functions.updateToast;
  clearToasts = functions.clearToasts;
  enableSounds = functions.enableSounds ?? true;
};

// Main toast function
export const toast = (message: string | React.ReactNode, options: ToastOptions = {}) => {
  if (!addToast) {
    console.warn('Toast functions not initialized. Make sure to wrap your app with ToastProvider.');
    return '';
  }

  // Play sound if enabled
  if (options.sound !== false && shouldPlaySound(enableSounds)) {
    const soundType = options.sound === true || options.sound === undefined
      ? options.type || 'info'
      : options.sound;
    playToastSound(soundType);
  }

  const id = addToast({
    message,
    type: options.type || 'info',
    duration: options.duration ?? 4000,
    position: options.position || 'top-right',
    theme: options.theme,
    icon: options.icon,
    className: options.className,
    style: options.style,
    onClose: options.onClose,
    onOpen: options.onOpen,
    sound: options.sound,
    dismissible: options.dismissible ?? true,
    swipeable: options.swipeable ?? true,
    showProgress: options.showProgress ?? false,
    actions: options.actions,
    richContent: options.richContent ?? false,
  });

  return id;
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

// Toast with action buttons
toast.action = (
  message: string | React.ReactNode,
  actions: Array<{ label: string; onClick: () => void; style?: 'primary' | 'secondary' | 'danger' }>,
  options: Omit<ToastOptions, 'actions'> = {}
) => {
  return toast(message, { ...options, actions });
};

// Rich content toast (HTML, images, etc.)
toast.rich = (message: string | React.ReactNode, options: Omit<ToastOptions, 'richContent'> = {}) => {
  return toast(message, { ...options, richContent: true });
};

// Silent toast (no sound)
toast.silent = (message: string | React.ReactNode, options: Omit<ToastOptions, 'sound'> = {}) => {
  return toast(message, { ...options, sound: false });
};

// Toast with progress bar
toast.progress = (message: string | React.ReactNode, options: Omit<ToastOptions, 'showProgress'> = {}) => {
  return toast(message, { ...options, showProgress: true });
};

// Themed toasts
toast.glass = (message: string | React.ReactNode, options: Omit<ToastOptions, 'theme'> = {}) => {
  return toast(message, { ...options, theme: 'glass' });
};

toast.neon = (message: string | React.ReactNode, options: Omit<ToastOptions, 'theme'> = {}) => {
  return toast(message, { ...options, theme: 'neon' });
};

toast.minimal = (message: string | React.ReactNode, options: Omit<ToastOptions, 'theme'> = {}) => {
  return toast(message, { ...options, theme: 'minimal' });
};

toast.colorful = (message: string | React.ReactNode, options: Omit<ToastOptions, 'theme'> = {}) => {
  return toast(message, { ...options, theme: 'colorful' });
};

export default toast;
