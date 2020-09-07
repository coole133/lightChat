const {Router} = require('express')
const router = Router()
const Room = require('../models/Room')


// api/room/
router.post(
    '/',
    async (req, res) => {
        try {

            const {name, admin, users} = req.body

            const newRoom = await Room.findOne({name})

            if (newRoom) {
                return res.status(400).json({message: "Room already exist"})
            }

            console.log(users)

            const room = new Room({
                name, admin, users,
            })


            const savedRoom = await room.save()
            res.status(201).json(savedRoom)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })


// api/room/
router.get(
    '/',
    async (req, res) => {
        try {
            const rooms = await Room.find()
            res.status(200).json(rooms)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

module.exports = router