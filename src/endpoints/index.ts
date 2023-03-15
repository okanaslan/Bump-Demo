import { Express } from "express";

import { CustomHandler, RestMethod } from "../types/Server";
import { Documentation } from "../types/Documentation";
import { IEndPoint } from "./interface";

export type EndpointConfig = {
    document: "internal" | "external" | "both" | "none";
    autharize: boolean;
};

export class EndPoint<DataType, ParameterType, BodyType, QueryType> implements IEndPoint<DataType, ParameterType, BodyType, QueryType> {
    type!: Documentation<DataType, ParameterType, BodyType, QueryType>;
    filePath: string;
    path: string;
    method: RestMethod;
    handler: CustomHandler<DataType, ParameterType, BodyType, QueryType>;
    config: EndpointConfig;

    constructor(
        path: string,
        method: RestMethod,
        handler: CustomHandler<DataType, ParameterType, BodyType, QueryType>,
        filePath: string,
        config: EndpointConfig,
    ) {
        this.filePath = filePath;
        this.path = path;
        this.method = method;
        this.handler = handler;
        this.config = config;
    }

    call: CustomHandler<DataType, ParameterType, BodyType, QueryType> = async (request, response, next) => {
        try {
            await this.handler(request, response, next);
        } catch (error) {
            console.error(error);
            response.json({ status: { success: false, reason: JSON.stringify(error) } });
        }
    };

    listen = async (expressServer: Express) => {
        switch (this.method) {
            case "get":
                expressServer.get(this.path, this.call);
                break;
            case "put":
                expressServer.put(this.path, this.call);
                break;
            case "post":
                expressServer.post(this.path, this.call);
                break;
            case "delete":
                expressServer.delete(this.path, this.call);
                break;
        }
    };
}
