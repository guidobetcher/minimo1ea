import {Schema, model} from 'mongoose'

const FlatSchema: Schema = new Schema({

    name:{type:String, required:true},
    description:{type:String,required:false},
    maxPersons:{type:Number,required:true},
    location:[
        {
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true}
        }
    ]

});
export default model('Flat', FlatSchema);