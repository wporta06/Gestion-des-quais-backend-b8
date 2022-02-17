const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    organisation: {
      type: String,
    },
    // admin, user, fournisseur, prestataire, directeurDePort, directeurDequais, containerOwner, truckDriver
    role: {
      type: String,
      default: 'user'
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
