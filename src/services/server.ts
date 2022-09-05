import express from 'express';
import passport from 'passport';
import { loginFunc, signupFunc } from './auth';
import mainRouter from './routes';
import session from 'express-session';
import config from '../config';

const app = express();

app.use(express.json())



const ttlSeconds = 60 * 10;

app.use(session({
    secret: config.SECRET_STORAGE_STRING || 'secretts',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlSeconds * 1000.
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('login',loginFunc);
passport.use('signup',signupFunc);

app.use('/api', mainRouter);

app.use((req,res)=>{
    res.status(404).json({
        data:'Undefined Path'
    })
})

export const initServer = (port: number) => {
    app.listen(port, () => {});
};