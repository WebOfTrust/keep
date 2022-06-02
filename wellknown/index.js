const express = require('express');
const app = express();
const cors = require('cors')

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}).get('/.well-known/keri/oobi/E4tEHaAAg8LbvdyUwxchP9WO_lZ2vtXyyFFKmTxVGY9U', cors(), (req, res) => {
    console.log("rooting E4tEHaAAg8LbvdyUwxchP9WO_lZ2vtXyyFFKmTxVGY9U")
    res.redirect('http://127.0.0.1:5642/oobi/E4tEHaAAg8LbvdyUwxchP9WO_lZ2vtXyyFFKmTxVGY9U/witness/BGKVzj4ve0VSd8z_AmvhLg4lqcC_9WYX90k03q-R_Ydo')
}).get('/external', cors(), (req, res) => {
    res.json({
        "alias": "GLEIF External",
        "oobi": ""
    });
}).listen(3000);
