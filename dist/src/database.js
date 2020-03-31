"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function initiateDB() {
    mongoose_1.default.connect('mongodb://147.83.7.155:27017/Flat&Friend', (error) => {
        if (!error) {
            console.log('Connection w/ DB Succesful!');
        }
        else {
            console.log('Connection Error w/DB');
        }
    });
}
exports.initiateDB = initiateDB;
