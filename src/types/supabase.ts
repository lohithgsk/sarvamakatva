export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          role: 'admin' | 'staff' | 'student' | 'beneficiary' | 'volunteer'
          phone: string | null
          address: string | null
          education: string | null
          health_info: string | null
          social_background: string | null
          skills: string[] | null
          certifications: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          full_name: string
          role: 'admin' | 'staff' | 'student' | 'beneficiary' | 'volunteer'
          phone?: string | null
          address?: string | null
          education?: string | null
          health_info?: string | null
          social_background?: string | null
          skills?: string[] | null
          certifications?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'staff' | 'student' | 'beneficiary' | 'volunteer'
          phone?: string | null
          address?: string | null
          education?: string | null
          health_info?: string | null
          social_background?: string | null
          skills?: string[] | null
          certifications?: string[] | null
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          status: 'active' | 'completed' | 'upcoming'
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          start_date: string
          end_date: string
          status: 'active' | 'completed' | 'upcoming'
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          start_date?: string
          end_date?: string
          status?: 'active' | 'completed' | 'upcoming'
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          program_id: string
          enrollment_date: string
          status: 'active' | 'completed' | 'dropped'
          progress: number
        }
        Insert: {
          id?: string
          user_id: string
          program_id: string
          enrollment_date: string
          status: 'active' | 'completed' | 'dropped'
          progress?: number
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: string
          enrollment_date?: string
          status?: 'active' | 'completed' | 'dropped'
          progress?: number
        }
      }
      attendance: {
        Row: {
          id: string
          user_id: string
          program_id: string
          date: string
          status: 'present' | 'absent' | 'late'
        }
        Insert: {
          id?: string
          user_id: string
          program_id: string
          date: string
          status: 'present' | 'absent' | 'late'
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: string
          date?: string
          status?: 'present' | 'absent' | 'late'
        }
      }
      progress: {
        Row: {
          id: string
          user_id: string
          program_id: string
          milestone: string
          completion_date: string
          notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          program_id: string
          milestone: string
          completion_date: string
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          program_id?: string
          milestone?: string
          completion_date?: string
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}