import React from 'react';
import { Shield, Mail, Phone, Award } from 'lucide-react';
import { Member } from '../types';

interface ExecutivesViewProps {
  members: Member[];
}

export const ExecutivesView: React.FC<ExecutivesViewProps> = ({ members }) => {
  const executives = members.filter(
    (m) => m.role === 'admin' || m.role === 'treasurer' || m.role === 'secretary' || (m.department && m.department.includes('Executive'))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Executive Board & Leadership</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Meet the elected officers and committee heads governing the group.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {executives.map((exec) => (
          <div key={exec.id} className="flex flex-col items-center text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all">
            <img
              src={exec.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
              alt={exec.name}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-600/20 mb-4"
            />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exec.name}</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 capitalize mt-1 mb-3">
              <Shield className="h-3.5 w-3.5" /> {exec.role} • {exec.department || 'Executive Board'}
            </span>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{exec.notes}</p>

            <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> {exec.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
