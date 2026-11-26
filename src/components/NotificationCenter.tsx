import React from 'react';
import { Bell, CheckCircle2, Clock, X, AlertTriangle, FileText } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'payment':
        return <FileText className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-slate-600" />;
    }
  };

  return (
    <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/75">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-sm">Notifications & Reminders</h3>
        </div>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-700 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No new notifications or upcoming payment reminders.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onMarkAsRead(item.id)}
              className={`p-4 transition cursor-pointer hover:bg-slate-50 flex gap-3 ${
                !item.read ? 'bg-emerald-50/40' : ''
              }`}
            >
              <div className="shrink-0 mt-0.5">{getIcon(item.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                {!item.read && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1" />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
