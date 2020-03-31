import mongoose, {model} from 'mongoose';


function initiateDB (){
    mongoose.connect('mongodb://147.83.7.155:27017/Flat&Friend',(error)=>{
        if(!error)
        {
            console.log('Connection w/ DB Succesful!');    
        }
        else
        {
            console.log('Connection Error w/DB');
        }
    })
}
export {initiateDB};