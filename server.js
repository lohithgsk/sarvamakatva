import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './mongodb.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Fetch all students
app.get('/api/students', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const students = await db.collection('Student').find().toArray();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new student
app.post('/api/students', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const newStudent = req.body;
    const result = await db.collection('students').insertOne(newStudent);
    res.status(201).json({ ...newStudent, _id: result.insertedId });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Fetch teaching staff
app.get('/api/employees/teaching', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const teachingStaff = await db.collection('Teaching').find().toArray();
    res.json(teachingStaff);
  } catch (error) {
    console.error('Error fetching teaching staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch administrative staff
app.get('/api/employees/administrative', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const adminStaff = await db.collection('Administrative').find().toArray();
    res.json(adminStaff);
  } catch (error) {
    console.error('Error fetching administrative staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new employee (teaching or administrative)
app.post('/api/employees/:type', async (req, res) => {
  const { type } = req.params;
  const employeeData = req.body;

  if (type !== 'teaching' && type !== 'administrative') {
    return res.status(400).json({ error: 'Invalid employee type' });
  }

  try {
    const result = await db.collection('employees').insertOne({ ...employeeData, type });
    res.status(201).json({ ...employeeData, _id: result.insertedId });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch teaching staff
app.get('/api/employees/teaching', async (req, res) => {
    try {
      const teachingStaff = await db.collection('employees').find({ type: 'teaching' }).toArray();
      res.json(teachingStaff);
    } catch (error) {
      console.error('Error fetching teaching staff:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Fetch administrative staff
  app.get('/api/employees/administrative', async (req, res) => {
    try {
      const adminStaff = await db.collection('employees').find({ type: 'administrative' }).toArray();
      res.json(adminStaff);
    } catch (error) {
      console.error('Error fetching administrative staff:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Add a new employee (teaching or administrative)
  app.post('/api/employees/:type', async (req, res) => {
    const { type } = req.params;
    const employeeData = req.body;
  
    if (type !== 'teaching' && type !== 'administrative') {
      return res.status(400).json({ error: 'Invalid employee type' });
    }
  
    try {
      const result = await db.collection('employees').insertOne({ ...employeeData, type });
      res.status(201).json({ ...employeeData, _id: result.insertedId });
    } catch (error) {
      console.error('Error adding employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

