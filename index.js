require('http')
.Server((req, res) => {

  if (req.url.startsWith('/add?')) {
    const query_string = req.url.split('?')[1];
    let answer_arr = [];
    let amount = 0;
    query_string.split('&').forEach( equality => {
      let [key, value] = equality.split('=');
      answer_arr.push(key);
      amount += value;
    });
    const answer = answer_arr.join(' + ') + ' = ' + amount;
    res.end(answer);
  }
  res.writeHead(200, {
    'Content-Type': 'text/javascript; charset=utf-8'
  });
  require('fs').createReadStream('./index.js').pipe(res);
})
.listen(process.env.PORT || 80)