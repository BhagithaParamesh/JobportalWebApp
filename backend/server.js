  const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const jwt=require('jsonwebtoken');
 const api = require('./routes/api');
const port = 3000;
 
 const app = express();

app.use(bodyParser.json());
app.use(cors());
 app.use('/api',api);

app.listen(port,function(){
    console.log("server running on localhost: "+ port);
});