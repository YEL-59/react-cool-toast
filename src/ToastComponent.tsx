import React, { useEffect, useState } from 'react';
import { Toast as ToastType } from './types';
import './Toast.css';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
  onUpdate: (_id: string, _updates: Partial<ToastType>) => void;
}

const getIcon = (type: ToastType['type']) => {
  switch (type) {
    case 'success':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case 'error':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case 'warning':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'loading':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

export const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.onOpen) {
      toast.onOpen();
    }
  }, [toast]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(toast.id);
      if (toast.onClose) {
        toast.onClose();
      }
    }, 300); // Match animation duration
  };

  const handleClick = () => {
    if (toast.type !== 'loading') {
      handleClose();
    }
  };

  const icon = toast.icon || getIcon(toast.type);

  return (
    <div
      className={`cool-toast ${toast.type} ${isVisible ? 'visible' : ''} ${isLeaving ? 'leaving' : ''} ${toast.className || ''}`}
      style={toast.style}
      onClick={handleClick}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="cool-toast-content">
        <div className="cool-toast-icon">
          {icon}
        </div>
        <div className="cool-toast-message">
          {toast.message}
        </div>
        {toast.type !== 'loading' && (
          <button
            className="cool-toast-close"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close notification"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
