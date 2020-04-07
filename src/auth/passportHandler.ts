import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import User from "../models/User";
import { JWT_SECRET } from "../util/secrets";


const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(username, password, done) {
        console.log('In Local Strategy');
        User.findOne({ email: username.toLowerCase() }, (err, user: any) => {
            console.log("In the LocalStrategy");
            if (err) { return done(err); }
            if (!user) {
                return done(undefined, false, { message: `email ${username} not found.` });
            }
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(undefined, user);
                }
                return done(undefined, false, { message: "Invalid email or password." });
            });
        });
    }
));

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

