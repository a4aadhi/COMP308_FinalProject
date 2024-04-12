const mongoose = require("mongoose");


const formSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique:true,
    required: true,
  },
  bodyTemp: {
    type: String,
    required: true,
  },
  heartRate: {
    type: String,
    required: true,
  },
  bloodPress: {
    type: String,
    required: true,
  },
  respRate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Form", formSchema);