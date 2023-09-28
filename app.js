const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const model = require('./model');
const router = require('./router');

const HOST = model.HOST;
const POST = model.POST;

const app = express();
app.use(express.static('public'));

app.use(morgan('dev'));

app.use(helmet());

app.use(router());

app.listen(PORT, (error) => {
    error? console.log(error) : console.log(`server started: http://localhost:${PORT}`);
});


app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.use((error, req, res) => {
    res.status(500).send(error);
});