import React, { useState } from 'react';
import { Row, Col, Card, Table, Form, Button, Modal } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IndividualReports = ({ data = [] }) => {
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleStakeholderSelect = (stakeholderId) => {
    const stakeholder = data.find(s => s.id === stakeholderId);
    setSelectedStakeholder(stakeholder);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
  };

  // Progress chart configuration
  const progressChartData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
      {
        label: 'Progress Score',
        data: selectedStakeholder?.progressData || [65, 70, 75, 82, 85, 90],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Program participation chart configuration
  const participationChartData = {
    labels: ['Training', 'Workshops', 'Mentoring', 'Job Placement', 'Support Services'],
    datasets: [
      {
        label: 'Participation Hours',
        data: selectedStakeholder?.participationData || [24, 18, 12, 8, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Calculate summary statistics
  const calculateSummaryStats = () => {
    if (!data || data.length === 0) return { avgProgress: 0, completionRate: 0, employmentRate: 0, attendanceRate: 0 };
    
    const avgProgress = data.reduce((sum, item) => sum + item.progress, 0) / data.length;
    const completedPrograms = data.reduce((sum, item) => sum + (item.programsCompleted || 0), 0);
    const totalPrograms = data.reduce((sum, item) => sum + (item.programsEnrolled || 0), 0);
    const completionRate = totalPrograms ? (completedPrograms / totalPrograms) * 100 : 0;
    
    // Mock employment rate for demo
    const employmentRate = 75;
    
    // Average attendance rate
    const attendanceRate = 92;
    
    return {
      avgProgress: Math.round(avgProgress),
      completionRate: Math.round(completionRate),
      employmentRate,
      attendanceRate
    };
  };

  const summaryStats = calculateSummaryStats();

  return (
    <div className="individual-reports">
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Stakeholder Overview</Card.Title>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Select 
                  className="w-50"
                  onChange={(e) => e.target.value && handleStakeholderSelect(e.target.value)}
                >
                  <option value="">Select a stakeholder</option>
                  {data.map(stakeholder => (
                    <option key={stakeholder.id} value={stakeholder.id}>
                      {stakeholder.name} - {stakeholder.type}
                    </option>
                  ))}
                </Form.Select>
                <div>
                  <span className="text-muted me-2">Total Stakeholders:</span>
                  <span className="fw-bold">{data.length}</span>
                </div>
              </div>
              <Table striped bordered hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Progress</th>
                    <th>Last Activity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 5).map(stakeholder => (
                    <tr key={stakeholder.id}>
                      <td>{stakeholder.name}</td>
                      <td>{stakeholder.type}</td>
                      <td>
                        <div className="progress">
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{ width: `${stakeholder.progress}%` }} 
                            aria-valuenow={stakeholder.progress} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          >
                            {stakeholder.progress}%
                          </div>
                        </div>
                      </td>
                      <td>{stakeholder.lastActivity}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleStakeholderSelect(stakeholder.id)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Stakeholder Progress Summary</Card.Title>
              <Row>
                <Col md={6} className="mb-3">
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h3>{summaryStats.avgProgress}%</h3>
                      <p className="text-muted mb-0">Average Progress</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-3">
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h3>{summaryStats.completionRate}%</h3>
                      <p className="text-muted mb-0">Program Completion Rate</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-3">
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h3>{summaryStats.employmentRate}%</h3>
                      <p className="text-muted mb-0">Employment Rate</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-3">
                  <Card className="text-center h-100">
                    <Card.Body>
                      <h3>{summaryStats.attendanceRate}%</h3>
                      <p className="text-muted mb-0">Attendance Rate</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stakeholder Detail Modal */}
      <Modal 
        show={showDetailModal} 
        onHide={handleCloseModal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedStakeholder?.name} - Detailed Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStakeholder && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Personal Information</h5>
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{selectedStakeholder.name}</td>
                      </tr>
                      <tr>
                        <td>Type</td>
                        <td>{selectedStakeholder.type}</td>
                      </tr>
                      <tr>
                        <td>Enrollment Date</td>
                        <td>{selectedStakeholder.enrollmentDate}</td>
                      </tr>
                      <tr>
                        <td>Current Status</td>
                        <td>
                          <span className="badge bg-success">
                            {selectedStakeholder.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h5>Progress Overview</h5>
                  <div className="progress mb-3" style={{ height: '25px' }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${selectedStakeholder.progress}%` }} 
                      aria-valuenow={selectedStakeholder.progress} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    >
                      {selectedStakeholder.progress}% Complete
                    </div>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Programs Enrolled
                      <span className="badge bg-primary rounded-pill">
                        {selectedStakeholder.programsEnrolled || 3}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Programs Completed
                      <span className="badge bg-success rounded-pill">
                        {selectedStakeholder.programsCompleted || 2}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Attendance Rate
                      <span className="badge bg-info rounded-pill">
                        {selectedStakeholder.attendanceRate || '90%'}
                      </span>
                    </li>
                  </ul>
                </Col>
              </Row>
              
              <Row className="mb-4">
                <Col>
                  <h5>Progress History</h5>
                  <div style={{ height: '250px' }}>
                    <Line data={progressChartData} options={{ maintainAspectRatio: false }} />
                  </div>
                </Col>
              </Row>
              
              <Row>
                <Col>
                  <h5>Program Participation</h5>
                  <div style={{ height: '250px' }}>
                    <Bar data={participationChartData} options={{ maintainAspectRatio: false }} />
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => console.log('Export report for', selectedStakeholder?.name)}>
            Export Report
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IndividualReports;