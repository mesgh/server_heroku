require('http')
.Server((req, res) => {
  if (req.url === '/add'){
    res.end('HELLO!')
  }
  res.writeHead(200, {
    'Content-Type': 'text/javascript; charset=utf-8'
  });
  require('fs').createReadStream('./index,js').pipe(res);
})
.listen(process.env.PORT || 80)