/*var express = require('express')
var app = express()
app.get('/', function (req, res) {
res.send('Hello Coding JavaScript!')/*For example, we have a get endpoint, which is just /. 
With this endpoint, we are sending back the response of Hello World. This
whole server is listening on port 3000. 
})
const express = require('express');
const app = express();
app.get('/blockchain', function (req, res) {
});
app.post('/transaction', function(req, res) {
});
app.get('/mine', function(req, res) {
});
app.listen(3000, function(){
    console.log('listening on port 3000...');
    });*/
    const express = require('express');
    const app = express();
    var port = 3000;
    const bodyParser = require('body-parser');
    const Blockchain = require('./blockchain');
    const bitcoin=new Blockchain();
    const previousBlockHash = 'OINAISDFN09N09ASDNF90N90ASNDF';
    const nonce = 100;
    //bitcoin.createNewBlock=(100,'0','0');
    /*app.get('/', function (req, res) {
        res.send('Hello Coding JavaScript!');});*/
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.get('/blockchain', function(req, res) {
        res.send(bitcoin);
        });
    app.post('/transaction', function(req, res) {
        console.log(req.body);
        res.send(`The amount of the transaction is ${req.body.amount} bitcoin.`);
        });
    app.listen(port, function(){
        console.log('listening on port 3000...');
        });