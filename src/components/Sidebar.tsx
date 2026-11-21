import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  CreditCard,
  CalendarDays,
  Megaphone,
  Calendar,
  Users,
  Shield,
  Building2,
  HelpCircle,
  Settings,
  Globe,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  memberCount: number;
  pendingDuesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  memberCount,
  pendingDuesCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: 2, badgeColor: 'bg-indigo-600 text-white' },
    { id: 'payments', label: 'Payments', icon: CreditCard, badge: pendingDuesCount > 0 ? pendingDuesCount : undefined, badgeColor: 'bg-amber-500 text-white' },
    { id: 'events', label: 'Meetings & Events', icon: CalendarDays },
    { id: 'news', label: 'News', icon: Megaphone },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users, badge: memberCount },
    { id: 'executives', label: 'Executives', icon: Shield },
    { id: 'about', label: 'About Us', icon: Building2 },
    { id: 'help', label: 'Need Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col p-4 transition-colors duration-200">
      <div className="mb-4 px-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Group Hub Menu</p>
      </div>
      <nav className="space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : item.badgeColor || 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
