"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FlatSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    maxPersons: { type: Number, required: true },
    location: [
        {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        }
    ]
});
exports.default = mongoose_1.model('Flat', FlatSchema);
