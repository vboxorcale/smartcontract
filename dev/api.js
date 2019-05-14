const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const previousBlockHash = 'OINAISDFN09N09ASDNF90N90ASNDF';
app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    const Blockchain = require('./blockchain');
    const bitcoin = new Blockchain();
    const port =3000;
    const uuid = require('uuid/v1');
    const nodeAddress = uuid().split('-').join('');
    bitcoin.createNewBlock(100,'0','0');
    app.get('/blockchain', function (req, res) {
        res.send(bitcoin);
      });
      
      
      // create a new transaction
      app.post('/transaction', function(req, res) {
          const newTransaction = req.body;
          const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
          res.json({ note: `Transaction will be added in block ${blockIndex}.` });
      });
      
      // broadcast transaction
app.post('/transaction/broadcast', function(req, res) {
        const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
        bitcoin.addTransactionToPendingTransactions(newTransaction);
        const blockIndex =
        bitcoin.createNewTransaction(req.body.amount,
        req.body.sender, req.body.recipient);
        res.json({ note:`Transaction will be added in block ${blockIndex}.`});
        });

// mine a block
app.get('/mine', function(req, res) {
	const lastBlock = bitcoin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    
    // receive new block
app.post('/receive-new-block', function(req, res) {
	const newBlock = req.body.newBlock;
	const lastBlock = bitcoin.getLastBlock();
	const correctHash = lastBlock.hash === newBlock.previousBlockHash; 
    const correctIndex = lastBlock['index'] + 1 === newBlock['index'];
});
   
	const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
	const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
	const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash); 
app.get('/mine', function(req, res) {
       const newBlock = bitcoin.createNewBlock();
       });
res.json({
            note: "New block mined successfully",
            block: newBlock
                });
    
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);});
    app.listen(port , function() {
        console.log(`Listening on port ${port}...`);
    });