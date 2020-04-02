import {Secret} from "jsonwebtoken";

export const MONGODB_URI = "mongodb://eadb:passwordgrupo1ea@147.83.7.155:27017/Flat&Friend?authSource=admin";

if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}


export const JWT_SECRET:Secret = "secretoJWT" as Secret;

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
