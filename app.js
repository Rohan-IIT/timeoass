const express = require('express')
const app = express()
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/amazon/football', (req, res) => {
    res.send('football page!')
})

app.post('/a', (req, res) => {

        var search = req.body.search        
        if (!isNaN(search)) {
            throw new Error('bhai thik product ka naam de');
            res.redirect('/amazon/home');
        }
        else res.redirect('/amazon/'+req.body.search)
})

app.get('/amazon/cycle', (req, res) => {
    res.send('cycle page!')
})

app.get('/amazon/home', (req, res) => {
    res.send('<h1>home page </h1> <form action=/a method=post>    <input name=search>    <button type=submit>Search</button></form>')
})

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
