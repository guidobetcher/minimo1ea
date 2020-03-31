import { Request, Response, json } from 'express';
import User from '../models/User';

function getUserById(req:Request,res:Response){
    const idUser =  req.body.idUser || '';	;

    //We find the user
    User.findOne(({_id: idUser}),(err,doc)=>{
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