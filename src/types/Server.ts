import { Request, Response, RequestHandler } from "express";

type Context = { userId: string };

export type CustomRequest<ParameterType, DataType, BodyType, QueryType> = Request<ParameterType, DataType, BodyType, QueryType, Context>;
export type CustomResponse<DataType> = Response<DataType, Context>;

export type CustomHandler<DataType, ParameterType, BodyType, QueryType> = (
    ...args: Parameters<RequestHandler<ParameterType, DataType, BodyType, QueryType, Context>>
) => Promise<any>;

export type RestMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
