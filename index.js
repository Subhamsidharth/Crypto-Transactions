const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const CronJob = require('cron').CronJob
const app = express()
const transactionModel = require('./collection/transactionModel')
const etheriumPriceModel = require('./collection/etheriumPriceModel')
app.use(express.json())

mongoose.connect("mongodb+srv://subhamsidharth:2NoDZjzEUgRaFunQ@cluster0.f3bng.mongodb.net/Products_management?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(function () {
        console.log("Mongodb is connected successfully.✔🟢✅");
        etheriumPrice.start()
    })
    .catch(function (err) {
        console.log(err)
    })
app.post('/transaction', async function (req, res) {
    try {
        let address = req.query.address
        let apikey = req.query.apikey
        const response = await axios.post(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apikey}`);
        if (response.data.status == 1) {
            let exist = await transactionModel.findOne({ address: address})
            if(!exist){
                let store = await transactionModel.create({ address: address, Data: response.data.result })
                if (store) {
                    return res.status(201).send({ MSG: "Stored In DataBase Successfully", DATA: response.data })
                } else {
                    return res.status(400).send({ MSG: "Error Occoured While Saving Data In DataBase." })
                }
            }else{
              let update = await transactionModel.findOneAndUpdate({ address: address,Data:response.data.result})
              return res.status(200).send({ MSG: "Stored The Updated Value In DataBase Successfully", DATA: update })
            }
            
        } else if (response.data.status == 0) {
            return res.send({ Message: "No Transaction Found" })
        }
    } catch (error) {
        return res.send({ ERROR: error.message })
    }

})

const etheriumPrice = new CronJob(
    '*/10 * * * *',
    async function () {
        try {
            let price = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr')
            await etheriumPriceModel.create({ etheriumPrice: price.data.ethereum.inr })
            console.log("Successfully Stored Etherium Updated Price in DataBase")
        } catch (error) {
            console.log(error.message)
        }
    }
);

app.get('/Details',async function (req,res){
  const address = req.query.address
  if(!address){
    return res.status(400).send({message:"Plz Provide The Address Field To Proceed Further"})
  }
  let data = await transactionModel.findOne({address:address})
  let etheriumPrice = await etheriumPriceModel.find().sort({createdAt:-1})
  let transactionData = data.Data
  let userBalance =0 
  for(let i=0;i<transactionData.length;i++){
    if(transactionData[i].from==address.toLowerCase()){
      userBalance+=transactionData[i].value
    }
    if(transactionData[i].to==address.toLowerCase()){
        userBalance-=transactionData[i].value
      }
  }
  return res.status(200).send({Wallet:userBalance,PriceOfEtherium:etheriumPrice[0].etheriumPrice})
})

app.listen(3000, function () { return console.log(`Express is running on port 3000`) });