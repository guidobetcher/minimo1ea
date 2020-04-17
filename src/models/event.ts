import {Schema, model} from 'mongoose'

/**
 * Definition of student schema
 */
const eventSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true}
});

/**
 * Export the student schema
 * @type {Model}
 */
export default model('Event', eventSchema);
