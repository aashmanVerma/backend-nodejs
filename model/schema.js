const mongoose = require('mongoose');

const cryptoSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'please provide name']
    },
    last : {
        type : Number,
    },
    buy : {
        type : Number
    },
    sell : {
        type : Number
    },
    volume : {
        type : Number
    },
    base_unit : {
        type : String
    }
})

const cryptoModel = mongoose.model('crypto',cryptoSchema);

module.exports = cryptoModel;