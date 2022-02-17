const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Driver = require('../models/driversModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerDriver = asyncHandler(async (req, res) => {
  const { name, age, driverLicensindex, password } = req.body

  if (!name || !age || !driverLicensindex || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists using his driverLicensindex
  const driverExists = await Driver.findOne({ driverLicensindex })

  if (driverExists) {
    res.status(400)
    throw new Error('driver already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create driver
  const driver = await Driver.create({
    age,
    name,
    password : hashedPassword,
    driverLicensindex,
  })
  // send back driver data and his generated token
  if (driver) {
    res.status(201).json({
      msg: 'Driver registered in',
      _id: driver.id,
      name: driver.name,
      age: driver.age,
      driverLicensindex: driver.driverLicensindex,
      token: generateToken(driver._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid driver data')
  }
 
})

// @desc    Authenticate a driver
// @route   POST /api/drivers/login
// @access  Public
const loginDriver = asyncHandler(async (req, res) => {
  const { driverLicensindex, password } = req.body

  // Check for driver driverLicensindex
  const driver = await Driver.findOne({ driverLicensindex })

  if (driver && (await bcrypt.compare(password, driver.password))) {
    res.json({
      msg: `Driver ${driver.name} Loged in`,
      _id: driver.id,
      name: driver.name,
      age: driver.age,
      driverLicensindex: driver.driverLicensindex,
      token: generateToken(driver._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})


const getAllDrivers = asyncHandler(async (req, res) => {
  res.status(200).json(req.alldrivers)
  
})

const getOneDriver = asyncHandler(async (req, res) => {
  // get only one driver from id that we recieve from middleware
  console.log(req.params.id)
  const driver = await Driver.findById(req.params.id)

  res.status(200).json(driver)
})

const updateTruckDriver = asyncHandler(async (req, res) => {
  const truckDriver = await Driver.findById(req.params.id)
console.log(truckDriver)
  if (!truckDriver) {
    res.status(400)
    throw new Error('driver not found!!!')
  }

  // Check for user
  if (req.user.role != 'admin') {
    res.status(401)
    throw new Error('Admin needed')
  }

  const updateTruckDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updateTruckDriver)
})

const deleteDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.params.id)

  if (!driver) {
    res.status(400)
    throw new Error('driver not found')
  }

  // Make sure the admin logged in
  if (!req.user.role == 'admin') {
    res.status(401)
    throw new Error('Admin needed')
  }

  await driver.remove()

  res.status(200).json({ id: req.params.id, msg:"driver deleted" })
 
})
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerDriver,
  loginDriver,
  getAllDrivers,
  deleteDriver,
  getOneDriver,
  updateTruckDriver,
}
