function Blockchain(){
    this.chain=[];//is where the meat of our blockchain will be stored.
    this.newTransaction=[];
    this.pendingTransactions=[];
    this.createNewBlock(100, '0', '0');
}; /*is where we will hold all of the pending
transactions that are created before they are placed into a block*/
  
Blockchain.prototype.createNewBlock=function(nonce,previousBlockHash,hash){
    var newBlock= {
        index: this.chain.length+1,
        timeStamp: Date.now(),
        transactions: this.newTransaction,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash,
    };
    
    this.newTransaction=[];
    this.chain.push(newBlock);

    return newBlock;

   } ;
   Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
};
     Blockchain.prototype.createNewTransaction = function (amount,
        sender, recipient) {
            var pendingTransactions = {
                amount: amount,
                sender: sender,
                recipient: recipient,
                };
     this.pendingTransactions.push(pendingTransactions);
     return this.getLastBlock.index + 1;
    };
    Blockchain.prototype.hashBlock = function(previousBlockHash,
        currentBlockData, nonce) {/*These three parameters will be the data that we are going to
            be hashing inside of our hashBlock method. All of this data will
            come from a single block in our chain and we're going to hash
            this data, which is essentially hashing a block. We are then
            going to get a hashed string in return. */
         const sha256 = require('sha256');/*To use this SHA256 library, we will have to import the library to
         our code so that we can use it*/
         const dataAsString = previousBlockHash + nonce.toString()+
         JSON.stringify( currentBlockData);/*Furthermore, our currentBlockData is going to be an
         object, an array of our transactions, or some kind of JSON
         data. It will either be an array or an object, and JSON.stringify
         will simply turn that data (as well as any object or array) into
         a string. Once this whole line is run, we will simply have all of
         the data that we passed to be concatenated into a single string */
         const hash = sha256(dataAsString);
         return hash;
    };
    Blockchain.prototype.proofOfWork = function( previousBlockHash,
        currentBlockData) {
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, currentBlockData,
        nonce);
        while (hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData,
        nonce);
        }
        return nonce;
        };

module.exports=Blockchain;
