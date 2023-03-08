import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import App from "./app";

dotenv.config();

const app: Express = express();



const server = new App(app);


server.init();
