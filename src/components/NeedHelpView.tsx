import React, { useState } from 'react';
import { HelpCircle, Sparkles, Send, Mail, BookOpen } from 'lucide-react';

interface NeedHelpViewProps {
  openAIAssistant: () => void;
}

export const NeedHelpView: React.FC<NeedHelpViewProps> = ({ openAIAssistant }) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
      alert('Support ticket successfully submitted! Our administrative team will respond within 24 hours.');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Need Help & Support</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Access FAQs, documentation, or submit a support ticket to group admins.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grouptly AI Prompt */}
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-500/30 bg-gradient-to-br from-indigo-900 to-violet-950 p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber-300 mb-4 backdrop-blur-md">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold mb-2">Ask Grouptly AI Assistant</h2>
            <p className="text-xs text-indigo-200 leading-relaxed mb-6">
              Need immediate answers about dues payments, meeting schedules, or member bylaws? Ask our Gemini-powered AI assistant instantly.
            </p>
          </div>
          <button
            onClick={openAIAssistant}
            className="w-full rounded-xl bg-white py-3 text-sm font-bold text-slate-900 shadow-md hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" /> Open Grouptly AI
          </button>
        </div>

        {/* FAQs */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">How do I pay my annual membership dues?</p>
              <p className="text-slate-500 dark:text-slate-400">Go to the Payments tab, select your preferred payment method (Credit Card, Bank Transfer, PayPal), and record your payment.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">How do I RSVP for upcoming general assemblies?</p>
              <p className="text-slate-500 dark:text-slate-400">Navigate to Meetings & Events to view scheduled assemblies and confirm your attendance status.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Support Ticket */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Submit Support Ticket</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Send an inquiry directly to the group administration.</p>

        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Subject</label>
            <input
              type="text"
              required
              placeholder="e.g. Question regarding membership status or dues receipt"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Message</label>
            <textarea
              rows={4}
              required
              placeholder="Describe how we can assist you..."
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitted}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
