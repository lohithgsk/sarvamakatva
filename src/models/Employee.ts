import mongoose from 'mongoose';

// Schema for teaching staff
const TeachingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  designation: { type: String, required: true },
  program: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  doj: { type: Date, required: true },
  workLocation: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'teaching'
});

// Schema for administrative staff
const AdministrativeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  designation: { type: String, required: true },
  program: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  doj: { type: Date, required: true },
  workLocation: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  collection: 'administrative'
});

export const TeachingStaff = mongoose.models.TeachingStaff || mongoose.model('TeachingStaff', TeachingSchema);
export const AdministrativeStaff = mongoose.models.AdministrativeStaff || mongoose.model('AdministrativeStaff', AdministrativeSchema);