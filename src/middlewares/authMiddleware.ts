import { verify } from "jsonwebtoken";
import { NextFunction } from "express";
import { Context, CustomRequest, CustomResponse } from "../types/Server";

export const AuthMiddleware = (request: CustomRequest<any, any, any, any>, response: CustomResponse<any>, next: NextFunction) => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    const token = authorization.replace("Bearer ", "");
    try {
        if (process.env.JWT_SECRET === undefined) throw new Error("JWT_SECRET is undefined");
        const { userId } = verify(token, process.env.JWT_SECRET) as Context;
        response.locals.userId = userId;
        return next();
    } catch (error) {
        return response.status(401).json({ error: "Unauthorized" });
    }
};
