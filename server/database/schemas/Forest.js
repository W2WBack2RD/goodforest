const mongoose = require('mongoose');
const { Schema } = mongoose;

const forestSchema = new Schema({
    forest_name: { type: String, lowercase: true, required: true, unique: true, immutable: true },
    planting_date: { type: Date, default: Date.now, required: true },
    city: { type: String, required: true },
    person_in_charge: { type: String },
    person_in_charge_phone: { type: String },
    planted_trees: { type: Number },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date },
}, { versionKey: false });


const Forest = mongoose.model('Forest', forestSchema);

module.exports = Forest;
