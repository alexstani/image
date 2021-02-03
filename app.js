var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
const cookieParser = require('cookie-parser');

const img = require('./imageupload/imageroute');

mongoose.connect('mongodb://localhost:27017/upload');
mongoose.connection.on('connected',()=>{
    console.log('connected to database mongo @27017');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in database connection:'+err);
    }
}); 
const port = process.env.PORT ||3450;


app.use(cors());
app.use(cookieParser());
app.use(bodyparser.json());

app.use('/public', express.static('public'));

app.use(img);

app.get('/',(req,res)=>{
    res.send('foobar');
});

app.listen(port,()=>{
    console.log('server started at port:'+port);
});



















