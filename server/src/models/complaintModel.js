// complaintModel.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservation', // Reference to the Tenant model (if you have one)
    //required: true,
  },

  hostID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:false
  },

  technician:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Technician',
    required:false
  },
  proofImages: [{ type: String }],


  category: {
    type: String,
    required: true,
  },
  propertyName:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images : [{ type : String }],
  status: {
    type: String,
    enum: ['pendingHostDecision', 'pendingTechnicianApproval','active','technicianCompleted', 'jobCompleted'],
    default: 'pendingHostDecision',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('complaint', complaintSchema);
