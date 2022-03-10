const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //change back to true
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
},
    { 
        timestamps: true
    }
)

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo;