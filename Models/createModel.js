const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        
    },
    description: {
        type: String,
        required:true

    },
    username: { 
        type: String,
        // required:true

    },
    categories:{
        type: String,
        required:true

    },
    createdDate: {  // Update field name to match request body
        type: Date,
    },
    picture:{
        type:String,
    }
});

// Create model or collection 
const createmodelSchema = mongoose.model('postCreate', createSchema); // 'User' is a singular name for the collection
module.exports = createmodelSchema;
