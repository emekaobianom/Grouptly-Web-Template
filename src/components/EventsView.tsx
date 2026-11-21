import React, { useState } from 'react';
import { CalendarDays, Plus, MapPin, Clock, Users, CheckCircle2, XCircle, HelpCircle, X } from 'lucide-react';
import { GroupEvent } from '../types';

interface EventsViewProps {
  events: GroupEvent[];
  onAddEvent: (evt: Omit<GroupEvent, 'id' | 'rsvps'>) => void;
  onUpdateRSVP: (eventId: string, memberId: string, status: 'attending' | 'declined' | 'maybe') => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events,
  onAddEvent,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<GroupEvent | null>(null);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-12-15');
  const [time, setTime] = useState('15:00 - 17:00 EST');
  const [location, setLocation] = useState('Grand Ballroom & Virtual Stream');
  const [category, setCategory] = useState<'General Meeting' | 'Board Meeting' | 'Workshop' | 'Social' | 'Fundraiser'>('General Meeting');
  const [capacity, setCapacity] = useState('50');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddEvent({
      title,
      description,
      date,
      time,
      location,
      category,
      capacity: parseInt(capacity) || 50,
    });

    setTitle('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Meetings & Events</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Schedule meetings, workshops, and general assemblies with attendee tracking.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950/50 hover:bg-indigo-700 transition-all"
        >
          <Plus className="h-4 w-4" /> Schedule New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div key={evt.id} className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block rounded-md bg-indigo-50 dark:bg-indigo-500/15 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                {evt.category}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{evt.date}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{evt.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 flex-1">{evt.description}</p>

            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{evt.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{evt.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span className="font-bold text-slate-700 dark:text-slate-200">{evt.rsvps.length} Confirmed RSVPs</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(evt)}
              className="w-full rounded-xl bg-slate-900 dark:bg-indigo-600 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors"
            >
              View Attendee List & RSVPs
            </button>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Schedule Group Event</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q4 Executive Strategy Meeting"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter meeting agenda or event details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="General Meeting">General Meeting</option>
                    <option value="Board Meeting">Board Meeting</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Social">Social</option>
                    <option value="Fundraiser">Fundraiser</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Location / Venue</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700"
                >
                  Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details / RSVPs Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="inline-block rounded-md bg-indigo-50 dark:bg-indigo-500/15 px-2.5 py-0.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
                  {selectedEvent.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedEvent.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl">{selectedEvent.description}</p>
              
              <div className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Confirmed RSVPs ({selectedEvent.rsvps.length})</div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedEvent.rsvps.map((rsvp: { memberId: string; memberName: string; status: string }, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-800 dark:text-slate-100">{rsvp.memberName}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 capitalize">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {rsvp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-xl bg-slate-900 dark:bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-slate-800 dark:hover:bg-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
