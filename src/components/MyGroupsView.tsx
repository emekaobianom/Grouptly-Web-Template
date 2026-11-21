import React, { useState } from 'react';
import { Plus, ArrowRight, ShieldCheck, Users, LogOut, Sun, Moon } from 'lucide-react';
import { Member } from '../types';
import { GROUPTLY_LOGO_URL } from '../constants/branding';

export interface GroupItem {
  id: string;
  name: string;
  tagline: string;
  memberCount: number;
  role: string;
  createdAt: string;
  logoText: string;
}

interface MyGroupsViewProps {
  currentUser: Member;
  groups: GroupItem[];
  onSelectGroup: (groupId: string) => void;
  onCreateGroup: (name: string, tagline: string) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const MyGroupsView: React.FC<MyGroupsViewProps> = ({
  currentUser,
  groups,
  onSelectGroup,
  onCreateGroup,
  onLogout,
  theme,
  onToggleTheme,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTagline, setNewGroupTagline] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    onCreateGroup(newGroupName, newGroupTagline || 'Empowering our community worldwide.');
    setNewGroupName('');
    setNewGroupTagline('');
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col relative overflow-hidden transition-colors duration-200">
      {/* Ambient Background Blended Grouptly Logo */}
      <div className="pointer-events-none fixed -bottom-32 -right-32 w-[620px] h-[620px] opacity-[0.05] mix-blend-multiply dark:opacity-[0.08] dark:mix-blend-normal dark:[mask-image:radial-gradient(closest-side,black_35%,transparent_100%)] select-none">
        <img src={GROUPTLY_LOGO_URL} alt="" className="w-full h-full object-contain -rotate-12" />
      </div>
      <div className="pointer-events-none fixed -top-28 -left-28 w-[420px] h-[420px] opacity-[0.04] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-normal dark:[mask-image:radial-gradient(closest-side,black_35%,transparent_100%)] select-none">
        <img src={GROUPTLY_LOGO_URL} alt="" className="w-full h-full object-contain rotate-12" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1 shadow ring-1 ring-slate-200 dark:ring-teal-400/30">
            <img src={GROUPTLY_LOGO_URL} alt="Grouptly Logo" className="h-full w-full object-contain" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base">Grouptly Admin Portal</span>
            <span className="block text-xs text-teal-600 dark:text-teal-300 font-medium">www.grouptly.com</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Light/Dark Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
          </button>

          <div className="hidden sm:flex items-center gap-3 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            <img src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"} alt={currentUser.name} className="h-7 w-7 rounded-full object-cover" />
            <span className="text-xs font-bold text-slate-800 dark:text-white">{currentUser.name}</span>
            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">Admin</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-slate-700 px-3 py-2 rounded-xl"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full p-6 md:p-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Select Your Group Hub
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Choose one of your previously created groups or register a new group workspace.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition-all shrink-0"
          >
            <Plus className="h-4 w-4" /> Create New Group Hub
          </button>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className="group relative overflow-hidden cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-6 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md dark:hover:bg-slate-800 transition-all flex flex-col justify-between"
            >
              {/* Subtle Blended Corner Logo */}
              <div className="pointer-events-none absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.05] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-normal dark:[mask-image:radial-gradient(closest-side,black_40%,transparent_100%)] group-hover:opacity-[0.12] transition-opacity">
                <img src={GROUPTLY_LOGO_URL} alt="" className="w-full h-full object-contain" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-extrabold text-lg shadow">
                      {group.logoText}
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1 shadow-sm ring-1 ring-slate-200 dark:ring-0">
                      <img src={GROUPTLY_LOGO_URL} alt="Grouptly" className="h-full w-full object-contain" />
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    <ShieldCheck className="h-3.5 w-3.5" /> Active Hub
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {group.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{group.tagline}</p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Users className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> {group.memberCount} Members
                </span>
                <span className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  Manage Workspace <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create New Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 text-slate-900 dark:text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white p-1 flex items-center justify-center ring-1 ring-slate-200 dark:ring-0">
                  <img src={GROUPTLY_LOGO_URL} alt="Grouptly" className="h-full w-full object-contain" />
                </div>
                <h3 className="text-base font-bold">Create New Group Hub</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Group Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silicon Valley Innovators Guild"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Tagline / Mission</label>
                <input
                  type="text"
                  placeholder="e.g. Empowering tech leaders worldwide."
                  value={newGroupTagline}
                  onChange={(e) => setNewGroupTagline(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-500"
                >
                  Create & Enter Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
