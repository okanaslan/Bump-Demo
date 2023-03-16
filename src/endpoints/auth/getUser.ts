import { EndPoint } from "..";
import { Documentation } from "../../types/Documentation";
import { CustomHandler } from "../../types/Server";
import { User, UserStatus } from "../models/user";

export type DataType = {
    user: Omit<User, "password">;
    token: string;
};
export type ParameterType = {
    userId: string;
};
export type BodyType = {
    email: string;
};
export type QueryType = { status: UserStatus };
export type getUserDocumentation = Documentation<DataType, ParameterType, BodyType, QueryType>;

const getUser: CustomHandler<DataType, ParameterType, BodyType, QueryType> = async (request, response) => {
    const { email } = request.body;

    response.json({
        status: { success: true },
        data: {
            user: {
                status: UserStatus.pending,
                email: email,
            },
            token: "",
        },
    });
};

export const getUserEndpoint = new EndPoint<DataType, ParameterType, BodyType, QueryType>("/user/:userId", "get", getUser, __filename, {
    document: "both",
    autharize: false,
});
