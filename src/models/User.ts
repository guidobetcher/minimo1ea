import {Schema, model} from 'mongoose'
import bcrypt from "bcrypt-nodejs";

const UserSchema: Schema = new Schema({

    firstname: { type: String, required: true},
    lastname: {type: String, required: true},
    email: {type:String,required:true, unique:true},
    phoneNumber: {type:String, required:true},
    idPiso: {type:Schema.Types.ObjectId, ref: 'Flat'},
    password: {type:String,required:true}
});

UserSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
    console.log(candidatePassword,this.password);
    if (candidatePassword===this.password) {
        callback(false,true);
    } else {
        callback(false,false);
    }
    // bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    //     console.log(isMatch);
    //     callback(err, isMatch);
    // });
};

export default model('User', UserSchema);
