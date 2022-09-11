import passport from "passport";
import { Strategy } from "passport-local";
import { UserModel } from "../users/users.model";
import { Request } from "express";
//import NotifyNewUserEmail

export let userId = "";

const login = async (
  req: Request,
  username: string,
  password: string,
  done: any
) => {
  const user = await UserModel.findOne({ email: username });
  if (!user) {
    return done(null, false, { data: "Invalid email or password" });
  }
  const samePass = await user.isValidPassword(password);
  if (!samePass) {
    return done(null, false, { data: "Invalid password" });
  }
  userId = user._id.toString();
  return done(null, user);
};

const signup = async (
  req: Request,
  username: string,
  password: string,
  done: any
) => {
  try {
    const { email, password, name, phone, admin, adress } = req.body;
    console.log(req.body);
    const adm = admin != undefined;
    const newUser = await UserModel.create({
      email,
      password,
      name,
      phone,
      adress,
      admin: adm,
    });
    return done(null, newUser);
  } catch (err: any) {
    if (err.code == 11000) {
      return done(null, false, { message: "Email already used" });
    }
    return done(null, false, { data: err.message });
  }
};

export const loginFunc = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  login
);
export const signupFunc = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  signup
);

passport.serializeUser((user: any, done) => {
  console.log("Ejecutando serializeUser");
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  console.log("Ejecutando DEserializeUser");
  return done(null, user);
});
