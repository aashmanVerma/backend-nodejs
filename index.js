const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const app = express();
const cryptomodel = require('./model/schema')
require('dotenv').config();

const port = process.env.PORT;
const url = process.env.URL;

app.use(cors());

app.listen(port,()=>{
    console.log(`server listening on port ${port}`);

    mongoose.connect(url).then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(err.message);
    })
})

app.get("/",(req,res)=>{
    res.status(200).json("hello from server");
})

// route to get information from api
app.get('/infoapi',async(req,res)=>{
    await axios.get(process.env.API).then((d)=>{
        const info = Object.values(d.data);
        const arr = [];
        for (const obj of info) {
            arr.push(obj);
        }
        res.status(200).json(arr.slice(0,11));
    })
})

// route to save info to db
app.post("/save",async(req,res)=>{
    const arr = [];
    await axios.get(process.env.API).then((d)=>{
        const info = Object.values(d.data);
        for (const obj of info) {
            arr.push(obj);
        }
        res.status(200).json(arr.slice(0,11));
    })
    const newArr = arr.slice(0,10);
    newArr.map((e)=>{
        const doc = new cryptomodel({
            name : e.name,
            last : parseFloat(e.last),
            buy : parseFloat(e.buy),
            sell : parseFloat(e.sell),
            volume : parseFloat(e.volume),
            base_unit : e.base_unit,
        })
        doc.save();
    })
})

// get data from database
app.get('/infodb',async(req,res)=>{
    try {
        const data = await cryptomodel.find();
        res.status(200).json(data);
    } catch (err) {
        console.error(err)
    }
})

// uncaught exception handled
process.on('uncaughtException',(err)=>{
    console.error('Uncaught exception',err)
    process.exit(1);
})

// unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});
  
  