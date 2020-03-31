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
function addUser(req:Request, res:Response){
    console.log('Adding User');
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const newUser = new User({firstname,lastname});
    newUser.save().then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })

}

export default{getUserById,addUser};