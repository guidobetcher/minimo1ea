import {Request, Response, json, NextFunction} from 'express';
import Event from '../models/event';
import "../auth/passportHandler";



//Register new event into the database

async function addEvent(req:Request,res:Response) {
    console.log("ADD EVENT");
    let {name,description,date}= req.body; //Parsing everything
    const newEvent = new Event({name, description, date});
    await newEvent.save().then((data)=> {
        res.status(201).json(data);
    }).catch((err)=> {
        res.status(500).json(err);
    })
}

async function getEvents(req:Request,res:Response) {
    console.log("GET ALL EVENTS");
    let events = await Event.find().populate('events');
    if (events) {
        res.status(200).json(events)
    } else {
        res.status(424).send({message: 'Events not found'})
    }
}

async function updateEvent(req:Request,res:Response) {
//     console.log("UPDATE EVENT");
//     let {name,description,date}= req.body; //Parsing everything
//     const updatedEvent = req.body;
//     await updatedEvent.save().then((data)=> {
//         res.status(201).json(data);
//     }).catch((err)=> {
//         res.status(500).json(err);
//     })
}


export default{addEvent, getEvents, updateEvent};
