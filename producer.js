const connect = require('./connect');

const send = async (q, message) => {

  try 
  {
    const conn = await connect(); 
    const ch = await conn.createChannel();

    let queue = await ch.checkQueue(q);

    if(!queue) queue = await ch.assertQueue(q);

    if(!queue) queue = ch.assertQueue(q, {
      // The message won't be lost even if RabbitMQ server dies
      // The queue will be saved even if the RabbitMQ server dies
      durable: true, 
    });

    if(queue) {
      ch.sendToQueue(q, Buffer.from(message), {
        persistent: true // The message will be saved to the disk, but there is slight chance to loose the message still
        // The safety with publisher confirms is 100%
      });
    } else {
      throw new Error(`Failed to send ${message} to: ${queue}`)
    }

  } catch(e) {
    console.error(e);
    throw e;
  }
}

module.exports = send;



