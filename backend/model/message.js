const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const message = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
    }
}, {timestamps: true});

const Message =  mongoose.model("Message", message);

module.exports=Message;