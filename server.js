const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('express');
const { v4: uuidv4 } = require('uuid');


const app = express();

const PORT = process.env.PORT || 3000;

let newData ;

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
    console.log("thisss");
    fs.readFile('./db/db.json','utf8', (err,data) =>{
        // newData = JSON.parse(data)
        return res.json(JSON.parse(data));
        
    });
})

app.post('/api/notes',(req,res) =>{
    console.log("in post");
    let values = req.body;

    const data = fs.readFileSync('./db/db.json',
            {encoding:'utf8', flag:'r'});
    // fs.readFile('./db/db.json','utf8', (err,data) =>{
       
    newData = JSON.parse(data);
    
    values.id = uuidv4();

    newData.push(values);
        // console.log("rthusdhoxc");
        // console.log(newData);
    // });

    fs.writeFile("./db/db.json",JSON.stringify(newData),(err) =>{
        // console.log("in this one")
        // console.log(newData);
         res.json(newData)
    })

    // console.log(newInfo);

    
   
})


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
