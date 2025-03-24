import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReportFilter = ({ filters, onFilterChange }) => {
  const handleStartDateChange = (date) => {
    onFilterChange({ startDate: date });
  };

  const handleEndDateChange = (date) => {
    onFilterChange({ endDate: date });
  };

  const handleStakeholderTypeChange = (e) => {
    onFilterChange({ stakeholderType: e.target.value });
  };

  const handleProgramTypeChange = (e) => {
    onFilterChange({ programType: e.target.value });
  };

  const handleReset = () => {
    onFilterChange({
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(),
      stakeholderType: 'all',
      programType: 'all'
    });
  };

  return (
    <div className="report-filter">
      <h5>Filter Reports</h5>
      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <DatePicker
              selected={filters.startDate}
              onChange={handleStartDateChange}
              className="form-control"
              dateFormat="MM/dd/yyyy"
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <DatePicker
              selected={filters.endDate}
              onChange={handleEndDateChange}
              className="form-control"
              dateFormat="MM/dd/yyyy"
              minDate={filters.startDate}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Stakeholder Type</Form.Label>
            <Form.Select 
              value={filters.stakeholderType}
              onChange={handleStakeholderTypeChange}
            >
              <option value="all">All Stakeholders</option>
              <option value="staff">Staff</option>
              <option value="students">Students</option>
              <option value="beneficiaries">Beneficiaries</option>
              <option value="volunteers">Volunteers</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Program</Form.Label>
            <Form.Select 
              value={filters.programType}
              onChange={handleProgramTypeChange}
            >
              <option value="all">All Programs</option>
              <option value="training">Training Programs</option>
              <option value="employment">Employment Programs</option>
              <option value="support">Support Programs</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="text-end">
          <Button variant="outline-secondary" onClick={handleReset} className="me-2">
            Reset Filters
          </Button>
          <Button variant="primary">
            Apply Filters
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ReportFilter;