import { RequestHandler } from "express";

export type Context = { userId: string };

export type CustomHandler<DataType, ParameterType, BodyType, QueryType> = RequestHandler<ParameterType, DataType, BodyType, QueryType, Context>;

export type RestMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
