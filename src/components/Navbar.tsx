import React, { useState } from 'react';
import { UserRole, NotificationItem } from '../types';
import { Bell, Shield, User, Wallet, ArrowRightLeft, Sparkles, Building2, Users, LogOut } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';

interface NavbarProps {
  currentRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
  clientName: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleSwitch,
  activeTab,
  setActiveTab,
  notifications,
  onMarkNotificationAsRead,
  onClearAllNotifications,
  clientName,
  onLogout,
}) => {
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div
            onClick={onLogout}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-emerald-600 text-white shadow-md shadow-amber-500/20 cursor-pointer overflow-hidden relative group"
            title="Return to Landing Page"
          >
            <img
              src="/public/assets/aistudio/money_loaning_fc6cfda1.jpg"
              alt="Aurum Capital"
              className="h-full w-full object-cover animate-[spin_15s_linear_infinite]"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-slate-900">Aurum Capital</span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                {currentRole === 'client' ? 'Client Portal' : 'Owner Admin'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Loans & Stokvel Savings Pools</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 rounded-xl bg-slate-100 p-1">
          {currentRole === 'client' ? (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'payment'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Payment Portal
              </button>
              <button
                onClick={() => setActiveTab('stokvels')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition flex items-center gap-1 ${
                  activeTab === 'stokvels'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="h-3 w-3 text-emerald-600" />
                <span>Stokvels</span>
              </button>
              <button
                onClick={() => setActiveTab('statement')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'statement'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Statement
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'history'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'profile'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('owner_dashboard')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'owner_dashboard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Overview & Loans
              </button>
              <button
                onClick={() => setActiveTab('owner_approvals')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'owner_approvals'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Approvals
              </button>
              <button
                onClick={() => setActiveTab('stokvels')}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition flex items-center gap-1 ${
                  activeTab === 'stokvels'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="h-3.5 w-3.5 text-amber-600" />
                <span>Stokvel Management</span>
              </button>
              <button
                onClick={() => setActiveTab('owner_calendar')}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === 'owner_calendar'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Calendar
              </button>
            </>
          )}
        </nav>

        {/* Right Actions: Role switcher, notifications, profile, logout */}
        <div className="flex items-center gap-3">
          {/* Role Switcher */}
          <button
            onClick={() => {
              const newRole = currentRole === 'client' ? 'owner' : 'client';
              onRoleSwitch(newRole);
              setActiveTab(newRole === 'client' ? 'dashboard' : 'owner_dashboard');
            }}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition"
            title="Switch between Client and Owner view"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">{currentRole === 'client' ? 'Owner Mode' : 'Client Mode'}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50 transition shadow-xs"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationCenter
              isOpen={showNotif}
              onClose={() => setShowNotif(false)}
              notifications={notifications}
              onMarkAsRead={onMarkNotificationAsRead}
              onClearAll={onClearAllNotifications}
            />
          </div>

          {/* Logout / Landing Page Return */}
          <button
            onClick={onLogout}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs"
            title="Return to Landing Page / Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-100 bg-slate-50/80 px-4 py-2 gap-2 scrollbar-none">
        {currentRole === 'client' ? (
          <>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'payment' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Payment
            </button>
            <button
              onClick={() => setActiveTab('stokvels')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'stokvels' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Stokvels
            </button>
            <button
              onClick={() => setActiveTab('statement')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'statement' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Statement
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'history' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Profile
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('owner_dashboard')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'owner_dashboard' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('owner_approvals')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'owner_approvals' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Approvals
            </button>
            <button
              onClick={() => setActiveTab('stokvels')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'stokvels' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Stokvels
            </button>
            <button
              onClick={() => setActiveTab('owner_calendar')}
              className={`rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                activeTab === 'owner_calendar' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-white shadow-xs'
              }`}
            >
              Calendar
            </button>
          </>
        )}
      </div>
    </header>
  );
};
