const mongoose = require('mongoose')

const truckSchema = mongoose.Schema(
  {
    // belong to some user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    matricul: {
      type: String,
      required: [true, 'Please add a matricul value'],
      
    },
    truckdriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
    },
    status: {
      type: String,
      default: 'Available'
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Truck', truckSchema)
