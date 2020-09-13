const {Router} = require('express')
const router = Router()
const User = require('../models/User')

// api/friends/
router.get(
    '/',
    async (req, res) => {
        try {
            User.find({
                $text: { $search: req.query.q },
            })
                .then(users =>  res.status(200).json(users))
                .catch(e => console.error(e));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'An error occurred'})
        }
    })

module.exports = router