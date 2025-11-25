import express from 'express';
const app = express();

import fs from 'fs';

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
    res.send(`<h1>Real-Time Text Reverse</h1>
        <form method="POST" action="/reverse">
        <input name="text" required/>
        <input type="submit" value="Reverse"/>
        </form>`);
})

app.post('/reverse', (req, res)=>{
    const str = req.body.text;
    const reversed = str.split('').reverse().join('');
    fs.appendFile('reversed.txt', reversed + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else{
            console.log('Reversed text saved to reversed.txt');
        }
    });
    res.send(`<h1>Reversed Text:</h1> 
        <p>${reversed}</p>`);
});

app.listen(3000);