import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Search,
  ChevronRight,
  X,
  Plus
} from 'lucide-react';
import { StudentDashboard } from '../components/StudentDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { StudentRegistration } from '../components/StudentRegistration';

// Mock data for students
const mockStudents = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    photo: 'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=64&h=64&fit=crop',
    gender: 'Male',
    dob: '2015-03-15',
    primaryDiagnosis: 'Autism Spectrum Disorder',
    comorbidity: 'ADHD',
    udid: 'UD2024001',
    studentId: 'ST2024001',
    enrollmentYear: '2024',
    status: 'Active',
    email: 'john.doe@example.com',
    program: 'Early Intervention',
    sessionsCount: 24,
    // Additional details
    fatherName: 'Robert Doe',
    motherName: 'Sarah Doe',
    bloodGroup: 'O+',
    allergies: 'None',
    contactNumber: '+91 9876543210',
    parentsEmail: 'parents.doe@example.com'
  },
  // Add more mock students here
];

// Mock data for employees
const mockEmployees = {
  teaching: [
    {
      id: '1',
      firstName: 'Alice',
      lastName: 'Smith',
      employeeId: 'EMP2024001',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
      designation: 'Special Educator',
      program: 'Early Intervention',
      email: 'alice.smith@example.com',
      phone: '+91 9876543211',
      dob: '1990-05-15',
      doj: '2024-01-15',
      workLocation: 'Main Center',
      aadharNumber: '1234 5678 9012'
    },
    // Add more teaching staff
  ],
  administrative: [
    {
      id: '1',
      firstName: 'David',
      lastName: 'Wilson',
      employeeId: 'ADM2024001',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
      designation: 'Administrative Officer',
      program: 'Administration',
      email: 'david.wilson@example.com',
      phone: '+91 9876543212',
      dob: '1985-08-20',
      doj: '2023-12-01',
      workLocation: 'Main Center',
      aadharNumber: '9876 5432 1098'
    },
    // Add more administrative staff
  ]
};

const StudentsSection = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  const filteredStudents = mockStudents.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegistrationSubmit = (data: any) => {
    console.log('New student data:', data);
    setShowRegistration(false);
    // Here you would typically send this data to your backend
  };

  if (selectedStudent) {
    return (
      <StudentDashboard
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowRegistration(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={student.photo}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {student.firstName} {student.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{student.studentId}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{student.primaryDiagnosis}</div>
                  <div className="text-sm text-gray-500">UDID: {student.udid}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.program}</div>
                  <div className="text-sm text-gray-500">{student.sessionsCount} sessions</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showRegistration && (
        <StudentRegistration
          onClose={() => setShowRegistration(false)}
          onSubmit={handleRegistrationSubmit}
        />
      )}
    </div>
  );
};

const EmployeesSection = () => {
  const [activeTab, setActiveTab] = useState<'teaching' | 'administrative'>('teaching');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const filteredEmployees = mockEmployees[activeTab].filter(employee =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedEmployee) {
    return (
      <EmployeeDashboard
        employee={selectedEmployee}
        onBack={() => setSelectedEmployee(null)}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'teaching'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('teaching')}
            >
              Teaching Staff
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'administrative'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('administrative')}
            >
              Administrative Staff
            </button>
          </div>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={employee.photo}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{employee.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.designation}</div>
                  <div className="text-sm text-gray-500">DOJ: {employee.doj}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.email}</div>
                  <div className="text-sm text-gray-500">{employee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.workLocation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.program}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedEmployee(employee)}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center"
                  >
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export function Stakeholders() {
  const [activeSection, setActiveSection] = useState<'students' | 'employees'>('students');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Stakeholders</h1>
        <div className="flex space-x-4">
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'students'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveSection('students')}
          >
            <GraduationCap className="h-5 w-5 mr-2" />
            Students
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeSection === 'employees'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveSection('employees')}
          >
            <Users className="h-5 w-5 mr-2" />
            Employees
          </button>
        </div>
      </div>

      {activeSection === 'students' ? <StudentsSection /> : <EmployeesSection />}
    </div>
  );
}