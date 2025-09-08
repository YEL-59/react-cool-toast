export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';

export interface ToastOptions {
  id?: string;
  duration?: number;
  position?: ToastPosition;
  type?: ToastType;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onOpen?: () => void;
}

export type ToastPosition = 
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  message: string | React.ReactNode;
  type: ToastType;
  duration: number;
  position: ToastPosition;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onOpen?: () => void;
  createdAt: number;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<Toast>) => void;
  clearToasts: () => void;
}

export interface ToasterProps {
  position?: ToastPosition;
  reverseOrder?: boolean;
  gutter?: number;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  toastOptions?: Partial<ToastOptions>;
}
