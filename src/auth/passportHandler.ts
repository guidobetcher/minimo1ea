import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import User from "../models/User";
import { JWT_SECRET } from "../util/secrets";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
        console.log("In the LocalStrategy");
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: (JWT_SECRET as string)
    },
    function (jwtToken, done) {
        User.findOne({ email: jwtToken.email }, function (err, user) {
            if (err) { return done(err, false); }
            if (user) {
                return done(undefined, user , jwtToken);
            } else {
                return done(undefined, false);
            }
        });
    })
);

