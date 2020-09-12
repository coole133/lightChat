const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const socketio = require("socket.io")
const http = require("http")
const formatMessage = require("./socket.io/formatMessage")
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require("./socket.io/manageUsers")

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = config.get('port') || 2000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/room', require('./routes/room.routes'))
app.use('/api/message', require('./routes/message.routes'))
app.use('/api/friends', require('./routes/friends.routes'))

const botName = 'LightChat Bot'

io.on('connection', (socket) => {
    console.log('New WS Connection...')
    socket.on('joinRoom', ({username, room, roomId}) => {
        const user = userJoin(socket.id, username, room, roomId)

        socket.join(user.room)

        socket.broadcast.to(user.room).emit(
            'message', formatMessage(botName, `${user.username} has joined the chat`, user.roomId))

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    socket.on('end', () => {
        socket.disconnect(0)
    })

    socket.on('chatMessage', (message) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, message, user.roomId))
    })
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`, user.roomId))
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }

    })
});


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()