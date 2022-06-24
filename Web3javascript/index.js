const express = require("express");
const bodyParser = require("body-parser");
const Web3 = require("web3");
const solc = require("solc");
const fs = require("fs");
let web3 = new Web3("ws://localhost:7545");
let contractAddress = "";
//let firstAddress = "0x5067540Ab70130fef356d8Cb57ea18fDBbE565Eb";

file = fs.readFileSync("permis.sol").toString();
//console.log(file);

var input = {
  language: "Solidity",
  sources: {
    "permis.sol": {
      content: file,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
//console.log("Result : ", output);

ABI = output.contracts["permis.sol"]["permis"].abi;
bytecode = output.contracts["permis.sol"]["permis"].evm.bytecode.object;
//console.log("Bytecode: ", bytecode);
//console.log("ABI: ", ABI);

contract = new web3.eth.Contract(ABI);
//console.log("contrat: ", contract);
web3.eth.getAccounts().then((accounts) => {
  // Display all Ganache Accounts
  console.log("Accounts:", accounts);

  mainAccount = accounts[1];

  // address that will deploy smart contract
  console.log("Default Account:", mainAccount);
  contract
    .deploy({ data: bytecode })
    .send({ from: mainAccount, gas: 999000000 })
    .on("receipt", (receipt) => {
      // Contract Address will be returned here
      console.log("Contract Address:", receipt.contractAddress);
      contractAddress = receipt.contractAddress;
      contract2 = new web3.eth.Contract(ABI, contractAddress);
      file2 = fs.writeFileSync("id_permis.txt", contractAddress, { flag: "a" });
      const app = express();
      app.use(bodyParser.urlencoded({ extended: true }));
      //console.log("test");
      app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html");
      });
      app.get("/getPermis", (req, res) => {
        let nompermis = contract2.methods.getNomPermis().call();
        let prenompermis = contract2.methods.getPrenomPermis().call();
        let nephpermis = contract2.methods.getNephPermis().call();
        let datepermis = contract2.methods.getDatePermis().call();
        let pointspermis = contract2.methods.getPointsPermis().call();
        const awaiter = async () => {
          const nom = await nompermis;
          const prenom = await prenompermis;
          const date = await datepermis;
          const points = await pointspermis;
          const neph = await nephpermis;
          let result = `Nom: ${nom}<br> Prenom: ${prenom}<br> Date d'obtention du permis: ${date}<br> N° Neph: ${neph}<br> Nombre points sur le permis: ${points}<br>`;
          res.send(result);
        };
        awaiter();
      });

      app.listen(3000, () => {
        console.log("server running on port 3000");
      });
      // "195264126", 8, "BECHICHI", "Yassine", "25/06/2022"
      app.post("/addPermis", (req, res) => {
        let postnom = req.body.nom;
        let postprenom = req.body.prenom;
        let postneph = req.body.neph;
        let postdate = req.body.date;
        let postpoints = req.body.points;
        async function addPermis(neph, points, nom, prenom, date) {
          await contract2.methods
            .addPermis(neph, points, nom, prenom, date)
            .send({ from: mainAccount, gas: 90000000 })
            .then(console.log);
          //await contract2.methods.getPrenomPermis().call().then(console.log);
        }
        addPermis(postneph, postpoints, postnom, postprenom, postdate);
        file2 = fs.writeFileSync("id_permis.txt", " " + postneph + "\r\n", {
          flag: "a",
        });
        //console.log(postneph, postpoints, postnom, postprenom, postdate);
        res.send("voir le permis ! <a href='/getPermis'>ici</a>");
        res.redirect("/getPermis");
      });

      app.get("/addPoints/:points", (req, res) => {
        let points = req.params.points;
        async function addPoints(points) {
          await contract2.methods
            .ajoutPoints(points)
            .send({ from: mainAccount })
            .then(console.log);
          await contract2.methods.getPointsPermis().call().then(console.log);
        }
        addPoints(points);
        //res.sendStatus("200");
        res.redirect("/getPermis");
      });
      app.get("/retraitPoints/:points", (req, res) => {
        let points = req.params.points;
        async function retraitPoints(points) {
          await contract2.methods
            .retraitPoints(points)
            .send({ from: mainAccount })
            .then(console.log);
          await contract2.methods.getPointsPermis().call().then(console.log);
        }
        //retraitPoints();
      });
    });
});
