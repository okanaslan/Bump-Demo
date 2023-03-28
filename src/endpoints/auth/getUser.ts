import { EndPoint } from "..";
import { Documentation } from "../../types/Documentation";
import { CustomHandler } from "../../types/Server";
import { User, UserStatus } from "../../models/user";

type DataType = {
    user: Omit<User, "password">;
};
type ParameterType = {
    userId: string;
};
type BodyType = {
    email: string;
};
type QueryType = { status: UserStatus };

const getUser: CustomHandler<DataType, ParameterType, BodyType, QueryType> = async (request, response) => {
    const { email } = request.body;

    response.json({
        user: {
            status: UserStatus.pending,
            email: email,
        },
    });
};

export type getUserDocumentation = Documentation<DataType, ParameterType, BodyType, QueryType>;
export const getUserEndpoint = new EndPoint<DataType, ParameterType, BodyType, QueryType>("/user/:userId", "get", getUser, __filename, { autharize: false });
