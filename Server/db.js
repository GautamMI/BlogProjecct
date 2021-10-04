const mongoose=require('mongoose');
const config=require('../src/config/config');
const connect=(async()=>{
    try{
        await mongoose.connect(config.db);
        console.log('Successfully Connected to DB');
    }catch(error){
        console.log('Error occured '+error);
    }
    
})

connect();

exports.connect=connect;