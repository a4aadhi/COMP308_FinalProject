const mongoose = require("mongoose");

const covidSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  feverChills: {
    type: Boolean,
    required: false,
  },
  breathingDifficulty: {
    type: Boolean,
    required: false,
  },
  cough: {
    type: Boolean,
    required: false,
  },
  fatigue: {
    type: Boolean,
    required: false,
  },
  aches: {
    type: Boolean,
    required: false,
  },
  headaches: {
    type: Boolean,
    required: false,
  },
  tasteSmell: {
    type: Boolean,
    required: false,
  },
  soreThroat: {
    type: Boolean,
    required: false,
  },
  congestion: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Covid", covidSchema);
