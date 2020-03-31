"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceUser_1 = __importDefault(require("../services/serviceUser"));
const router = express_1.Router();
router.get('/getUser', serviceUser_1.default.getUserById);
router.post('/addUser', serviceUser_1.default.addUser);
exports.default = router;
