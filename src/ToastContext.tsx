import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Toast, ToastContextType, ToastPosition, ToastTheme } from './types';
import { setToastFunctions } from './toast';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  defaultPosition?: ToastPosition;
  maxToasts?: number;
  enableSounds?: boolean;
  defaultTheme?: ToastTheme;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  defaultPosition = 'top-right',
  maxToasts = 5,
  enableSounds = true,
  defaultTheme
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id' | 'createdAt'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      createdAt: Date.now(),
      position: toast.position || defaultPosition,
      theme: toast.theme || defaultTheme,
      dismissible: toast.dismissible ?? true,
      swipeable: toast.swipeable ?? true,
      showProgress: toast.showProgress ?? false,
      richContent: toast.richContent ?? false,
    };

    setToasts(prev => {
      // Limit number of toasts
      const filtered = prev.filter(t => t.position === newToast.position);
      if (filtered.length >= maxToasts) {
        // Remove oldest toast
        const oldestId = filtered[0].id;
        setTimeout(() => removeToast(oldestId), 100);
      }
      return [...prev, newToast];
    });

    // Don't auto-remove if duration is 0 or if showProgress is true (handled by component)
    if (newToast.duration > 0 && !newToast.showProgress) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, [defaultPosition, defaultTheme, maxToasts, removeToast]);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    updateToast,
    clearToasts,
  };

  // Set global toast functions
  useEffect(() => {
    setToastFunctions({
      addToast,
      removeToast,
      updateToast,
      clearToasts,
      enableSounds,
    });
  }, [addToast, removeToast, updateToast, clearToasts, enableSounds]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
