const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    // var newDish = Dishes({
    //     name: 'pizza',
    //     description: 'test'
    // });

    //alternate definition
    Dishes.create({
        name: 'pizza',
        description: 'test'
    })

    // newDish.save()
    .then((dish) => {
        console.log(dish);

        // return Dishes.find({}).exec();
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: 'Updated test'},
        },{
            new: true
        }).exec();
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'nice!!',
            author: 'Someone'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
        
        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});