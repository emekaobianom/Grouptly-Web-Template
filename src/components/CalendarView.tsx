import React from 'react';
import { CalendarDays, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { GroupEvent } from '../types';

interface CalendarViewProps {
  events: GroupEvent[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Group Calendar</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Scheduled meetings, workshops, general assemblies, and dues deadlines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">December 2026 Schedule</h2>
            <span className="inline-block rounded-full bg-indigo-50 dark:bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {events.length} Active Events
            </span>
          </div>

          <div className="space-y-4">
            {events.map((evt) => (
              <div key={evt.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-sm">
                  <span className="text-[10px] uppercase tracking-wider text-indigo-200">Dec</span>
                  <span className="text-lg leading-tight">{evt.date.split('-')[2]}</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block rounded-md bg-indigo-50 dark:bg-indigo-500/15 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 mb-1">
                    {evt.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{evt.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{evt.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-3">
                    <span className="flex items-center gap-1">🕒 {evt.time}</span>
                    <span className="flex items-center gap-1">📍 {evt.location}</span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {evt.rsvps.length} RSVPs Confirmed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Summary Sidebar */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Key Deadlines</h2>
          
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-200">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">Dec 31, 2026</p>
              <p className="text-sm font-bold">Annual Membership Dues Deadline</p>
              <p className="text-xs text-amber-800 dark:text-amber-200/80 mt-1">Settle 2026 annual fees ($150) to retain assembly voting rights.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-indigo-900 dark:text-indigo-200">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-1">Dec 15, 2026</p>
              <p className="text-sm font-bold">Spring Conference Proposals Due</p>
              <p className="text-xs text-indigo-800 dark:text-indigo-200/80 mt-1">Submit speaker abstracts for the upcoming symposium.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
