const express=require('express');
const cors=require('cors');
const app=express();
const bodyparser=require('body-parser');
app.use(cors());
app.use(bodyparser.json());

require('./db');
require('./route')(app);

app.listen(3001,()=>console.log('Sucessfully listenig at port 3001'));