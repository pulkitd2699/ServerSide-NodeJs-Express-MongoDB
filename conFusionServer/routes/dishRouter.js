const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
// .all((req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();  // will continue for further methods (get,put,post,delete) below
// })
.get((req,res,next) => {
    // res.end('Will send all the dishes to you!');
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) => {
    // res.end('Will add the dish: ' + req.body.name + 'with details : ' + req.body.description);
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res) => {
    res.statusCode = 403;
    res.end('put operation not supported');
})
.delete((req,res) => {
    // res.end('Will delete all the dishes!');
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//for dishID
dishRouter.route('/:dishID')
// .all((req,res,next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// })
.get((req,res,next) => {
    // res.end('Will send details of the dish: ' + req.params.dishID + ' to you.');
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) => {
    res.statusCode = 403;
    res.end('post operation not supported on /dishes/' + req.params.dishID);
})
.put((req,res) => {
    // res.write('updating the dish: ' + req.params.dishID + '\n');
    // res.end('Will update the dish: ' + req.body.name + 'with details : ' + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishID, {
        $set: req.body
    }, {new: true})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res) => {
    // res.end('Deleting dish: ' + req.params.dishID);
    Dishes.findByIdAndRemove(req.params.dishID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


//handing /dishID/comments --------------------
dishRouter.route('/:dishID/comments')

.get((req,res,next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        }
        else{
            err = new Error('Dish ' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null){
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
        }
        else{
            err = new Error('Dish ' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('put operation not supported');
})
.delete((req,res) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null){
            for(var i = (dish.comments.length - 1); i>= 0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
        }
        else{
            err = new Error('Dish ' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
// -------------------------------------------------------------


//handling  /dishID/comments/commentID ---------------
dishRouter.route('/:dishID/comments/:commentID')
.get((req,res,next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null && dish.comments.id(req.params.commentID) != null){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentID));
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment ' + req.params.commentID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) => {
    res.statusCode = 403;
    res.end('post operation not supported on /dishes/' + req.params.dishID + '/comments/' + req.params.commentID);
})
.put((req,res,next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null && dish.comments.id(req.params.commentID) != null){
            if(req.body.rating){
                dish.comments.id(req.params.commentID).rating = req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentID).comment = req.body.comment;
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment ' + req.params.commentID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        if(dish!=null && dish.comments.id(req.params.commentID) != null){
            dish.comments.id(req.params.commentID).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
        }
        else if (dish == null){
            err = new Error('Dish ' + req.params.dishID + ' not found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment ' + req.params.commentID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});
// ----------------------------------------------------------

module.exports = dishRouter;