const moment = require('moment')

const formatMessage = (user, text) => {
    return {
        user, text, time: moment().format('h:mm a')
    }
}

module.exports = formatMessage