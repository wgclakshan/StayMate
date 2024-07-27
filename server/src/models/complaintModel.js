// complaintModel.js
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservation', // Reference to the reservation model
    required: true,
  },

/*   hostId:{
    type:String,
    required:true
  }, */

  technician:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'technician',
    required:false
  },

  category: {
    type: String,
    required: true,
  },
/*   propertyName:{
    type: String,
    //required: true,
  }, */
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
