const express = require('express');
const app = express();
const cors = require('cors')

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}).get('/root', cors(), (req, res) => {
    res.json({"alias": "GLEIF Root", "aid": ""})
}).get('/external', cors(), (req, res) => {
    res.json({"alias": "GLEIF External", "aid": ""})
}).listen(3000);
