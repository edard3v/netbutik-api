import { Application, NextFunction, Request, Response } from "express";

export type App = Application;
export type Req = Request;
export type Res = Response;
export type Next = NextFunction;
export type Middleware = (req: Req, res: Res, next: Next) => void;
export type Controller = (req: Req, res: Res, next: Next) => void;
export type RouteNotFoundHandler = (req: Req, res: Res) => void;
export type ErrHandler = (err: any, req: Req, res: Res, next: Next) => void;
