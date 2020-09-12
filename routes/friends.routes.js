const {Router} = require('express')
const router = Router()
const User = require('../models/User')

// api/friends/
router.get(
    '/',
    async (req, res) => {
        try {
            const searchedUsers = await User.find()
            console.log(searchedUsers)
            res.status(200).json(searchedUsers)
        } catch (e) {
            res.status(500).json({message: 'An error occurred'})
        }
    })

module.exports = router