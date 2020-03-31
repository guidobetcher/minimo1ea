"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: false },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    idPiso: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Flat' },
    password: { type: String, required: true }
});
exports.default = mongoose_1.model('User', UserSchema);
