import express from "express";
import passport from "passport";
import { loginFunc, signupFunc } from "./auth";
import mainRouter from "./routes";
import session from "express-session";
import config from "../config";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { onConnection } from "../messages/websockets";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static("public"));
const ttlSeconds = 60 * 10;

app.use(
  session({
    secret: config.SECRET_STORAGE_STRING || "secretts",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: ttlSeconds * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use("login", loginFunc);
passport.use("signup", signupFunc);

const myServer = http.createServer(app);
export const io = new Server(myServer, { cors: {} });

io.on("connection", onConnection);

app.use("/api", mainRouter);

app.use((req, res) => {
  res.status(404).json({
    data: "Undefined Path",
  });
});

export const initServer = (port: number) => {
  myServer.listen(port);
};
