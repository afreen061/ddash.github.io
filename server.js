const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const mongoose=require('mongoose');
const dotenv=require('dotenv');



const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://127.0.0.1:27017';
const ddbb='FileJson'
MongoClient.connect(uri)
const client= new MongoClient(uri);

async function gdata(){
  let result = await client.connect();
db=result.db(ddbb)
collection=db.collection('FilessJson');
let data=await collection.find({}).toArray();
 

  //console.log(data); 
}
gdata();

const app = express();

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, "views")));
app.get("/", function (req, res) {
    res.render( "index");
});
app.get("/userr",async function (req, res) {
  let result = await client.connect();
db=result.db(ddbb)
collection=db.collection('FilessJson');
let data=await collection.find({}).toArray();
  res.send(data);
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});