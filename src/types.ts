export type MemberStatus = 'active' | 'pending' | 'expired' | 'lifetime';
export type MemberRole = 'admin' | 'treasurer' | 'secretary' | 'member' | 'guest';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: MemberRole;
  status: MemberStatus;
  joinDate: string;
  duesStatus: 'paid' | 'unpaid' | 'overdue' | 'exempt';
  avatarUrl?: string;
  department?: string;
  notes?: string;
  eventsAttendedCount: number;
}

export interface DuesTransaction {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Cash' | 'Mobile Money' | 'PayPal';
  category: 'Annual Dues' | 'Event Fee' | 'Special Levy' | 'Donation';
  notes?: string;
}

export interface GroupEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'General Meeting' | 'Board Meeting' | 'Workshop' | 'Social' | 'Fundraiser';
  rsvps: {
    memberId: string;
    memberName: string;
    status: 'attending' | 'declined' | 'maybe';
  }[];
  capacity?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  date: string;
  pinned: boolean;
  category: 'General' | 'Finance' | 'Events' | 'Urgent';
}

export interface GroupDocument {
  id: string;
  title: string;
  category: 'Constitution' | 'Meeting Minutes' | 'Financial Report' | 'Policies' | 'Forms';
  uploadDate: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  downloadUrl?: string;
}

export interface OrgSettings {
  name: string;
  tagline: string;
  currency: string;
  annualDuesAmount: number;
  contactEmail: string;
  website: string;
  logoText: string;
}
