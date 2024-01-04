"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const logger = (request, response) => {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const data = `${hour}:${minutes}:${seconds} ${request.method}, URL - ${request.url}, Agent - ${request.get("user-agent")}`;
    fs_1.default.appendFile("server.log", data + "\n", (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
};
exports.logger = logger;
