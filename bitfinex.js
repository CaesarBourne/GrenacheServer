const crypto = require('crypto') 
const WebSocket = require('ws') 

const apiKey = '' // const apiKey = 'paste key here'
const apiSecret = '' // const apiSecret = 'paste secret here'

const nonce = (Date.now() * 1000).toString()
const authPayload = 'AUTH' + nonce 
const authSig = crypto.createHmac('sha384', apiSecret).update(authPayload).digest('hex') 

const payload = {
  apiKey, //API key
  authSig, //Authentication Sig
  nonce, 
  authPayload,
  event: 'auth'
}

const wss = new WebSocket('wss://api.bitfinex.com/ws/2') // Create new Websocket

wss.on('open', () => wss.send(JSON.stringify(payload)))

wss.on('message', (msg) => { 
  console.log(msg)
})