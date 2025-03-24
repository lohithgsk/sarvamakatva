import React from 'react';
import { Row, Col, Card, Table, Form } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';

const ProgramReports = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-4">No program data available</div>;
  }

  // Prepare data for enrollment trend chart
  const enrollmentTrendData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: data.slice(0, 3).map((program, index) => ({
      label: program.name,
      data: program.monthlyEnrollments,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)'
      ][index],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ][index],
      borderWidth: 1
    }))
  };

  // Prepare data for overall program completion rates
  const completionRateData = {
    labels: data.map(program => program.name),
    datasets: [{
      label: 'Completion Rate (%)',
      data: data.map(program => program.completionRate),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)'
      ],
      borderWidth: 1
    }]
  };

  // Stakeholder distribution for first program
  const firstProgramStakeholders = data[0]?.stakeholderBreakdown || {
    staff: 10,
    students: 30,
    beneficiaries: 20,
    volunteers: 5
  };

  const stakeholderDistributionData = {
    labels: ['Staff', 'Students', 'Beneficiaries', 'Volunteers'],
    datasets: [{
      label: 'Stakeholder Distribution',
      data: [
        firstProgramStakeholders.staff,
        firstProgramStakeholders.students,
        firstProgramStakeholders.beneficiaries,
        firstProgramStakeholders.volunteers
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="program-reports">
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Program Filter</Form.Label>
            <Form.Select>
              <option value="all">All Programs</option>
              {data.map(program => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Program Overview</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Program Name</th>
                    <th>Total Enrollments</th>
                    <th>Completion Rate</th>
                    <th>Average Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(program => (
                    <tr key={program.id}>
                      <td>{program.name}</td>
                      <td>{program.totalEnrollments}</td>
                      <td>
                        <div className="progress">
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{ width: `${program.completionRate}%` }} 
                            aria-valuenow={program.completionRate} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          >
                            {program.completionRate}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="progress">
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{ width: `${program.averageProgress}%` }} 
                            aria-valuenow={program.averageProgress} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          >
                            {program.averageProgress}%
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={7}>
          <Card>
            <Card.Body>
              <Card.Title>Enrollment Trends</Card.Title>
              <div style={{ height: '300px' }}>
                <Bar 
                  data={enrollmentTrendData} 
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
        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title>Stakeholder Distribution</Card.Title>
              <div style={{ height: '300px' }}>
                <Pie 
                  data={stakeholderDistributionData} 
                  options={{ maintainAspectRatio: false }} 
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProgramReports;