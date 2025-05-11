import express from 'express';
import fs, { readFileSync } from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import { getProverb, saveProverb } from './utils/fileHelper.js';
import { stringify } from 'querystring';

const app = express();
const PORT = 3001;

const proverbJSON = readFileSync("proverb.json", "utf-8");
const proverbs = JSON.parse(proverbJSON);
app.use(express.urlencoded({extended: true}));
app.use(express.static("pubic"));

app.get("/",(req,res)=>{
  
    res.render("index.ejs", {proverbs});
})

app.get("/add",(req,res)=>{
    res.render("add.ejs")  
})

app.post('/proverb', (req,res)=>{
    const proverbs = getProverb();
    proverbs.push({
        id: proverbs.lenght + 1,
        textDari: req.body,
        textPashto: req.body,
        translation: req.body,
        meaning: req.body

    })
    saveProverb(proverbs);
    res.redirect('/')

})

app.put('/proverb/:id', (req,res)=>{
    const data = fs.readFileSync('proverb.json')
    const proverbs = JSON.parse(data)
    const index = proverbs.findIndex(p=>p.id === req.params.id)
    if (index === -1) {
        return res.status(404).json({ error: 'Proverb not found' });
      }
      
     res.send({message: "updated"})
    

});

app.delete('/proverb/id', (req,res)=>{


    const proverbs = getProverb();
    proverbs.splice(req.params.id,1);
    saveProverb(proverbs);
}
)


app.listen(PORT,()=>{
    console.log("server is running")
})
