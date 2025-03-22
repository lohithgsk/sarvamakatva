export interface Profile {
  id: string;
  created_at: string;
  email: string;
  full_name: string;
  role: 'admin' | 'staff' | 'student' | 'beneficiary' | 'volunteer';
  phone?: string;
  address?: string;
  education?: string;
  health_info?: string;
  social_background?: string;
  skills?: string[];
  certifications?: string[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface Enrollment {
  id: string;
  user_id: string;
  program_id: string;
  enrollment_date: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
}

export interface Attendance {
  id: string;
  user_id: string;
  program_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Progress {
  id: string;
  user_id: string;
  program_id: string;
  milestone: string;
  completion_date: string;
  notes?: string;
}