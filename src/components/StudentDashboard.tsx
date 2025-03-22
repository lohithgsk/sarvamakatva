import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  Calendar,
  Clock,
  Award,
  BookOpen,
  Activity,
  Users,
  FileText,
  ArrowLeft,
} from 'lucide-react';

interface StudentDashboardProps {
  student: any;
  onBack: () => void;
}

const mockAttendance = [
  { month: 'Jan', present: 22, absent: 3 },
  { month: 'Feb', present: 20, absent: 2 },
  { month: 'Mar', present: 21, absent: 4 },
];

const mockProgress = [
  { week: 'Week 1', score: 75 },
  { week: 'Week 2', score: 82 },
  { week: 'Week 3', score: 78 },
  { week: 'Week 4', score: 85 },
];

export function StudentDashboard({ student, onBack }: StudentDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Students
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start space-x-6">
          <img
            src={student.photo}
            alt={`${student.firstName} ${student.lastName}`}
            className="h-24 w-24 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {student.firstName} {student.lastName}
            </h2>
            <p className="text-gray-500">Student ID: {student.studentId}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Primary Diagnosis</p>
                <p className="font-medium">{student.primaryDiagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Program</p>
                <p className="font-medium">{student.program}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              student.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {student.status}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-10 w-10 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Attendance Rate</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-10 w-10 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Sessions Completed</p>
              <p className="text-2xl font-bold">{student.sessionsCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Award className="h-10 w-10 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Current Level</p>
              <p className="text-2xl font-bold">Level 3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Activity className="h-10 w-10 text-red-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Progress</p>
              <p className="text-2xl font-bold">75%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Attendance History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10B981" name="Present" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Progress Tracking</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Father's Name</p>
                <p className="font-medium">{student.fatherName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mother's Name</p>
                <p className="font-medium">{student.motherName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium">{student.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{student.dob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{student.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{student.parentsEmail}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Program Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Current Program</p>
              <p className="font-medium">{student.program}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Enrollment Year</p>
              <p className="font-medium">{student.enrollmentYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">UDID Number</p>
              <p className="font-medium">{student.udid}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Primary Diagnosis</p>
              <p className="font-medium">{student.primaryDiagnosis}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Comorbidity</p>
              <p className="font-medium">{student.comorbidity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}