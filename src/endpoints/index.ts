import { CustomHandler, RestMethod } from "../types/Server";

type EndpointConfig = { autharize: boolean };

export class EndPoint<DataType, ParameterType, BodyType, QueryType> {
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
        config: EndpointConfig
    ) {
        this.filePath = filePath;
        this.path = path;
        this.method = method;
        this.handler = handler;
        this.config = config;
    }
}
