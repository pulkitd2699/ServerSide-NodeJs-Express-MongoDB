const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema); //mongoose model automatically 
// creates a plural name of model as a collection in mongodb

module.exports = Dishes;