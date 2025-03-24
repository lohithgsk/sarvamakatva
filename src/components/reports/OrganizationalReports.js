import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const OrganizationalReports = ({ data }) => {
  if (!data) return <div>No organizational data available</div>;

  // Monthly engagement chart data
  const monthlyEngagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Engagement',
        data: data.monthlyEngagement,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
      }
    ]
  };

  // Stakeholder breakdown chart data
  const stakeholderBreakdownData = {
    labels: ['Staff', 'Students', 'Beneficiaries', 'Volunteers'],
    datasets: [
      {
        label: 'Stakeholder Distribution',
        data: [
          data.stakeholderBreakdown.staff,
          data.stakeholderBreakdown.students,
          data.stakeholderBreakdown.beneficiaries,
          data.stakeholderBreakdown.volunteers
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Program breakdown chart data
  const programBreakdownData = {
    labels: ['Training', 'Employment', 'Support'],
    datasets: [
      {
        label: 'Program Distribution',
        data: [
          data.programBreakdown.training,
          data.programBreakdown.employment,
          data.programBreakdown.support
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="organizational-reports">
      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Monthly Engagement Trends</Card.Title>
              <div style={{ height: '300px' }}>
                <Line
                  data={monthlyEngagementData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Stakeholder Distribution</Card.Title>
              <div style={{ height: '300px' }}>
                <Pie
                  data={stakeholderBreakdownData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right'
                      }
                    }
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Program Distribution</Card.Title>
              <div style={{ height: '300px' }}>
                <Doughnut
                  data={programBreakdownData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right'
                      }
                    }
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Key Performance Indicators</Card.Title>
              <div className="d-flex flex-column justify-content-center h-100">
                <Row className="mb-3">
                  <Col xs={6}>
                    <div className="text-center">
                      <h3>{data.totalStakeholders}</h3>
                      <p className="text-muted">Total Stakeholders</p>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="text-center">
                      <h3>{data.activeStakeholders}</h3>
                      <p className="text-muted">Active Stakeholders</p>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <div className="text-center">
                      <h3>{`${(data.activeStakeholders / data.totalStakeholders * 100).toFixed(1)}%`}</h3>
                      <p className="text-muted">Engagement Rate</p>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="text-center">
                      <h3>{`${data.successRate}%`}</h3>
                      <p className="text-muted">Success Rate</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrganizationalReports;