// src/services/reportService.js
import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Fetch report data based on provided filters
 * @param {Object} filters - Filter criteria for reports
 * @returns {Promise<Object>} - Report data
 */
export const fetchReportData = async (filters) => {
  try {
    // In a real application, you would send these filters to your backend
    const response = await axios.get(`${API_BASE_URL}/reports`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching report data:', error);
    
    // For development/demo purposes, return mock data if API fails
    return generateMockData(filters);
  }
};

/**
 * Generate mock data for development/demo purposes
 * @param {Object} filters - Filter criteria
 * @returns {Object} - Mock report data
 */
const generateMockData = (filters) => {
  // Generate stakeholder data
  const stakeholderTypes = ['staff', 'students', 'beneficiaries', 'volunteers'];
  const statuses = ['Active', 'Completed', 'On Hold', 'Graduated'];
  
  const individualData = Array.from({ length: 20 }, (_, i) => ({
    id: `stk-${i + 1}`,
    name: `Stakeholder ${i + 1}`,
    type: stakeholderTypes[Math.floor(Math.random() * stakeholderTypes.length)],
    progress: Math.floor(Math.random() * 100),
    lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    enrollmentDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    progressData: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
    participationData: Array.from({ length: 5 }, () => Math.floor(Math.random() * 30)),
    programsEnrolled: Math.floor(Math.random() * 5) + 1,
    programsCompleted: Math.floor(Math.random() * 3),
    attendanceRate: `${Math.floor(Math.random() * 30) + 70}%`
  }));

  // Generate program data
  const programData = Array.from({ length: 5 }, (_, i) => ({
    id: `prg-${i + 1}`,
    name: `Program ${i + 1}`,
    totalEnrollments: Math.floor(Math.random() * 100) + 50,
    completionRate: Math.floor(Math.random() * 30) + 70,
    averageProgress: Math.floor(Math.random() * 30) + 70,
    stakeholderBreakdown: {
      staff: Math.floor(Math.random() * 20),
      students: Math.floor(Math.random() * 50) + 20,
      beneficiaries: Math.floor(Math.random() * 40) + 10,
      volunteers: Math.floor(Math.random() * 15)
    },
    monthlyEnrollments: Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 5)
  }));

  // Generate organization data
  const organizationData = {
    totalStakeholders: 450,
    activeStakeholders: 380,
    stakeholderBreakdown: {
      staff: 45,
      students: 220,
      beneficiaries: 150,
      volunteers: 35
    },
    programBreakdown: {
      training: 35,
      employment: 25,
      support: 40
    },
    monthlyEngagement: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 300),
    successRate: 78.5
  };

  return {
    individualData,
    programData,
    organizationData
  };
};

/**
 * Export report data to CSV format
 * @param {Object} data - Report data
 * @returns {string} - CSV content
 */
export const exportToCsv = (data) => {
  // Implement CSV export logic
  return 'csv data';
};

/**
 * Export report data to PDF format
 * @param {Object} data - Report data
 * @returns {Blob} - PDF blob
 */
export const exportToPdf = async (data) => {
  // Implement PDF export logic using a library like jsPDF
  return new Blob(['pdf data'], { type: 'application/pdf' });
};