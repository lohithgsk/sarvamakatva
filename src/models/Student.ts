import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  primaryDiagnosis: { type: String, required: true },
  comorbidity: { type: String },
  udid: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, unique: true },
  enrollmentYear: { type: String, required: true },
  status: { type: String, required: true, default: 'Active' },
  email: { type: String },
  program: { type: String, required: true },
  sessionsCount: { type: Number, default: 0 },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  allergies: { type: String },
  contactNumber: { type: String, required: true },
  parentsEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'student' // Specify the collection name
});

export default StudentSchema