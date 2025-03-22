import React from 'react';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  UserCheck,
  TrendingUp
} from 'lucide-react';
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
  Legend
} from 'recharts';

const mockData = {
  stats: {
    totalBeneficiaries: 245,
    activePrograms: 12,
    completionRate: 87,
    activeVolunteers: 45
  },
  monthlyProgress: [
    { month: 'Jan', enrollments: 45, completions: 32 },
    { month: 'Feb', enrollments: 52, completions: 41 },
    { month: 'Mar', enrollments: 61, completions: 45 },
    { month: 'Apr', enrollments: 48, completions: 38 },
    { month: 'May', enrollments: 55, completions: 48 },
    { month: 'Jun', enrollments: 67, completions: 52 }
  ],
  programSuccess: [
    { name: 'Digital Skills', success: 92 },
    { name: 'Job Training', success: 88 },
    { name: 'Life Skills', success: 95 },
    { name: 'Language', success: 85 },
    { name: 'Vocational', success: 90 }
  ]
};

const StatCard = ({ title, value, icon: Icon, color }: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} bg-opacity-10 mr-4`}>
        <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  </div>
);

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your organization's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Beneficiaries"
          value={mockData.stats.totalBeneficiaries}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Programs"
          value={mockData.stats.activePrograms}
          icon={BookOpen}
          color="bg-green-500"
        />
        <StatCard
          title="Completion Rate"
          value={`${mockData.stats.completionRate}%`}
          icon={GraduationCap}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Volunteers"
          value={mockData.stats.activeVolunteers}
          icon={UserCheck}
          color="bg-orange-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="enrollments" 
                  stroke="#4F46E5" 
                  name="Enrollments"
                />
                <Line 
                  type="monotone" 
                  dataKey="completions" 
                  stroke="#10B981" 
                  name="Completions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Program Success Rates */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Success Rates</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.programSuccess}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="success" 
                  fill="#4F46E5" 
                  name="Success Rate (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { icon: UserCheck, color: 'text-green-500', text: 'New volunteer joined: Sarah Parker' },
              { icon: BookOpen, color: 'text-blue-500', text: 'Digital Skills program started' },
              { icon: GraduationCap, color: 'text-purple-500', text: '15 students completed Job Training' },
              { icon: TrendingUp, color: 'text-orange-500', text: 'Monthly progress report generated' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center">
                <activity.icon className={`h-5 w-5 ${activity.color} mr-3`} />
                <p className="text-gray-600">{activity.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}