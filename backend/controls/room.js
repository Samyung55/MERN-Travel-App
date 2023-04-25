const { verifyTokenAdmin, verifyToken } = require("../middleware/verifyToken");
const Room = require("../Model/Room");

const roomRouter = require("express").Router()

// Get all
roomRouter.get("/", verifyToken, async (req, res) => {
    const type = req.query.type

    let rooms
    try {
        if (type) {
            rooms = await Room.find({ type: type }).limit(15)
        }
        else {
            rooms = await Room.find({}).limit(15)
        }
        return res.status(200).json(rooms)
    }
    catch (error) {
        console.error(error.message)
    }
})

// Get Types
roomRouter.get("/find/types", async (req, res) => {
    try {
        const apartment = await Room.find({ type: 'apartment' }).countDocuments()
        const villa = await Room.find({ type: 'villa' }).countDocuments()
        const penthouse = await Room.find({ type: 'penthouse' }).countDocuments()
        const bungalow = await Room.find({ type: 'bungalow' }).countDocuments()

        return res.status(200).json({ apartment, villa, penthouse, bungalow })
    }
    catch (error) {
        console.error(error.message)
    }
})


// Get Rooms by Id
roomRouter.get('/find/:id', async (req, res) => {
    const id = req.params.id
    try {
        const rooms = await Room.findById(id)
        return res.status(200).json(rooms)
    }
    catch (error) {
        console.error(error.message)
    }
})

// Create Rooms
roomRouter.post('/', verifyTokenAdmin, async (req, res) => {
    try {
        const createdRoom = await Room.create(req.body)
        return res.status(201).json(createdRoom)
    }
    catch (error) {
        console.error(error.message)
    }
})

// Update Rooms
roomRouter.put('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        return res.status(200).json(room)
    }
    catch (error) {
        console.error(error.message)
    }
})

// Delete Room
roomRouter.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id)
        return res.status(200).json({ msg: 'Room has been deleted successfully' })
    }
    catch (error) {
        console.error(error.message)
    }
})

// Book hotel
roomRouter.put('/bookRoom/:id', verifyToken, async (req, res) => {
    try {
        const { unavailableDates } = req.body
        const room = await Room.findByIdAndUpdate(req.params.id)
        
        room.unavailableDates = room.unavailableDates.concat(unavailableDates)
        await room.save();

        return res.status(200).json(room)
    }
    catch (error) {
        console.error(error.message)
    }
})

module.exports = roomRouter