const asyncHandler = require('express-async-handler')

const Truck = require('../models/truckModel')
const User = require('../models/userModel')

// @desc    Get Trucks
// @route   GET /api/trucks
// @access  Private to admin
const getTrucks = asyncHandler(async (req, res) => {
  // get only user trucks from id that we recieve from middleware
  const trucks = await Truck.find({ user: req.user.id })
console.log(trucks)
  res.status(200).json(trucks)
})

// get ONE TRUCK
// @access  Private to admin
const getOneTruck = asyncHandler(async (req, res) => {
  if (req.user.role == 'admin') {
    const truck = await Truck.findById(req.params.id)
    res.status(200).json(truck)
  }
  else{
    res.status(401)
    throw new Error('Admin needed')
  }
})


// @desc    Set truck
// @route   POST /api/trucks
// @access  Private to admin
const addTruck = asyncHandler(async (req, res) => {
  // check matricul input exist first
  if (!req.body.matricul) {
    res.status(400)
    throw new Error('Please add a matricul field')
  }
  
  const trucks = await Truck.find({ matricul: req.body.matricul })
  // check if matricul not exist in DB first
  if(trucks.length != 0){
    console.log('exist')
    res.status(401)
    throw new Error('TRUCK Matricul Already Exist')
  }
  // Make sure the admin logged in
  if (req.user.role != 'admin') {
    console.log('noot an admin')
    res.status(401)
    throw new Error('Admin needed')
  }
    // Creat TRUCK 
    const truck = await Truck.create({
      matricul: req.body.matricul,
      // status: 'a', //avalabele by default
      user: req.user.id,
    })
    res.status(200).json(truck) 
})

// @desc    Update truck
// @route   PUT /api/trucks/:id
// @access  Private to admin
const updateTruck = asyncHandler(async (req, res) => {
  const truck = await Truck.findById(req.params.id)
console.log(truck)
  if (!truck) {
    res.status(400)
    throw new Error('Truck not found')
  }

  // Check for user
  if (req.user.role != 'admin') {
    res.status(401)
    throw new Error('Admin needed')
  }

  // // Make sure the logged in user matches the truck user
  // if (truck.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  const updateTruck = await Truck.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updateTruck)
})

// @desc    Delete truck
// @route   DELETE /api/trucks/:id
// @access  Private to admin
const deleteTruck = asyncHandler(async (req, res) => {
  const truck = await Truck.findById(req.params.id)

  if (!truck) {
    res.status(400)
    throw new Error('truck not found')
  }

  // Check for user
  if (!req.user.role == 'admin') {
    res.status(401)
    throw new Error('Admin needed')
  }

  await truck.remove()

  res.status(200).json({ id: req.params.id, msg:"Trick deleted" })
})

module.exports = {
  getTrucks,
  addTruck,
  updateTruck,
  deleteTruck,
  getOneTruck
}
