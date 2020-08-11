const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const db = require('../models')
const ConsoleUser = db.ConsoleUser
const bcrpyt = require('bcrypt')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  async function (req, username, password, done) {
    try {
      const user = await ConsoleUser.findOne({
        where: {
          email: username,
        }
      })

      if (!user) {
        return done(null, false, { message: '帳號或密碼錯誤' });
      }
      if (!bcrpyt.compareSync(password, user.password)) {
        return done(null, false, { message: '帳號或密碼錯誤' })
      }

      return done(null, user);
    } catch (err) {
      if (err) { return done(err); }
    }

  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return ConsoleUser.findByPk(id)
    .then(user => {
      return done(null, user)
    })
});

const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy,
  ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const user = await ConsoleUser.findByPk(jwt_payload.id)

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    if (err) {
      return done(err, false);
    }
  }
}
));

module.exports = passport