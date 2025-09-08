import React from 'react';
import { useToast } from './ToastContext';
import { Toast } from './Toast';
import { ToasterProps } from './types';
import './Toaster.css';

export const Toaster: React.FC<ToasterProps> = ({
  position = 'top-right',
  reverseOrder = false,
  gutter = 8,
  containerClassName = '',
  containerStyle = {},
  toastOptions = {},
}) => {
  const { toasts, removeToast, updateToast } = useToast();

  const filteredToasts = toasts.filter(toast => toast.position === position);
  const sortedToasts = reverseOrder ? [...filteredToasts].reverse() : filteredToasts;

  return (
    <div
      className={`cool-toaster ${containerClassName}`}
      data-position={position}
      style={{
        '--gutter': `${gutter}px`,
        ...containerStyle,
      } as React.CSSProperties}
    >
      {sortedToasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={{ ...toast, ...toastOptions }}
          onRemove={removeToast}
          onUpdate={updateToast}
        />
      ))}
    </div>
  );
};
