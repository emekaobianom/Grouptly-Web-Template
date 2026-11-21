import React, { useMemo } from 'react';
import { Users, CreditCard, CalendarDays, Megaphone, Sparkles, TrendingUp, CheckCircle2, Clock, AlertCircle, ArrowUpRight, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Member, DuesTransaction, GroupEvent, Announcement, OrgSettings } from '../types';
import { GROUPTLY_LOGO_URL } from '../constants/branding';

interface DashboardViewProps {
  members: Member[];
  transactions: DuesTransaction[];
  events: GroupEvent[];
  announcements: Announcement[];
  settings: OrgSettings;
  setActiveTab: (tab: string) => void;
  openAIAssistant: () => void;
}

interface MonthlyDuesPoint {
  month: string;
  collected: number;
  pending: number;
  count: number;
}

interface DuesChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    color?: string;
    dataKey?: string;
    payload?: MonthlyDuesPoint;
  }>;
  label?: string;
  currency: string;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const MonthlyDuesTooltip: React.FC<DuesChartTooltipProps> = ({ active, payload, label, currency }) => {
  if (!active || !payload || payload.length === 0) return null;

  const point = payload[0]?.payload;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 shadow-lg text-xs">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-1.5 mb-2">
        <span className="font-bold text-slate-900 dark:text-white">{label}</span>
        {point && (
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {point.count} {point.count === 1 ? 'payment' : 'payments'}
          </span>
        )}
      </div>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={String(entry.dataKey)} className="flex items-center justify-between gap-5">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
              <span
                className="h-2.5 w-2.5 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {currency}{(entry.value ?? 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  members,
  transactions,
  events,
  announcements,
  settings,
  setActiveTab,
  openAIAssistant,
}) => {
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'active').length;
  const totalDuesCollected = transactions
    .filter((tx) => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const pendingDuesCount = members.filter((m) => m.duesStatus === 'unpaid' || m.duesStatus === 'overdue').length;

  const { monthlyDuesData, totalPendingDues, peakMonth } = useMemo(() => {
    const buckets: MonthlyDuesPoint[] = MONTH_LABELS.map((month) => ({
      month,
      collected: 0,
      pending: 0,
      count: 0,
    }));

    let pendingSum = 0;

    transactions.forEach((tx) => {
      const parts = tx.date.split('-');
      const monthIdx = parts.length >= 2 ? Number(parts[1]) - 1 : -1;
      if (monthIdx < 0 || monthIdx >= 12 || Number.isNaN(monthIdx)) return;

      if (tx.status === 'completed') {
        buckets[monthIdx].collected += tx.amount;
        buckets[monthIdx].count += 1;
      } else if (tx.status === 'pending') {
        buckets[monthIdx].pending += tx.amount;
        buckets[monthIdx].count += 1;
        pendingSum += tx.amount;
      }
    });

    const topMonth = buckets.reduce<MonthlyDuesPoint | null>((best, curr) => {
      const currTotal = curr.collected + curr.pending;
      const bestTotal = best ? best.collected + best.pending : 0;
      return currTotal > bestTotal ? curr : best;
    }, null);

    return {
      monthlyDuesData: buckets,
      totalPendingDues: pendingSum,
      peakMonth: topMonth && topMonth.collected + topMonth.pending > 0 ? topMonth.month : null,
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Welcome & AI Banner with Blended Grouptly Logo Splash */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-violet-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl pointer-events-none"></div>
        {/* Background-blended Grouptly Logo Watermark */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-64 w-64 md:h-80 md:w-80 opacity-20 [mask-image:radial-gradient(closest-side,black_45%,transparent_100%)] select-none">
          <img
            src={GROUPTLY_LOGO_URL}
            alt=""
            className="h-full w-full object-contain rotate-[-6deg]"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/35 px-3 py-1 text-xs font-semibold text-indigo-200 mb-4 backdrop-blur-md">
            <div className="h-4 w-4 rounded-full bg-white p-0.5 flex items-center justify-center">
              <img src={GROUPTLY_LOGO_URL} alt="Grouptly" className="h-full w-full object-contain" />
            </div>
            Grouptly Intelligence Active
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Welcome back, Eleanor 👋
          </h1>
          <p className="text-indigo-200 text-sm md:text-base mb-6 leading-relaxed">
            {settings.name} currently has <span className="font-semibold text-white">{activeMembers} active members</span> with {settings.currency}{totalDuesCollected.toLocaleString()} in collected annual dues. You have 2 pending member verifications.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('members')}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-md hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <Users className="h-4 w-4 text-indigo-600" /> Manage Members
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className="rounded-xl bg-indigo-600/60 border border-indigo-400/30 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-md hover:bg-indigo-600 transition-all flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4 text-emerald-300" /> Track Dues & Finance
            </button>
            <button
              onClick={openAIAssistant}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" /> Ask Grouptly AI
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Members */}
        <div 
          onClick={() => setActiveTab('members')}
          className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Members</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalMembers}</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-0.5" /> {activeMembers} active
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Click to view roster & roles</p>
        </div>

        {/* Dues Collected */}
        <div 
          onClick={() => setActiveTab('payments')}
          className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Dues Collected</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{settings.currency}{totalDuesCollected.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">92% rate</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{pendingDuesCount} members pending payment</p>
        </div>

        {/* Upcoming Events */}
        <div 
          onClick={() => setActiveTab('events')}
          className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Upcoming Events</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
              <CalendarDays className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{events.length}</span>
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">This month</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Next: {events[0]?.title.substring(0, 22)}...</p>
        </div>

        {/* Announcements */}
        <div 
          onClick={() => setActiveTab('news')}
          className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Active Board Notices</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Megaphone className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{announcements.length}</span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">1 Pinned</span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Click to broadcast notice</p>
        </div>
      </div>

      {/* Monthly Dues Payment Trend Bar Chart */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Dues Payment Trend</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Collected vs. pending dues payments across the year
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Collected: </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {settings.currency}{totalDuesCollected.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Pending: </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {settings.currency}{totalPendingDues.toLocaleString()}
                </span>
              </div>
              {peakMonth && (
                <div className="hidden md:block">
                  <span className="text-slate-500 dark:text-slate-400">Peak Month: </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{peakMonth}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveTab('payments')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
            >
              View Finance Ledger <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyDuesData}
              margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
              barGap={6}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value: number) => `${settings.currency}${value}`}
                width={56}
              />
              <Tooltip
                cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
                content={<MonthlyDuesTooltip currency={settings.currency} />}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '14px' }}
                iconType="circle"
              />
              <Bar
                dataKey="collected"
                name="Collected"
                fill="#4f46e5"
                radius={[6, 6, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="pending"
                name="Pending"
                fill="#f59e0b"
                radius={[6, 6, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Grid: Upcoming Events & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events Widget */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Upcoming Group Events</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage RSVPs, meetings, and assemblies</p>
            </div>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
            >
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {events.map((evt) => (
              <div key={evt.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-indigo-200">Dec</span>
                    <span className="text-base leading-tight">{evt.date.split('-')[2]}</span>
                  </div>
                  <div>
                    <span className="inline-block rounded-md bg-indigo-50 dark:bg-indigo-500/15 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 mb-1">
                      {evt.category}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{evt.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 mt-1">
                      <span>🕒 {evt.time}</span>
                      <span>📍 {evt.location}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{evt.rsvps.length} RSVPs</p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Confirmed</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('events')}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm"
                  >
                    View RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Dues & Members Status */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Member Status</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Dues payment health</p>
            </div>
            <button
              onClick={() => setActiveTab('payments')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
            >
              Finance <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-3.5 flex-1">
            {members.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <div className="flex items-center gap-3">
                  <img src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'} alt={m.name} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{m.role} • {m.department || 'General'}</p>
                  </div>
                </div>
                <div>
                  {m.duesStatus === 'paid' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Paid
                    </span>
                  )}
                  {m.duesStatus === 'unpaid' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                      <Clock className="h-3.5 w-3.5" /> Pending
                    </span>
                  )}
                  {m.duesStatus === 'overdue' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 dark:bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-700 dark:text-rose-400">
                      <AlertCircle className="h-3.5 w-3.5" /> Overdue
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => setActiveTab('members')}
              className="w-full rounded-xl bg-slate-900 dark:bg-indigo-600 py-2.5 text-xs font-bold text-white shadow hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors"
            >
              View Full Member Directory ({totalMembers})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
