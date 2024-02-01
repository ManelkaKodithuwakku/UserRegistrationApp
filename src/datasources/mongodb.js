const mongoose = require('mongoose');

module.exports = () => {
    // const connectionParams = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // };

    try{
        // mongoose.connect(process.env.DB_URI,connectionParams);
        mongoose.connect(process.env.DB_URI);
        console.log("Connected to database successfully");
    }catch(err){
        console.log(err);
        console.log("Could not connect to database");
    }
}