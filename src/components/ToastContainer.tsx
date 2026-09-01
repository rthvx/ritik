import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((t) => {
          let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
          let bgClass = 'border-emerald-200 bg-white';
          
          if (t.type === 'info') {
            icon = <Info className="w-5 h-5 text-sky-500 shrink-0" />;
            bgClass = 'border-sky-200 bg-white';
          } else if (t.type === 'warning') {
            icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
            bgClass = 'border-amber-200 bg-white';
          } else if (t.type === 'error') {
            icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
            bgClass = 'border-rose-200 bg-white';
          }

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto rounded-2xl p-4 shadow-xl border ${bgClass} flex items-start gap-3 relative`}
            >
              {icon}
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-xs font-extrabold text-neutral-950 leading-tight">
                  {t.title}
                </h4>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed font-medium">
                  {t.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-neutral-400 hover:text-neutral-900 p-1 -mr-1 -mt-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
