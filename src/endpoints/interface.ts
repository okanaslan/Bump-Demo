import { EndpointConfig } from ".";
import { Documentation } from "../types/Documentation";
import { CustomHandler, RestMethod } from "../types/Server";

export interface IEndPoint<DataType, ParameterType, BodyType, QueryType> {
    type: Documentation<DataType, ParameterType, BodyType, QueryType>;
    filePath: string;
    path: string;
    method: RestMethod;
    handler: CustomHandler<DataType, ParameterType, BodyType, QueryType>;
    config: EndpointConfig;
    call: CustomHandler<DataType, ParameterType, BodyType, QueryType>;
}
