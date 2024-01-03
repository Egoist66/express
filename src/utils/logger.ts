import fs from "fs";
import {Request, Response} from "express";

export const logger = (request: Request, response: Response) => {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `${hour}:${minutes}:${seconds} ${request.method}, URL - ${request.url}, Agent - ${request.get("user-agent")}`;

    fs.appendFile("server.log", data + "\n", (err) => {
        if(err){
            console.log(err);
            return
        }
    });
}
