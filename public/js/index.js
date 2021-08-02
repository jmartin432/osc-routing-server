console.log('index.js is connected!');
let socket;
// let host = 'localhost';
let host = '192.168.0.4';
let port = '3001';
let url = `${host}:${port}`;

socket = io.connect(url);