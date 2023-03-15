import { Request, Response, NextFunction, RequestHandler } from "express";

type ResponseBodyStatus = { success: boolean; reason?: string; code?: number };
export type CustomResponseBody<DataType> = { status: ResponseBodyStatus; index?: number; data?: DataType };
type CustomLocals = { userId: string };

export type CustomRequest<ParameterType, DataType, BodyType, QueryType> = Request<ParameterType, CustomResponseBody<DataType>, BodyType, QueryType, CustomLocals>;
export type CustomResponse<DataType> = Response<CustomResponseBody<DataType>, CustomLocals>;
export type CustomNext = NextFunction;
export type CustomHandler<DataType, ParameterType, BodyType, QueryType> = (
    ...args: Parameters<RequestHandler<ParameterType, CustomResponseBody<DataType>, BodyType, QueryType, CustomLocals>>
) => Promise<any>;
export type RestMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
