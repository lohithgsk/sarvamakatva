import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import IndividualReports from './reports/IndividualReports';
import ProgramReports from './reports/ProgramReports';
import OrganizationalReports from './reports/OrganizationalReports';
import ReportFilter from './reports/ReportFilter';
import './styles/Reports.css';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('individual');
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    endDate: new Date(),
    stakeholderType: 'all',
    programType: 'all'
  });
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Mock data for development - replace with actual API calls later
  const [reportData, setReportData] = useState({
    individualData: [],
    programData: [],
    organizationData: {}
  });

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setReportData({
        individualData: generateMockIndividualData(),
        programData: generateMockProgramData(),
        organizationData: generateMockOrganizationData()
      });
      setLoading(false);
    }, 1000);
  }, [filters]);

  return (
    <div className="reports-container">
      <h2 className="page-title">Reports</h2>
      <p className="page-description">View comprehensive reports on stakeholder progress, program impact, and organizational performance</p>
      
      <Card className="filter-card mb-4">
        <Card.Body>
          <ReportFilter filters={filters} onFilterChange={handleFilterChange} />
        </Card.Body>
      </Card>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Card className="reports-content">
          <Card.Header>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'individual' ? 'active' : ''}`} 
                  onClick={() => handleTabChange('individual')}
                  href="#"
                >
                  Individual Reports
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'program' ? 'active' : ''}`} 
                  onClick={() => handleTabChange('program')}
                  href="#"
                >
                  Program Reports
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeTab === 'organization' ? 'active' : ''}`} 
                  onClick={() => handleTabChange('organization')}
                  href="#"
                >
                  Organizational Reports
                </a>
              </li>
            </ul>
          </Card.Header>
          <Card.Body>
            {activeTab === 'individual' && (
              <IndividualReports data={reportData.individualData} />
            )}
            {activeTab === 'program' && (
              <ProgramReports data={reportData.programData} />
            )}
            {activeTab === 'organization' && (
              <OrganizationalReports data={reportData.organizationData} />
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

// Mock data generator functions
const generateMockIndividualData = () => {
  const stakeholderTypes = ['staff', 'students', 'beneficiaries', 'volunteers'];
  const statuses = ['Active', 'Completed', 'On Hold', 'Graduated'];
  
  return Array.from({ length: 20 }, (_, i) => ({
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
};

const generateMockProgramData = () => {
  return Array.from({ length: 5 }, (_, i) => ({
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
};

const generateMockOrganizationData = () => {
  return {
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
};

export default Reports;