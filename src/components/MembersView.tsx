import React, { useState } from 'react';
import { Users, UserPlus, Search, Filter, Mail, Phone, Shield, CheckCircle2, Clock, AlertCircle, Trash2, Edit3, X, Download } from 'lucide-react';
import { Member, MemberRole, MemberStatus } from '../types';

interface MembersViewProps {
  members: Member[];
  onAddMember: (member: Omit<Member, 'id' | 'eventsAttendedCount'>) => void;
  onUpdateMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
  currency: string;
}

export const MembersView: React.FC<MembersViewProps> = ({
  members,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
  currency,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Form state for add
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRole, setNewRole] = useState<MemberRole>('member');
  const [newStatus, setNewStatus] = useState<MemberStatus>('active');
  const [newDepartment, setNewDepartment] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newDuesStatus, setNewDuesStatus] = useState<'paid' | 'unpaid' | 'overdue' | 'exempt'>('unpaid');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.department && m.department.toLowerCase().includes(search.toLowerCase()));

    const matchesRole = roleFilter === 'all' || m.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    onAddMember({
      name: newName,
      email: newEmail,
      phone: newPhone || '+1 (555) 000-0000',
      role: newRole,
      status: newStatus,
      joinDate: new Date().toISOString().split('T')[0],
      duesStatus: newDuesStatus,
      department: newDepartment || 'General Member',
      notes: newNotes || 'New member registered via portal.',
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`,
    });

    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewDepartment('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Status', 'Dues Status', 'Department', 'Join Date'];
    const rows = filteredMembers.map(m => [
      `"${m.name}"`,
      `"${m.email}"`,
      `"${m.phone}"`,
      `"${m.role}"`,
      `"${m.status}"`,
      `"${m.duesStatus}"`,
      `"${m.department || ''}"`,
      `"${m.joinDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'grouptly_members_directory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Members Directory</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage group members, roles, and membership statuses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950/50 hover:bg-indigo-700 transition-all"
          >
            <UserPlus className="h-4 w-4" /> Add New Member
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 px-3 text-xs font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="treasurer">Treasurer</option>
              <option value="secretary">Secretary</option>
              <option value="member">Member</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 px-3 text-xs font-bold text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Role & Dept</th>
                <th className="py-3.5 px-4">Membership Status</th>
                <th className="py-3.5 px-4">Dues Status</th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                    No members found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={m.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                        />
                        <div>
                          <button
                            onClick={() => setSelectedMember(m)}
                            className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 text-left transition-colors"
                          >
                            {m.name}
                          </button>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <Mail className="h-3 w-3" /> {m.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 dark:bg-indigo-500/15 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 capitalize">
                        <Shield className="h-3 w-3" /> {m.role}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.department || 'General'}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      {m.status === 'active' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Active
                        </span>
                      )}
                      {m.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                          <Clock className="h-3.5 w-3.5" /> Pending
                        </span>
                      )}
                      {m.status === 'expired' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 dark:bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-700 dark:text-rose-400">
                          <AlertCircle className="h-3.5 w-3.5" /> Expired
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {m.duesStatus === 'paid' && (
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">Paid ({currency}150)</span>
                      )}
                      {m.duesStatus === 'unpaid' && (
                        <span className="font-semibold text-amber-600 dark:text-amber-400 text-xs">Unpaid</span>
                      )}
                      {m.duesStatus === 'overdue' && (
                        <span className="font-semibold text-rose-600 dark:text-rose-400 text-xs">Overdue</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {m.joinDate}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedMember(m)}
                          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          title="View Profile"
                        >
                          <Users className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteMember(m.id)}
                          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          title="Delete Member"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Register New Member</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jane Doe"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane.doe@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as MemberRole)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none capitalize"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="treasurer">Treasurer</option>
                    <option value="secretary">Secretary</option>
                    <option value="guest">Guest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as MemberStatus)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none capitalize"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Dues Status</label>
                  <select
                    value={newDuesStatus}
                    onChange={(e) => setNewDuesStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none capitalize"
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="exempt">Exempt</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Department / Working Group</label>
                <input
                  type="text"
                  placeholder="e.g. Executive Board, AI Research"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Notes / Bio</label>
                <textarea
                  rows={2}
                  placeholder="Add member background or notes..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                ></textarea>
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
                  Register Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedMember.avatarUrl} alt={selectedMember.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-600/20" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedMember.name}</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold capitalize">{selectedMember.role} • {selectedMember.department}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Email Address</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{selectedMember.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Phone Number</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{selectedMember.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Membership Status</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 capitalize">{selectedMember.status}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Annual Dues</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 uppercase">{selectedMember.duesStatus}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase mb-1">Background / Notes</p>
                <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">{selectedMember.notes || 'No notes available.'}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase mb-1">Event Attendance Participation</p>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Total Events Attended</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedMember.eventsAttendedCount} Assemblies & Workshops</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedMember(null)}
                className="rounded-xl bg-slate-900 dark:bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-slate-800 dark:hover:bg-indigo-500"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
