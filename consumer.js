const connect = require('./connect');

const consume = async (q) => {

  try {

    const conn = await connect(); 
    const ch = await conn.createChannel();

    let queue = await ch.checkQueue(q);

    if(!queue) queue = await ch.assertQueue(q);
  
    if(queue) {

      //To avoid dispatch one single long running task to multiple workers multiple times
      //It won't dispatch the next message to a given worker until it hasn't processed/akcnowledged the previous one
      ch.prefetch(1); 
      
      const getMessage = () => new Promise((resolve, reject) => {

        ch.consume(q, msg => {
          if(msg) resolve(msg);
          else reject('Message is null');
        },{noAck: false});
 
      });

      const msg = await getMessage();

      ch.ack(msg); // No timeout, sends acknowledge message if worker dies

      return msg.content.toString();


    } else {
      throw new Error(`Queue doesn't exist: ${q}`);
    }

  }
  catch(e)
  {
    console.error(e)
    throw e;
  }
}

module.exports = consume;
