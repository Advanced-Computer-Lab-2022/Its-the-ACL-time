const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examschema = new Schema({
    coruse:{
        type:Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    duration:{
        hours: Number,
        minutes: Number,
        seconds: Number
    },

    questions:[{type:Schema.Types.ObjectId, ref:"Question"}],

    grade:{
        type:Number,
    },
    
});

module.exports = mongoose.model('Exam', examschema);
