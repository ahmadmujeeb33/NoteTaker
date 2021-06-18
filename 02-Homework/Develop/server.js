
const express = require('express');
const path = require('path');


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

app.post('/api/notes',(req,res) =>{
    console.log("in here");
    console.log(req.body);
})


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));