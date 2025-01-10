import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tasks: [
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"], 
        default: "Pending",
      },
    },
  ],
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);

export default Staff;
