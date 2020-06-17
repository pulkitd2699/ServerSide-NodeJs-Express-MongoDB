const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

// app.all('/dishes', (req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();  // will continue for further methods (get,put,post,delete) below
// });

// app.get('/dishes', (req,res) => {
//     res.end('Will send all the dishes to you!');
// });

// app.post('/dishes', (req,res) => {
//     res.end('Will add the dish: ' + req.body.name + 'with details : ' + req.body.description);
// });

// app.put('/dishes', (req,res) => {
//     res.statusCode = 403;
//     res.end('put operation not supported');
// });

// app.delete('/dishes', (req,res) => {
//     res.end('Will delete all the dishes!');
// });

//-------------for /dishes:dishID --------------
// app.get('/dishes/:dishID', (req,res) => {
//     res.end('Will send details of the dish: ' + req.params.dishID + ' to you.');
// });

// app.post('/dishes/:dishID', (req,res) => {
//     res.statusCode = 403;
//     res.end('post operation not supported on /dishes/' + req.params.dishID);
// });

// app.put('/dishes/:dishID', (req,res) => {
//     res.write('updating the dish: ' + req.params.dishID + '\n');
//     res.end('Will update the dish: ' + req.body.name + 'with details : ' + req.body.description);
// });

// app.delete('/dishes/:dishID', (req,res) => {
//     res.end('Deleting dish: ' + req.params.dishID);
// });

//------------ending here-----------

app.use('/dishes', dishRouter);   // mount the express router to main js file
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

app.use(express.static(__dirname + '/public'));  //to serve only static pages

app.use((req,res,next) => {
    // console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an express server</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`);
});