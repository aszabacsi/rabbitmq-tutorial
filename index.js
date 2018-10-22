const send = require('./producer');
const consume = require('./consumer');

const q = 'Q';

send(q, 'Hello QUEUE')
.then(() => {
  console.log('SENT MESSAGE');
})
.catch(console.error);


consume(q)
.then((result) => {
  console.log(result);
})
.catch(console.error)