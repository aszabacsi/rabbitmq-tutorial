const connect = require('./connect');

const consume = async (q) => {

  try {

    const conn = await connect(); 
    const ch = await conn.createChannel();
    const ok = await ch.assertQueue(q);
  
    if(ok) {

      const getMessage = () => new Promise((resolve, reject) => {
        ch.consume(q, msg => {
          if(msg) resolve(msg);
          else reject('Message is null');
        })
      });

      const msg = await getMessage();
      ch.ack(msg);
      return msg.content.toString();

    } else {
      throw new Error('Message is null');
    }

  }
  catch(e)
  {
    console.error(e)
    throw e;
  }
}

module.exports = consume;
