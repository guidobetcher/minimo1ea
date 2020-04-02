import {Request, Response, json, NextFunction} from 'express';
import User from '../models/User';
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/passportHandler";
import {JWT_SECRET} from "../util/secrets";
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
        console.log('User added successfully');
        res.status(201).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })

}

function userLogin(req:Request,res:Response,next:NextFunction) {
    console.log('Logging in');
    passport.authenticate("local", function (err, user, info) {
        // no async/await because passport works only with callback ..
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ status: "error", code: "unauthorized" });
        } else {
            const token = jwt.sign({ email: user.email }, JWT_SECRET);
            res.status(200).send({ token: token });
        }
    });
};

export default{getUserById,addUser,userLogin};
