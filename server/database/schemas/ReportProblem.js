const mongoose = require("mongoose");

const { Schema } = mongoose;

const problemReportSchema = new Schema(
  {
    // user: { type: Schema.ObjectId, ref: 'User', required: true },
    forest: { type: String },
    subject: { type: String },
    description: { type: String },
    created_at: { type: Date, default: Date.now, immutable: true },
  },
  { versionKey: false }
);

const ReportProblem = mongoose.model("ReportProblem", problemReportSchema);

module.exports = ReportProblem;
