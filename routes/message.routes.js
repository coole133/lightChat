const {Router} = require('express')
const router = Router()
const Message = require('../models/Message')

// api/message/
router.post(
    '/',
    async (req, res) => {
        try {

            const {text, room, user, time} = req.body

            const newMessage = new Message({
                text, room, user, time
            })

            const savedMessage = await newMessage.save()
            res.status(201).json(savedMessage)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })

// api/message/
router.get(
    '/:id',
    async (req, res) => {
        try {
            const messages = await Message.find({room: req.params.id})
            console.log(messages)
            res.status(200).json(messages)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

// api/message/
router.delete(
    '/:id',
    async (req, res) => {
        try {
            const messages = await Message.deleteMany({room: req.params.id})
            res.status(200).json(messages)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

module.exports = router