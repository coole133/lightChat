const moment = require('moment')

const formatMessage = (user, text, room) => {
    return {
        user, text, time: moment().format('h:mm a'), room
    }
}

module.exports = formatMessage