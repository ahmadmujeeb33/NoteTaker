
const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('express');


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
        return res.json(JSON.parse(data));
    });
})

app.post('/api/notes',(req,res) =>{
    console.log("in post");
    let values = req.body;
    fs.readFile('./db/db.json','utf8', (err,data) =>{
        console.log(typeof data);
        console.log("in readfile");
        newData = JSON.parse(data);
        console.log(typeof newData);
        console.log("data pushed");
        console.log(newData);

        newData.push(values);
        console.log("rthusdhoxc");
        console.log(newData);
        fs.writeFile("./db/db.json",JSON.stringify(newData),(err) =>{
            console.log("in this one")
            console.log(newData);


            return res.json(newData)
        })
              

    });

    // console.log(newInfo);

    
   
})


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));