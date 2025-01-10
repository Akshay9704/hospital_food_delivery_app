import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  mealBox: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  deliveryPerson: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered", "Failed"],
    default: "Pending",
  },
  deliveryTimestamp: {
    type: Date,
    default: null, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Delivery =
  mongoose.models.Delivery || mongoose.model("Delivery", deliverySchema);

export default Delivery;
