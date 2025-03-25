import { useState, useEffect } from 'react';

export function useStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch students from MongoDB
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/students');
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching students:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new student to MongoDB
  const addStudent = async (studentData: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const newStudent = await response.json();
      setStudents([...students, newStudent]);
      return { success: true };
    } catch (err: any) {
      console.error('Error adding student:', err);
      return { success: false, error: err.message };
    }
  };

  // Refresh students data
  const refreshStudents = () => {
    fetchStudents();
  };

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, error, addStudent, refreshStudents };
}