/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { InboxView } from './components/InboxView';
import { MembersView } from './components/MembersView';
import { DuesView } from './components/DuesView';
import { EventsView } from './components/EventsView';
import { CalendarView } from './components/CalendarView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { ExecutivesView } from './components/ExecutivesView';
import { AboutUsView } from './components/AboutUsView';
import { NeedHelpView } from './components/NeedHelpView';
import { SettingsView } from './components/SettingsView';
import { AIAssistantModal } from './components/AIAssistantModal';
import { AuthView } from './components/AuthView';
import { MyGroupsView, GroupItem } from './components/MyGroupsView';
import { GROUPTLY_LOGO_URL } from './constants/branding';

import {
  initialOrgSettings,
  initialMembers,
  initialTransactions,
  initialEvents,
  initialAnnouncements,
  initialDocuments,
} from './data/mockData';
import { Member, DuesTransaction, GroupEvent, Announcement, GroupDocument, OrgSettings } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('grouptly_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('grouptly_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Persistent State
  const [settings, setSettings] = useState<OrgSettings>(() => {
    const saved = localStorage.getItem('grouptly_settings');
    return saved ? JSON.parse(saved) : initialOrgSettings;
  });

  const [groups, setGroups] = useState<GroupItem[]>(() => {
    const saved = localStorage.getItem('grouptly_groups');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'g-1',
            name: initialOrgSettings.name,
            tagline: initialOrgSettings.tagline,
            memberCount: initialMembers.length,
            role: 'Admin / President',
            createdAt: '2023-01-15',
            logoText: initialOrgSettings.logoText,
          },
          {
            id: 'g-2',
            name: 'Metro City Leadership Guild',
            tagline: 'Fostering civic engagement and executive mentorship.',
            memberCount: 42,
            role: 'Admin / Founder',
            createdAt: '2024-05-10',
            logoText: 'MCL',
          },
        ];
  });

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(() => {
    return localStorage.getItem('grouptly_selected_group_id') || null;
  });

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('grouptly_members');
    return saved ? JSON.parse(saved) : initialMembers;
  });

  const [currentUser, setCurrentUser] = useState<Member | null>(() => {
    const saved = localStorage.getItem('grouptly_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [transactions, setTransactions] = useState<DuesTransaction[]>(() => {
    const saved = localStorage.getItem('grouptly_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [events, setEvents] = useState<GroupEvent[]>(() => {
    const saved = localStorage.getItem('grouptly_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('grouptly_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [documents, setDocuments] = useState<GroupDocument[]>(() => {
    const saved = localStorage.getItem('grouptly_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  useEffect(() => {
    localStorage.setItem('grouptly_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('grouptly_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (selectedGroupId) {
      localStorage.setItem('grouptly_selected_group_id', selectedGroupId);
    } else {
      localStorage.removeItem('grouptly_selected_group_id');
    }
  }, [selectedGroupId]);

  useEffect(() => {
    localStorage.setItem('grouptly_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('grouptly_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('grouptly_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('grouptly_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('grouptly_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('grouptly_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('grouptly_documents', JSON.stringify(documents));
  }, [documents]);

  // Auth Handlers
  const handleLogin = (user: Member) => {
    setCurrentUser(user);
    setSelectedGroupId(null); // Show group selector first
  };

  const handleSignup = (name: string, email: string, orgName: string) => {
    const newMember: Member = {
      id: `m-${Date.now()}`,
      name,
      email,
      phone: '+1 (555) 019-2834',
      role: 'admin',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      duesStatus: 'paid',
      department: 'Executive Board',
      notes: 'Group creator and primary administrator.',
      eventsAttendedCount: 1,
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`,
    };

    const newGroupItem: GroupItem = {
      id: `g-${Date.now()}`,
      name: orgName,
      tagline: 'Empowering digital leaders and creators worldwide.',
      memberCount: 1,
      role: 'Admin / Founder',
      createdAt: new Date().toISOString().split('T')[0],
      logoText: orgName.substring(0, 3).toUpperCase(),
    };

    setGroups([newGroupItem, ...groups]);
    setMembers([newMember, ...members]);
    setSettings({
      ...settings,
      name: orgName,
      contactEmail: email,
      logoText: newGroupItem.logoText,
    });
    setCurrentUser(newMember);
    setSelectedGroupId(newGroupItem.id);
    setActiveTab('dashboard');
  };

  const handleSelectGroup = (groupId: string) => {
    const foundGroup = groups.find((g) => g.id === groupId);
    if (foundGroup) {
      setSettings({
        ...settings,
        name: foundGroup.name,
        tagline: foundGroup.tagline,
        logoText: foundGroup.logoText,
      });
      setSelectedGroupId(groupId);
      setActiveTab('dashboard');
    }
  };

  const handleCreateGroupFromSelector = (name: string, tagline: string) => {
    const newGroupItem: GroupItem = {
      id: `g-${Date.now()}`,
      name,
      tagline,
      memberCount: 1,
      role: 'Admin / Founder',
      createdAt: new Date().toISOString().split('T')[0],
      logoText: name.substring(0, 3).toUpperCase(),
    };

    setGroups([newGroupItem, ...groups]);
    setSettings({
      ...settings,
      name,
      tagline,
      logoText: newGroupItem.logoText,
    });
    setSelectedGroupId(newGroupItem.id);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedGroupId(null);
  };

  // Handlers
  const handleAddMember = (newMem: Omit<Member, 'id' | 'eventsAttendedCount'>) => {
    const member: Member = {
      ...newMem,
      id: `m-${Date.now()}`,
      eventsAttendedCount: 0,
    };
    setMembers([member, ...members]);
  };

  const handleUpdateMember = (updated: Member) => {
    setMembers(members.map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to remove this member from the group?')) {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const handleAddTransaction = (newTx: Omit<DuesTransaction, 'id'>) => {
    const tx: DuesTransaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions([tx, ...transactions]);

    if (tx.category === 'Annual Dues' && tx.status === 'completed') {
      setMembers(
        members.map((m) =>
          m.id === tx.memberId ? { ...m, duesStatus: 'paid' } : m
        )
      );
    }
  };

  const handleAddEvent = (newEvt: Omit<GroupEvent, 'id' | 'rsvps'>) => {
    const event: GroupEvent = {
      ...newEvt,
      id: `evt-${Date.now()}`,
      rsvps: [
        { memberId: currentUser?.id || 'm1', memberName: currentUser?.name || 'Eleanor Vance', status: 'attending' },
      ],
    };
    setEvents([event, ...events]);
  };

  const handleUpdateRSVP = (eventId: string, memberId: string, status: 'attending' | 'declined' | 'maybe') => {
    setEvents(
      events.map((evt) => {
        if (evt.id !== eventId) return evt;
        const existingRsvpIndex = evt.rsvps.findIndex((r: { memberId: string }) => r.memberId === memberId);
        const member = members.find((m) => m.id === memberId);
        const memberName = member ? member.name : 'Member';

        let newRsvps = [...evt.rsvps];
        if (existingRsvpIndex >= 0) {
          newRsvps[existingRsvpIndex] = { memberId, memberName, status };
        } else {
          newRsvps.push({ memberId, memberName, status });
        }
        return { ...evt, rsvps: newRsvps };
      })
    );
  };

  const handleAddAnnouncement = (newAnn: Omit<Announcement, 'id'>) => {
    const ann: Announcement = {
      ...newAnn,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements([ann, ...announcements]);
  };

  const pendingDuesCount = members.filter((m) => m.duesStatus === 'unpaid' || m.duesStatus === 'overdue').length;

  // 1. If not logged in -> Auth Gate
  if (!currentUser) {
    return (
      <AuthView
        members={members}
        settings={settings}
        onLogin={handleLogin}
        onSignup={handleSignup}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // 2. If logged in but no group selected -> My Groups Hub Selector
  if (!selectedGroupId) {
    return (
      <MyGroupsView
        currentUser={currentUser}
        groups={groups}
        onSelectGroup={handleSelectGroup}
        onCreateGroup={handleCreateGroupFromSelector}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // 3. Otherwise -> Group Dashboard Workspace
  return (
    <div className="flex h-screen w-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        settings={settings}
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAIAssistant={() => setIsAIAssistantOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        unreadNotificationsCount={pendingDuesCount}
        onLogout={() => setSelectedGroupId(null)} // Returns to My Groups selector
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          memberCount={members.length}
          pendingDuesCount={pendingDuesCount}
        />

        {/* Content Area */}
        <main className="relative flex-1 overflow-y-auto p-4 md:p-8">
          {/* Background-blended Grouptly Logo Watermark */}
          <div className="pointer-events-none fixed bottom-6 right-6 z-0 h-72 w-72 opacity-[0.04] mix-blend-multiply dark:opacity-[0.06] dark:mix-blend-normal dark:[mask-image:radial-gradient(closest-side,black_40%,transparent_100%)] select-none">
            <img src={GROUPTLY_LOGO_URL} alt="" className="h-full w-full object-contain -rotate-6" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl">
            {activeTab === 'dashboard' && (
              <DashboardView
                members={members}
                transactions={transactions}
                events={events}
                announcements={announcements}
                settings={settings}
                setActiveTab={setActiveTab}
                openAIAssistant={() => setIsAIAssistantOpen(true)}
              />
            )}

            {activeTab === 'inbox' && (
              <InboxView members={members} />
            )}

            {activeTab === 'payments' && (
              <DuesView
                transactions={transactions}
                members={members}
                settings={settings}
                onAddTransaction={handleAddTransaction}
              />
            )}

            {activeTab === 'events' && (
              <EventsView
                events={events}
                onAddEvent={handleAddEvent}
                onUpdateRSVP={handleUpdateRSVP}
              />
            )}

            {activeTab === 'news' && (
              <AnnouncementsView
                announcements={announcements}
                onAddAnnouncement={handleAddAnnouncement}
              />
            )}

            {activeTab === 'calendar' && (
              <CalendarView events={events} />
            )}

            {activeTab === 'members' && (
              <MembersView
                members={members}
                onAddMember={handleAddMember}
                onUpdateMember={handleUpdateMember}
                onDeleteMember={handleDeleteMember}
                currency={settings.currency}
              />
            )}

            {activeTab === 'executives' && (
              <ExecutivesView members={members} />
            )}

            {activeTab === 'about' && (
              <AboutUsView settings={settings} />
            )}

            {activeTab === 'help' && (
              <NeedHelpView openAIAssistant={() => setIsAIAssistantOpen(true)} />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                settings={settings}
                onUpdateSettings={setSettings}
              />
            )}
          </div>
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        orgName={settings.name}
      />
    </div>
  );
}
