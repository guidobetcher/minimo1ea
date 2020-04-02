import { Request, Response, json } from 'express';
import User from '../models/User';
import {Schema, model} from 'mongoose'

function getUserById(req:Request,res:Response){
    const idUser  =  req.query.idUser || '';	
    console.log('Searching user by Id...');
    //We find the user
    User.findById(idUser,(err,doc)=>{
        if(!err)
       {
           console.log(doc);
        res.status(200).json(doc);
       }
       else
       {
        res.status(404);
       }
    });
}
//Register new user into the database
async function addUser(req:Request, res:Response){
    const email = req.body.email;
    let existUser = await User.findOne({email: email});
    if(existUser){
        res.status(409).json({message:"Already exist a user w/ this email"});
    }
    else{
    console.log('Adding User');
    let {firstname,lastname,email,phoneNumber,idPiso,password}= req.body; //Parsing everything 
    const newUser = new User({firstname,lastname,email,phoneNumber,idPiso,password});
    newUser.save().then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })   
    }
}

export default{getUserById,addUser};

//PROMISE FUNCTION
// function existUser(emailUser:String):Promise<Boolean>{

//     console.log(emailUser);
//     var answer:Promise<Boolean> = new Promise<Boolean> ((resolve,reject)=>{
//         User.findOne(({email : emailUser}),(err,doc)=>{
//             if(!err)
//            {
//                if(doc == null){
//                    console.log(doc);
//                    resolve(false)
//                }
//                else{
//                console.log('EXIST')
//                console.log(''+doc);
//                resolve(true); 
//                } 
//            }
//         });
//     });
//     return answer ;
// }