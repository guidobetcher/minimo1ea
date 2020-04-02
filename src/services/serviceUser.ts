import {Request, Response, json, NextFunction} from 'express';
import User from '../models/User';
import * as jwt from "jsonwebtoken";
import passport from "passport";
//import {LocalStrategy} from "../auth/passportHandler";
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
            console.log('User added successfully');
            res.status(201).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        })
    }
}

function userLogin(req:Request,res:Response,next:NextFunction) {
    console.log('Logging in');
    if(!req.body.email || !req.body.password){
        return res.status(400).json({'msg':'You need to send email and password'});
    }

    User.findOne({email: req.body.email}, (err,user:any)=>{
        if(err){
            return res.status(400).json({'msg': err});
        }
        if(!user){
            return res.status(400).json({'msg': 'The user does not exists'});
        }

        user.comparePassword(req.body.password, (err: Error, isMatch: boolean) => {
            if(isMatch && !err){
                console.log('Logged in successfully');
                return res.status(200).json({
                    token: jwt.sign({email: user.email}, JWT_SECRET, {expiresIn: 60})
                })
            }
            else{
                return res.status(400).json({'msg': 'The email and password don\'t match.'});
            }
        })

    })
    /*function userLogin(req:Request,res:Response,next:NextFunction) {
    console.log('Logging in');
    passport.authenticate("local", function (err, user, info) {
        console.log("in authenticate")
        // no async/await because passport works only with callback ..
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ status: "error", code: "unauthorized" });
        } else {
            const token = jwt.sign({ email: user.email }, JWT_SECRET);
            res.status(200).send({ token: token });
        }
    });*/
}

export default{getUserById,addUser,userLogin};
