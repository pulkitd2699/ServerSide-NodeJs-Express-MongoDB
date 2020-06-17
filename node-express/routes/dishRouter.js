const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();  // will continue for further methods (get,put,post,delete) below
})
.get((req,res) => {
    res.end('Will send all the dishes to you!');
})
.post((req,res) => {
    res.end('Will add the dish: ' + req.body.name + 'with details : ' + req.body.description);
})
.put((req,res) => {
    res.statusCode = 403;
    res.end('put operation not supported');
})
.delete((req,res) => {
    res.end('Will delete all the dishes!');
});

//for dishID
dishRouter.route('/:dishID')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res) => {
    res.end('Will send details of the dish: ' + req.params.dishID + ' to you.');
})
.post((req,res) => {
    res.statusCode = 403;
    res.end('post operation not supported on /dishes/' + req.params.dishID);
})
put((req,res) => {
    res.write('updating the dish: ' + req.params.dishID + '\n');
    res.end('Will update the dish: ' + req.body.name + 'with details : ' + req.body.description);
})
.delete((req,res) => {
    res.end('Deleting dish: ' + req.params.dishID);
});

module.exports = dishRouter;