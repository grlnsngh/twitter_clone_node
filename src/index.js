import express from "express";
import Server from "./server";

//global express instance, act as singleton class
const app = express();

const server = new Server(app);
server.startServer();
