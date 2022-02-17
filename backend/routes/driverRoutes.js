const express = require('express')
const router = express.Router()
const {
  registerDriver,
  loginDriver,
  getAllDrivers,
  getOneDriver,
  deleteDriver,
  updateTruckDriver
} = require('../controllers/driverController')

const { protect } = require('../middleware/authMiddleware')

// no need to be admin
router.post('/register', registerDriver)
router.post('/login', loginDriver)

// need to be an admin
router.get('/alldrivers',protect, getAllDrivers)
router.get('/alldrivers/:id',protect, getOneDriver)
router.delete('/alldrivers/:id',protect, deleteDriver)
router.put('/alldrivers/:id',protect, updateTruckDriver)

module.exports = router
