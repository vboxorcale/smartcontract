const express = require('express');
const app = express();
const port = process.argv[2];
const rp = require('request-promise');
const bodyParser = require('body-parser');
//const previousBlockHash = 'OINAISDFN09N09ASDNF90N90ASNDF';
app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    const Blockchain = require('./blockchain');
    const bitcoin = new Blockchain();
    const uuid = require('uuid/v1');
    const nodeAddress = uuid().split('-').join('');
    bitcoin.createNewBlock(100,'0','0');
    app.get('/blockchain', function (req, res) {
        res.send(bitcoin);
      });
     //register a new node with our network with broadcast
      app.post('/register-and-broadcast-node', function (req, res) {
        const newNodeUrl = req.body.newNodeUrl;
        if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)bitcoin.networkNodes.push(newNodeUrl);
        const regNodesPromises = [];
        bitcoin.networkNodes.forEach(networkNodeUrl => {//broadcast this newNodeUrl to
    //the rest of the nodes in our network with forEach method
            const requestOptions = {
                uri: networkNodeUrl + '/register-node',
                method: 'POST',
                body: { newNodeUrl: newNodeUrl },
                json: true
            };
            regNodesPromises.push(rp(requestOptions));//... '/register-node'
            });
            Promise.all(regNodesPromises)
            .then(data => {
                const bulkRegisterOptions = {
                    uri: newNodeUrl + '/register-nodes-bulk',
                    method: 'POST',
                    body: { allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ] },
                    json: true
                };
        
                return rp(bulkRegisterOptions);
            })
            .then(data => {
                res.json({ note: 'New node registered with network successfully.' });
            });
        })
      
      
    //register a new node with our network and do not want them to broadcast
    app.post('/register-node', function (req, res) {
        const newNodeUrl = req.body.newNodeUrl;
        const nodeNotAlreadyPresent =bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode)bitcoin.networkNodes.push(newNodeUrl);
        res.json({ note: 'New node registered successfully.' });

    });
    
    app.post('/register-nodes-bulk', function (req, res) {
        const allNetworkNodes = req.body.allNetowrkNodes;
        allNetworkNodes.forEach(networkNodeUrl => {
            const nodeNotAlreadyPresent =bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
            const notCurrentNode = bitcoin.currentNodeUrl !==networkNodeUrl;
            if(nodeNotAlreadyPresent && notCurrentNode)bitcoin.networkNodes.push(networkNodeUrl);
            }); 
            res.json({note: 'Bulk registration successful.' });
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