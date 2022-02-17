const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
  getOneUser,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/allusers',protect, getUsers)
router.delete('/allusers/:id',protect, deleteUser)
router.get('/allusers/:id',protect, getOneUser)

module.exports = router
