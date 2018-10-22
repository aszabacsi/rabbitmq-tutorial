const conf = require('./conf')

const connect = require('amqplib').connect(conf.rabbitEndpoint);

module.exports = () => connect;