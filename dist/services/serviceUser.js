"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
function getUserById(req, res) {
    const idUser = req.query.idUser || '';
    console.log('Searching user by Id...');
    //We find the user
    User_1.default.findById(idUser, (err, doc) => {
        if (!err) {
            console.log(doc);
            res.status(200).json(doc);
        }
        else {
            res.status(404);
        }
    });
}
function addUser(req, res) {
    console.log('Adding User');
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const newUser = new User_1.default({ firstname, lastname });
    newUser.save().then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(500).json(err);
    });
}
exports.default = { getUserById, addUser };
