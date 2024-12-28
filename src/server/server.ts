import express from "express";
import cors from "cors";
import { welcomeRouter } from "../modules/welcome/welcomeRoute";
import { routeNotFoundHandler } from "./routeNotFoundHandler";
import { errorHandler } from "./errHandler";
import { authRouter } from "../modules/auth/authRouter";
import { accountsRouter } from "../modules/account/accountsRouter";
import { categoriesRouter } from "../modules/categories/categoriesRouter";
import { suppliersRouter } from "../modules/suppliers/suppliersRouter";
import { productsRouter } from "../modules/products/productsRouter";

// server

const server = express();

// middlewares

server.use(cors());
server.use(express.json());

// routes

server.use("", welcomeRouter);
server.use("/auth", authRouter);
server.use("/accounts", accountsRouter);
server.use("/categories", categoriesRouter);
server.use("/suppliers", suppliersRouter);
server.use("/products", productsRouter);

// handlers

server.use(routeNotFoundHandler);
server.use(errorHandler);

export default server;
