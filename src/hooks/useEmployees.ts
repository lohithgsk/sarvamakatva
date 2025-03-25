import { useState, useEffect } from 'react';

export function useEmployees() {
  const [employees, setEmployees] = useState<{
    teaching: any[];
    administrative: any[];
  }>({
    teaching: [],
    administrative: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employees from MongoDB
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // Fetch teaching staff
      const teachingResponse = await fetch('http://localhost:5000/api/employees/teaching');
      if (!teachingResponse.ok) {
        throw new Error('Failed to fetch teaching staff');
      }
      const teachingData = await teachingResponse.json();

      // Fetch administrative staff
      const adminResponse = await fetch('http://localhost:5000/api/employees/administrative');
      if (!adminResponse.ok) {
        throw new Error('Failed to fetch administrative staff');
      }
      const adminData = await adminResponse.json();

      setEmployees({
        teaching: teachingData,
        administrative: adminData
      });
      setError(null);
    } catch (err: any) {
      console.error('Error fetching employees:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new employee to MongoDB
  const addEmployee = async (employeeData: any, type: 'teaching' | 'administrative') => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add ${type} employee`);
      }

      const newEmployee = await response.json();
      setEmployees({
        ...employees,
        [type]: [...employees[type], newEmployee]
      });
      return { success: true };
    } catch (err: any) {
      console.error('Error adding employee:', err);
      return { success: false, error: err.message };
    }
  };

  // Refresh employees data
  const refreshEmployees = () => {
    fetchEmployees();
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, loading, error, addEmployee, refreshEmployees };
}