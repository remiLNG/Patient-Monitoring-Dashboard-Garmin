const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwT = require('passport-jwt').ExtractJwt;
const User = require('../model/User');
const key = require('./keys').secret;

const opts = {};
opts.jwtFromRequest = ExtractJwT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload._id).then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }).catch(err => {
                console.log(err);
            });
        })
    );
};