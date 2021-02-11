require('http')
.Server((req, res) => res.end('HELLO!'))
.listen(process.env.PORT || 80)