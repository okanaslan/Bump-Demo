export type Documentation<DataType, ParameterType, BodyType, QueryType> = {
    body: BodyType;
    params: ParameterType;
    query: QueryType;
    data: DataType;
};
