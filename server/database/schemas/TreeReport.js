const mongoose = require('mongoose');

const { Schema } = mongoose;

const treeReportSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  location: { type: String },
  height: { type: Number },
  diameter: { type: Number },
  leaves: { type: String },
  flowers: { type: String },
  fruits: { type: String },
  generalStatus: { type: Number },
  description: { type: String },
  pic: { type: String },
  created_at: { type: Date, default: Date.now, immutable: true },
  updated_at: { type: Date },
}, { versionKey: false });

const TreeReport = mongoose.model('TreeReport', treeReportSchema);

module.exports = TreeReport;
