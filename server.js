require('dotenv').config()

const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const path = require('path')
const serveStatic = require('serve-static')

const authRouter = require('./routes/AuthRouter')
const cardRouter = require('./routes/CardRouter')

const server = express()

const whitelist = [
	'localhost:3000',
	'localhost:8080',
	process.env.HEROKU_URL
]

const corsOptions = {
	origin: function (origin, callback) {
		console.log("** Origin of request " + origin.headers.host)
		if (whitelist.indexOf(origin.headers.host) !== -1 || !origin) {
			console.log("Origin acceptable")
			callback(null, true)
		} else {
			console.log("Origin rejected")
			callback(new Error('Not allowed by CORS - ' + origin.headers.host))
		}
	}
}

server.use(express.json())
server.use(cors(corsOptions.origin))
server.use(serveStatic(__dirname + '/client/build'))

server.get('/api', (req, res) => {
	res.send({ message: "Hello World!" })
})

server.use('/api/auth', authRouter)
server.use('/api/cards', cardRouter)

server.use((err, req, res, next) => {
	if (err) {
		console.error(err)
		if (err.name === 'UnauthorizedError') {
			res.status(err.status)
		}
		return res.send({
			message: err.message
		})
	}
})

if (process.env.NODE_ENV === 'production') {
	server.use(express.static(path.join(__dirname, 'client/build')))
	server.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	});
}

server.listen(
	process.env.PORT || 4000,
	() => console.log(`Server listening on port ${process.env.PORT || 4000}`)
)
