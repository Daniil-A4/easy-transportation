const { readFileSync } = require('fs')
const { createServer } = require('http')
const nodeMailer = require('nodemailer')
const TelegramBot = require('node-telegram-bot-api')
try {require('./config')} catch  {}
const token = process.env.TOKEN
const myId = +process.env.MYID
const bot = new TelegramBot(token, { polling: true })
const port = process.env.PORT || 5000

let server = createServer(requestListener)

server.listen(port)


bot.addListener('message', msg => {
	console.log(msg.chat)
})


async function requestListener(request, response) {
	let url = request.url
	if (url == '/') {
		url = '/index.html'
	}

	if (url.startsWith('/api/')) {
		const chunks = []
		for await (const chunk of request) {
			chunks.push(chunk)
		}
		const data = Buffer.concat(chunks).toString()
		console.log(data);
		bot.sendMessage(myId, data.replace(/[{"}]/g, '').replace(/,/g, '\n').replace(/:/g, ': '))
	} else {
		try {
			let file = readFileSync(url.slice(1))
			if (url.endsWith('.svg')) {
				response.setHeader('content-type', 'image/svg+xml')
			}
			response.end(file)
		} catch (error) {
			response.end('file not found')
		}
	}

}