import {Schema, model} from 'mongoose'

const UserSchema: Schema = new Schema({

    firstname: { type: String, required: true},
    lastname: {type: String, required: true},
    email: {type:String,required:true, unique:true},
    phoneNumber: {type:String, required:true},
    idPiso: {type:Schema.Types.ObjectId, ref: 'Flat'},
    password: {type:String,required:true}
});

export default model('User', UserSchema);