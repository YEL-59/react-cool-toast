import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastProvider } from '../ToastContext';
import { Toaster } from '../Toaster';
import toast from '../toast';

// Mock console.warn to avoid test noise
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
});

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ToastProvider>
    {children}
    <Toaster />
  </ToastProvider>
);

describe('Toast', () => {
  beforeEach(() => {
    // Clear all toasts before each test
    toast.dismissAll();
  });

  it('should render success toast', () => {
    render(
      <TestWrapper>
        <button onClick={() => toast.success('Success message')}>Show Success</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Success'));
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should render error toast', () => {
    render(
      <TestWrapper>
        <button onClick={() => toast.error('Error message')}>Show Error</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Error'));
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should render warning toast', () => {
    render(
      <TestWrapper>
        <button onClick={() => toast.warning('Warning message')}>Show Warning</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Warning'));
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('should render info toast', () => {
    render(
      <TestWrapper>
        <button onClick={() => toast.info('Info message')}>Show Info</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Info'));
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('should render loading toast', () => {
    render(
      <TestWrapper>
        <button onClick={() => toast.loading('Loading message')}>Show Loading</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Loading'));
    expect(screen.getByText('Loading message')).toBeInTheDocument();
  });

  it('should dismiss toast when clicked', async () => {
    render(
      <TestWrapper>
        <button onClick={() => toast('Click to dismiss')}>Show Toast</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    const toastElement = screen.getByText('Click to dismiss');
    expect(toastElement).toBeInTheDocument();

    fireEvent.click(toastElement);
    
    await waitFor(() => {
      expect(toastElement).not.toBeInTheDocument();
    });
  });

  it('should dismiss all toasts', () => {
    render(
      <TestWrapper>
        <button onClick={() => {
          toast('Toast 1');
          toast('Toast 2');
          toast('Toast 3');
        }}>Show Multiple</button>
        <button onClick={() => toast.dismissAll()}>Dismiss All</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Multiple'));
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Toast 3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Dismiss All'));
    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Toast 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Toast 3')).not.toBeInTheDocument();
  });

  it('should handle promise toast', async () => {
    const promise = Promise.resolve('Success data');
    
    render(
      <TestWrapper>
        <button onClick={() => {
          toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => `Success: ${data}`,
            error: 'Error occurred',
          });
        }}>Show Promise</button>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Show Promise'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Success: Success data')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
