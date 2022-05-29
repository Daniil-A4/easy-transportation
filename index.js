const { readFileSync } = require('fs')
const { createServer } = require('http')
const nodeMailer = require('nodemailer')
const TelegramBot = require('node-telegram-bot-api')
const token = '5387467101:AAFiO4vknWGmmy2n5Y_FcYCFBGRgtmwOc6o'
const bot = new TelegramBot(token, { polling: true })
const myId = 593591149
const port = 5000

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
			response.end(file)
		} catch (error) {
			response.end('file not found')
		}
	}

}