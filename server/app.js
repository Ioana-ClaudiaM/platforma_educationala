const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan(':method :url :status '));
app.use(cors());

app.get('/' , (req,res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello!</h1>");
})

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is successfully running and app is listening on port "+PORT);
    else{
        console.log("Error occured, server can't start "+error);
    }
})