const http = require('http');
const moment = require('moment');
const server = http.createServer();
const fs = require('fs');

server.listen(process.env.PORT || 80);

server.on('request', ({ url }, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (url.startsWith('/add?')) {

    res.end(solve(url, '+'));

  } else if (url.startsWith('/deduct?')) {

    res.end(solve(url, '-'));

  } else if (url.startsWith('/mpy?')) {

    res.end(solve(url, '*'));

  } else if (url.startsWith('/del?')) {

    res.end(solve(url, '/'));

  } else if (url.startsWith('/code')) {

    fs.createReadStream('./index.js').pipe(res);

  } else {

    res.end(JSON.stringify({ date: moment().format('DD.MM.YYYY HH:mm:ss') }));

  }
});

function solve(query, char) {
  const query_string = query.split('?')[1];
  const val_arr = [];

  query_string.split('&').forEach(equality => {
    val_arr.push('(' + equality.split('=')[1] + ')');
  });
  let result = eval(val_arr.join(char));
  if (isNaN(result)) {
    result = 'error';
  }
  return JSON.stringify({ result });
}