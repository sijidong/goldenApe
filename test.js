const TokenAbi = [
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const address = "";
let web3;
web3 = new Web3(Web3.givenProvider);
const Claim = document.querySelector(".claim");
const connect = document.querySelector(".connect");
connect.innerHTML = "Connect Wallet";

const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    connect.innerHTML = account;
    if (accounts) {
      Claim.addEventListener("click", () => {
        console.log(account);
        contractFunc(account);
      });
    } else {
      window.alert("Plz Connect Metamask !\nRefresh The Page !");
    }
  } else {
    window.alert("Metamask is not Installed !");
  }
};

connectWallet();

connect.addEventListener("click", () => {
  connectWallet();
});

const contractFunc = (account) => {
  web3.eth.getChainId().then((chainId) => {
    if (chainId == "56") {
      let Contract = web3.eth.Contract;
      let contract = new Contract(TokenAbi, address);

      contract.methods
        .claim()
        .send({
          from: account,
          //   gas: 50000, // uncomment if you want lowest gas price to charge
          //   gasPrice: '42000000000' // uncomment if you want lowest gas price to charge
        })
        .then((value) => console.log(value))
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.alert("Plz Select Binance Smart chain !");
    }
  });
};
