const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/transaction', function(req, res) {
    console.log(req.body);
    res.send(`The amount of the transaction is
    ${req.body.amount}
    bitcoin.`);
    });
    app.listen(port, function(){
        console.log('listening on port 3000...');
        });