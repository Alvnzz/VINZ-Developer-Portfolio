import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', visible: false });
  const timerRef = useRef(null);

  const showToast = useCallback((message) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, visible: true });
    timerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Element */}
      <div
        role="alert"
        className={`fixed top-24 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surfaceLight dark:bg-surfaceDark border border-cyberViolet text-gray-900 dark:text-white shadow-glow-md transition-all duration-300 pointer-events-none ${
          toast.visible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-96 opacity-0'
        }`}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono font-medium">{toast.message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
