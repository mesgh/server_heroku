const http = require('http');
const moment = require('moment');
const server = http.createServer();

server.listen(process.env.PORT || 80);

server.on('request', (req, res) => {

  if (req.url.startsWith('/add?')) {
    const query_string = req.url.split('?')[1];
    let answer_arr = [];
    let amount = 0;
    query_string.split('&').forEach(equality => {
      let [key, value] = equality.split('=');
      answer_arr.push(key);
      amount += parseInt(value);
    });
    const answer = answer_arr.join(' + ') + ' = ' + amount;
    res.end(answer);
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ date: moment().format('DD.MM.YYYY HH:mm:ss') }));
});
