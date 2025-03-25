import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Search,
  ChevronRight,
  Plus,
  Loader
} from 'lucide-react';
import { StudentDashboard } from '../components/StudentDashboard';
import { EmployeeDashboard } from '../components/EmployeeDashboard';
import { StudentRegistration } from '../components/StudentRegistration';
import { useStudents } from '../hooks/useStudents';
import { useEmployees } from '../hooks/useEmployees';

const StudentsSection = () => {
  const { students, loading, error, addStudent, refreshStudents } = useStudents();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);

  // Helper function to safely access nested properties
  const safeGet = (obj: any, path: string, defaultValue: any = '') => {
    const keys = path.split('.');
    return keys.reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : defaultValue;
    }, obj);
  };

  const filteredStudents = students.filter(student => 
    safeGet(student, 'firstName', '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    safeGet(student, 'lastName', '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    safeGet(student, 'studentId', '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateObj: any) => {
    if (!dateObj) return '';
    if (dateObj.$date && dateObj.$date.$numberLong) {
      return new Date(parseInt(dateObj.$date.$numberLong)).toLocaleDateString();
    }
    return typeof dateObj === 'string' ? dateObj : '';
  };

  const getNumericValue = (numObj: any, defaultValue = 0) => {
    if (numObj === undefined || numObj === null) return defaultValue;
    if (numObj.$numberInt) return parseInt(numObj.$numberInt);
    return typeof numObj === 'number' ? numObj : defaultValue;
  };

  const handleRegistrationSubmit = async (data: any) => {
    const result = await addStudent(data);
    if (result.success) {
      setShowRegistration(false);
      refreshStudents();
    } else {
      console.error('Failed to add student:', result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-2 text-lg">Loading students...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-medium">Error loading students</p>
        <p className="text-sm">{error}</p>
        <button 
          onClick={refreshStudents}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

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
        {filteredStudents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {searchTerm ? 'No students match your search' : 'No students found. Add your first student!'}
          </div>
        ) : (
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
                      src={student.photo || '/placeholder-avatar.png'}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="h-10 w-10 rounded-full object-cover"
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
                    <div className="text-sm text-gray-500">
                      {getNumericValue(student.sessionsCount)} sessions
                    </div>
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
        )}
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
  const { employees, loading, error, addEmployee, refreshEmployees } = useEmployees();
  const [activeTab, setActiveTab] = useState<'teaching' | 'administrative'>('teaching');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const filteredEmployees = employees[activeTab]?.filter(employee =>
    employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-2 text-lg">Loading employees...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-medium">Error loading employees</p>
        <p className="text-sm">{error}</p>
        <button 
          onClick={refreshEmployees}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

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
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {searchTerm ? 'No employees match your search' : 'No employees found in this category.'}
          </div>
        ) : (
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
                          src={employee.photo || '/placeholder-avatar.png'}
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
        )}
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