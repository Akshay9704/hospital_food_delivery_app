import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
  },
  diseases: {
    type: String,
  },
  allergies: {
    type: String,
  },
  patientAge: {
    type: Number,
  },
  roomNumber: {
    type: Number,
  },
  bedNumber: {
    type: Number,
  },
  floorNumber: {
    type: Number,
  },
  patientGender: {
    type: String,
  },
  contact: {
    type: String,
  },
  EmergencyContactName: {
    type: String,
  },
  EmergencyContactNumber: {
    type: String,
  },
  EmergencyContactRelation: {
    type: String,
  },
  DietChartMorningMeal: {
    type: String,
  },
  DietChartMorningIngredients: {
    type:  String,
  },
  DietChartMorningInstructions: {
    type: String,
  },
  DietChartEveningMeal: {
    type: String,
  },
  DietChartEveningIngredients: {
    type: String,
  },
  DietChartEveningInstructions: {
    type: String,
  },
  DietChartNightMeal: {
    type: String,
  },
  DietChartNightIngredients: {
    type: String,
  },
  DietChartNightInstructions: {
    type: String,
  },
  assignedStaff: {
    type: String,
  },
  deliveryPerson: {
    type: String,
  },
  deliveryStatus: {
    type: String,
  },
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);

export default Patient;
