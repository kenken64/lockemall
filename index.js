`use strict`

console.log("Listening to mqtt to lock screen");
const lockSystem = require('lock-system');


var mqtt = require('mqtt')
var client  = mqtt.connect({ port: 17353, host: 'm16.cloudmqtt.com', username: 'pvoiqokx', password: 'UEq8zveNkCUN', keepalive: 10000})

client.on('connect', function () {
  console.log("connected");
  client.subscribe('lockscreen', function (err) {
    if (!err) {
      client.publish('lockscreen', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  console.log(process.platform);
  console.log(">>>" + message.toString());
  console.log(">>>" + topic.toString());
  if(topic.toString() === 'lockscreen' &&  message.toString() === 'true'){
	lockSystem();	
  }
})




