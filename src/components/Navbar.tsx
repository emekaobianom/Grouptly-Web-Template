import React from 'react';
import { Bell, Search, ShieldCheck, LogOut, Sun, Moon } from 'lucide-react';
import { Member, OrgSettings } from '../types';
import { GROUPTLY_LOGO_URL } from '../constants/branding';

interface NavbarProps {
  settings: OrgSettings;
  currentUser: Member;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAIAssistant: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  unreadNotificationsCount: number;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  currentUser,
  searchTerm,
  setSearchTerm,
  unreadNotificationsCount,
  onLogout,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-4 md:px-8 backdrop-blur-md transition-colors duration-200">
      {/* Left: Grouptly Logo & Group Name */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
          <img src={GROUPTLY_LOGO_URL} alt="Grouptly Logo" className="h-full w-full object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white">{settings.name}</span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 ring-1 ring-inset ring-emerald-600/20 dark:ring-emerald-500/30">
              <ShieldCheck className="mr-1 h-3 w-3" /> Verified Group
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Powered by Grouptly Membership Engine</p>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search members, events, documents, dues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle Light/Dark Mode"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-600" />}
        </button>

        {/* Notifications */}
        <button 
          onClick={() => alert("You have " + unreadNotificationsCount + " new group alerts regarding pending dues and RSVPs.")}
          className="relative rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Profile avatar & Logout */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
          <img
            src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"}
            alt={currentUser.name}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-600/20"
          />
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{currentUser.name}</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium capitalize">{currentUser.role}</p>
          </div>
          <button
            onClick={onLogout}
            className="ml-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title="Switch Group Hub"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
