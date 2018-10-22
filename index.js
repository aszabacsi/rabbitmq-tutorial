const send = require('./producer');
const consume = require('./consumer');

const q = 'Q';
const message = 'Hello Q';
send(q, message)
.then(() => {
  console.log(`SENT: ${message}`);
})
.catch(console.error);


consume(q)
.then((result) => {
  console.log(`RECEIVED: ${result}`);
})
.catch(console.error)