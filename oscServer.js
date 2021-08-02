const logger = require('log4js').getLogger();
logger.level = "info"

const config = require('./config.json');
const serverHost = config.serverHost
const socketsPort = config.ports.sockets
const udpPort = config.ports.udp

const express = require('express');
let app = express();
app.use(express.static('./public'));
app.use(express.static('./node_modules'));

const webServer = require('http').createServer(app)
let serverOptions = {
    cors: {
        origin: "*:*",
        // origin: "http://192.168.0.4:3001/*.html",
    }
}
let io = require('socket.io')(webServer, serverOptions);
io.sockets.on('connection', newConnection);
webServer.listen(socketsPort, serverHost)
logger.info('Logging Level', logger.level.levelStr)
logger.info(`Server listening on ${serverHost}:${socketsPort}`)

const osc = require('osc')
let udpPort = new osc.UDPPort({
    localAddress: serverHost,
    localPort: udpPort,
    metadata: true
});
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
});
udpPort.open();

function newConnection(socket) {
    logger.info(`new connection, ID: ${socket.id}  Remote Address: ${socket.client.conn.remoteAddress}`);
    // socket.on('browserMessage', handleBrowserMessage);
    // socket.emit('updateMessage', initialMessage);
}


// const serverHost = "localhost";
// const touchOscHost = config.touchOscHost;
// const authorizedClients = config.authorizedClients;


// const pureDataOutPort = config.ports.pureDataOut;
// const pureDataInPort = config.ports.pureDataIn;
// const touchOscOutPort = config.ports.touchOscOut;
// const touchOscInPort = config.ports.touchOscIn;

// let pureDataServer = new nodeOsc.Server(pureDataInPort, serverHost);
// let pureDataClient = new nodeOsc.Client(serverHost, pureDataOutPort);
// let touchOscServer = new nodeOsc.Server(touchOscInPort, serverHost);
// let touchOscClient = new nodeOsc.Client(touchOscHost, touchOscOutPort);

// let threshold = 0;


// let io = socket;
// io.set('origins', `http://${authorizedClients[0]}:3001/*.html`, `http://${authorizedClients[1]}:3001/*.html`);

// io.sockets.on('connection', newConnection);

// pureDataServer.on('message', handlePureDataOscMessage);
// touchOscServer.on('message', handleTouchOscMessage);

// function handleBrowserMessage(data){
//     logger.info("Received Browser Message", data);
//     for (const [key, value] of Object.entries(data)) {
//         initialMessage[key] = value;
//         logger.debug("New Initial Message", initialMessage)
//     }
//     io.sockets.emit('updateMessage', data);
//     let getOscMessage = new Promise((resolve, reject) => {
//         resolve(jsonToOsc(data))
//     });
//     getOscMessage.then((message) => {
//         sendOscMessageToPureData(message);
//         sendOscMessageToTouchOsc(message);
//     });
// }
//
// function handlePureDataOscMessage(message){
//     let address = message[0];
//     let args = message.slice(1);
//     if (address.startsWith('/modulator/led')) {
//         sendOscMessageToTouchOsc(message);
//         return;
//     }
//     if (address.startsWith('/particle/bark')) {
//         io.sockets.emit('newSystem', message)
//     } else {
//         logger.info("Received Pure Data OSC Message", message);
//         sendOscMessageToTouchOsc(message);
//         io.sockets.emit("updateMessage", oscToJson(address, args));
//     }
// }
//
// function handleTouchOscMessage(message){
//     let address = message[0];
//     let args = message.slice(1);
//     logger.info("Received TouchOSC Message", address, args);
//     sendOscMessageToPureData(message);
//     io.sockets.emit("updateMessage", oscToJson(address, args));
// }
//
// function oscToJson(address, args){
//     let message = {};
//     logger.debug(`Converting ${address.toString()}, ${args} to JSON`);
//     let key = address.toString().substring(1).replace('/', '-');
//     message[key] = args;
//     logger.info("Outgoing JSON message", message);
//     return message
// }
//
// function jsonToOsc(data){
//     let message;
//     logger.debug('Converting JSON to OSC', data);
//     for (const [key, value] of Object.entries(data)) {
//         let address = `/${key.replace('-', '/')}`;
//         message = new nodeOsc.Message(address);
//         value.forEach(item => message.append(item));
//     }
//     logger.info("Outgoing OSC message", message);
//     return message
// }
//
// function sendOscMessageToPureData(message){
//     // pureDataClient.send(message, (err) => {
//     //     if (err) logger.error(err);
//     // });
// }
//
// function sendOscMessageToTouchOsc(message){
//     // touchOscClient.send(message, (err) => {
//     //     if (err) logger.error(err);
//     // });
// }

// logger.level = (process.argv[2] && process.argv[2] == 'debug') ? 'debug' : 'info';


// socket.emit('visuals', ['/visuals/size', particleSize]);
//     socket.emit('visuals', ['/visuals/velocity', magnitudeFactor]);
//     socket.emit('visuals', ['/visuals/brightness', brightness]);
//     socket.emit('visuals', ['/visuals/saturation', saturation]);
//     socket.emit('visuals', ['/visuals/falloff', falloff]);
//     socket.emit('visuals', ['/visuals/lod', lod]);

