const { MongooseError } = require('mongoose');

exports.exactErrorMsg = (error) => {
    const isInstanceOfMongoose = error instanceof MongooseError
    console.log({isInstanceOfMongoose});
    console.log({error});
    if(isInstanceOfMongoose) {
        const errors = Object.values(error.errors);
        return errors.map(err => err.message)
    }


    return [error.message];
};