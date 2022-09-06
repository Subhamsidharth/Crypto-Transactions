// KHDE29JDBNN6FH91USIJV2HUTQBU5F57NS

// const fetch=require("node-fetch");

// let Etherscan= async function (req, res) {
//     try {
    // let address=req.query.address
//         let {address,startblock,endblock,page,offset,sort} =req.query
        
//         let options=fetch('https://api.etherscan.io/api')
//                     .then((response) => response.json())
//                     .then((data) => console.log(data));
//         // let result = await fetch(options)
//         // console.log(result.data)
//         // res.status(200).send({ msg: result.data })

//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ msg: err.message })
//     }
// }
// module.exports={Etherscan}

// import fetch from 'node-fetch'
// import mongoose from "mongoose"
// mongoose.connect("mongodb+srv://subhamsidharth:2NoDZjzEUgRaFunQ@cluster0.f3bng.mongodb.net/Products_management?retryWrites=true&w=majority", {    //process.env.MONGO_URL
//   useNewUrlParser: true
// })
// .then(function(){
//   console.log("Mongodb is connected successfully.✔🟢✅");
// })
// .catch(function(err){
//   console.log(err)
// })

// async function getpost(){
//     let {address,startblock,endblock,page,offset,sort} =req.query
//     const mypost=await fetch("https://api.etherscan.io/api")
//     const response=await mypost.json()
//     console.log(response)
// }getpost();