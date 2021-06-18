
const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use(express.static('public'));

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
})

app.get('/notes',(req,res) =>{
    res.sendFile(path.join(__dirname,'./public/notes.html'));
})

app.get('/api/notes',(req,res) =>{
    fs.readFile('./db/db.json','utf8', (err,data) =>{
        console.log("thisss");
        console.log(data)
        return res.json(JSON.parse(data));
    });
})

app.post('/api/notes',(req,res) =>{
    console.log("in here");
    console.log(req.body);
})


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));