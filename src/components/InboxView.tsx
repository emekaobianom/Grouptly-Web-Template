import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Search, Inbox as InboxIcon, Star, Trash2 } from 'lucide-react';
import { Member } from '../types';

interface InboxViewProps {
  members: Member[];
}

export const InboxView: React.FC<InboxViewProps> = ({ members }) => {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'Marcus Sterling (Treasurer)',
      email: 'marcus.sterling@example.com',
      subject: 'Q3 Financial Audit Report & Budget Review',
      snippet: 'Hello Eleanor, I have uploaded the Q3 audit report to the documents repository. Please review when convenient...',
      date: 'Today, 10:45 AM',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      id: 'msg-2',
      sender: 'Dr. Sophia Chen (Secretary)',
      email: 'sophia.chen@example.com',
      subject: 'Minutes from October General Assembly',
      snippet: 'The official meeting minutes have been finalized and distributed. 45 members confirmed attendance...',
      date: 'Yesterday',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    {
      id: 'msg-3',
      sender: 'Liam O’Connor (Engineering)',
      email: 'liam.oconnor@example.com',
      subject: 'Question regarding Spring Masterclass Registration',
      snippet: 'Hi team, is the AI Agent Architecture workshop open to guest attendees or members only?',
      date: 'Nov 18',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
  ]);

  const [selectedMsg, setSelectedMsg] = useState(messages[0]);
  const [replyText, setReplyText] = useState('');
  const [search, setSearch] = useState('');

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    alert(`Reply successfully sent to ${selectedMsg.sender}!`);
    setReplyText('');
  };

  const filteredMessages = messages.filter(
    m => m.subject.toLowerCase().includes(search.toLowerCase()) || m.sender.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Member Inbox & Messages</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Secure internal messaging between group executives and members.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm min-h-[550px]">
        {/* Messages List Sidebar */}
        <div className="border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 pl-9 pr-4 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMsg(msg);
                  setMessages(messages.map(m => m.id === msg.id ? { ...m, unread: false } : m));
                }}
                className={`cursor-pointer p-3.5 rounded-xl border transition-all ${
                  selectedMsg.id === msg.id
                    ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-500/15 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${msg.unread ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-slate-200'}`}>
                    {msg.sender.split(' ')[0]} {msg.sender.split(' ')[1]}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{msg.date}</span>
                </div>
                <p className={`text-xs truncate ${msg.unread ? 'font-extrabold text-slate-900 dark:text-white' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                  {msg.subject}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{msg.snippet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail View */}
        <div className="lg:col-span-2 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedMsg.avatar} alt={selectedMsg.sender} className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-600/20" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedMsg.sender}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{selectedMsg.email}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{selectedMsg.date}</span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{selectedMsg.subject}</h2>
              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                <p>{selectedMsg.snippet}</p>
                <p>Please review the attached documents in our secure records repository or let me know if you have any feedback before our next executive board meeting.</p>
                <p className="text-slate-500 dark:text-slate-400 pt-2 font-medium">Best regards,<br/>{selectedMsg.sender}</p>
              </div>
            </div>
          </div>

          {/* Reply Form */}
          <form onSubmit={handleReply} className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={`Reply to ${selectedMsg.sender.split(' ')[0]}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700 transition-all"
              >
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
