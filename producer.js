const amqp = require('amqplib/callback_api');
const conf = require('./conf');

const send = (q, message) => {

  return new Promise((reject, resolve) => {

    amqp.connect(conf.rabbitEndpoint, (err, conn) => {
  
      if(err) reject(err);
    
      conn.createChannel((err, ch) => {

        if(err) reject(err);
  
        ch.assertQueue(q, {
          durable: true
        });
  
        ch.sendToQueue(q, Buffer.from(message));

        resolve();
  
      });
    
    });
  });


}

module.exports = send;



