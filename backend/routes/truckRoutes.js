const express = require('express')
const router = express.Router()
const {
  getTrucks,
  addTruck,
  updateTruck,
  deleteTruck,
  getOneTruck
} = require('../controllers/truckController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTrucks).post(protect, addTruck)
router.route('/:id').get(protect, getOneTruck).delete(protect, deleteTruck).put(protect, updateTruck)

//// oldway 
// router.get('/', getTrucks)
// router.post('/', addTruck)
// router.put('/:id', updateTruck)
// router.delete('/:id', deleteTruck)

module.exports = router
