const mongoose = require('mongoose')

const driversSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, 'Please add driver name value'],
      
    },
    age: {
      type: String,
      required: [true, 'Please add a driver age value'],
      
    },
    driverLicensindex: {
      type: String,
      required: [true, 'Please add a driver Licens index value'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      default: 'driver',
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Driver', driversSchema)
