const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();
const previousBlockHash = 'OINAISDFN09N09ASDNF90N90ASNDF';
const currentBlockData = [
    {
    amount: 101,
    sender: 'N90ANS90N90ANSDFN',
    recipient: '90NA90SNDF90ANSDF09N',
    },
    {
        amount: 30,
        sender: '09ANS09DFNA8SDNF',
        recipient: 'UIANSIUDFUIABSDUIFB',
    },
    {
        amount: 200,
        sender: 'B9ANS89DFN98ASNDF89',
        recipient: 'AUSDF89ANSD9FNASD',
    }
    ]
const nonce = 100;
bitcoin.createNewBlock(100,'0','0');
//bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
//bitcoin.createNewBlock(789457,'OIUOEDJETH8754DHKD','78SHNEG45DER56');
bitcoin.createNewTransaction();
bitcoin.createNewBlock(548764,'AKMC875E6S1RS9','WPLS214R7T6SJ3G2 '); 
bitcoin.createNewBlock(50,'ALEXHT845SJ5TKCJ1','JENN5BG5DF9HT8NG9');
bitcoin.createNewBlock(200,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
//bitcoin.createNewBlock(300,'ALEXHT845SJ5TKCJ2','JENN5BG5DF6HT8NG9');
/*bitcoin.createNewBlock(2389,'OIUOEREDHKHKD','78s97d4x6dsf'); 
bitcoin.createNewBlock(2322,'JPYUSDEDHKHKD','11s04d4x3dsf'); 
bitcoin.createNewBlock(2222,'MISIAISTHEBES','88a09e4x8dsf'); */
//console.log(bitcoin.chain[2]); 
//console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData, nonce));
//console.log(bitcoin.proofOfWork(previousBlockHash,currentBlockData));
console.log(bitcoin);

