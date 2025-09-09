import React, { useEffect, useState, useRef, useCallback } from 'react';
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

export const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove, onUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  
  const toastRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startXRef = useRef(0);
  const startTimeRef = useRef(0);

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

  // Progress bar animation
  useEffect(() => {
    if (toast.showProgress && toast.duration > 0) {
      const interval = 50; // Update every 50ms
      const decrement = (interval / toast.duration) * 100;
      
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - decrement;
          if (newProgress <= 0) {
            handleClose();
            return 0;
          }
          return newProgress;
        });
      }, interval);

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [toast.showProgress, toast.duration]);

  // Auto-dismiss timer
  useEffect(() => {
    if (toast.duration > 0 && !toast.showProgress) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.showProgress]);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setTimeout(() => {
      onRemove(toast.id);
      if (toast.onClose) {
        toast.onClose();
      }
    }, 300); // Match animation duration
  }, [toast.id, toast.onClose, onRemove]);

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!toast.swipeable) return;
    
    startXRef.current = e.touches[0].clientX;
    startTimeRef.current = Date.now();
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!toast.swipeable || !isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startXRef.current;
    setSwipeX(diffX);
  };

  const handleTouchEnd = () => {
    if (!toast.swipeable || !isSwiping) return;
    
    const swipeThreshold = 100;
    const timeThreshold = 300;
    const swipeTime = Date.now() - startTimeRef.current;
    
    if (Math.abs(swipeX) > swipeThreshold || (Math.abs(swipeX) > 50 && swipeTime < timeThreshold)) {
      handleClose();
    } else {
      setSwipeX(0);
    }
    
    setIsSwiping(false);
  };

  const handleClick = () => {
    if (toast.type !== 'loading' && toast.dismissible !== false) {
      handleClose();
    }
  };

  const handleActionClick = (action: any) => {
    action.onClick();
    handleClose();
  };

  const icon = toast.icon || getIcon(toast.type);

  // Build class names
  const classNames = [
    'cool-toast',
    toast.type,
    isVisible ? 'visible' : '',
    isLeaving ? 'leaving' : '',
    isSwiping ? 'swiping' : '',
    Math.abs(swipeX) > 50 ? 'swipe-threshold' : '',
    toast.theme ? `theme-${toast.theme}` : '',
    toast.richContent ? 'rich-content' : '',
    toast.className || ''
  ].filter(Boolean).join(' ');

  const toastStyle = {
    ...toast.style,
    transform: isSwiping ? `translateX(${swipeX}px)` : undefined,
  };

  return (
    <div
      ref={toastRef}
      className={classNames}
      style={toastStyle}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      aria-describedby={`toast-${toast.id}-message`}
    >
      <div className="cool-toast-content">
        <div className="cool-toast-icon">
          {icon}
        </div>
        <div 
          id={`toast-${toast.id}-message`}
          className="cool-toast-message"
          dangerouslySetInnerHTML={toast.richContent ? { __html: toast.message as string } : undefined}
        >
          {!toast.richContent && toast.message}
        </div>
        {toast.dismissible !== false && toast.type !== 'loading' && (
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
      
      {/* Action Buttons */}
      {toast.actions && toast.actions.length > 0 && (
        <div className="cool-toast-actions">
          {toast.actions.map((action, index) => (
            <button
              key={index}
              className={`cool-toast-action ${action.style || 'secondary'}`}
              onClick={(e) => {
                e.stopPropagation();
                handleActionClick(action);
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Progress Bar */}
      {toast.showProgress && toast.duration > 0 && (
        <div 
          className="cool-toast-progress" 
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      )}
    </div>
  );
};
