export type ToastType = 'success' | 'error' | 'loading' | 'info' | 'warning';

export type ToastTheme = 'light' | 'dark' | 'colorful' | 'minimal' | 'glass' | 'neon';

export type ToastSound = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'notification' | 'none';

export interface ToastAction {
  label: string;
  onClick: () => void;
  style?: 'primary' | 'secondary' | 'danger';
}

export interface ToastOptions {
  id?: string;
  duration?: number;
  position?: ToastPosition;
  type?: ToastType;
  theme?: ToastTheme;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onOpen?: () => void;
  sound?: ToastSound | boolean;
  dismissible?: boolean;
  swipeable?: boolean;
  showProgress?: boolean;
  actions?: ToastAction[];
  richContent?: boolean;
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
  theme?: ToastTheme;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  onOpen?: () => void;
  sound?: ToastSound | boolean;
  dismissible?: boolean;
  swipeable?: boolean;
  showProgress?: boolean;
  actions?: ToastAction[];
  richContent?: boolean;
  createdAt: number;
  progress?: number;
}

export interface ToastContextType {
  toasts: Toast[];
  addToast: (_toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  removeToast: (_id: string) => void;
  updateToast: (_id: string, _updates: Partial<Toast>) => void;
  clearToasts: () => void;
}

export interface ToasterProps {
  position?: ToastPosition;
  reverseOrder?: boolean;
  gutter?: number;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  toastOptions?: Partial<ToastOptions>;
  maxToasts?: number;
  theme?: ToastTheme;
  enableSounds?: boolean;
}
