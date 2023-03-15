import { EndPoint } from "..";
import { Empty } from "../../types/Empty";
import { Documentation } from "../../types/Documentation";
import { CustomHandler } from "../../types/Server";
import { User, UserStatus } from "../models/user";

export type DataType = {
    user: Omit<User, "password">;
    token: string;
};
export type ParameterType = Empty;
export type BodyType = {
    email: string;
};
export type QueryType = Empty;
export type registerDocumentation = Documentation<DataType, ParameterType, BodyType, QueryType>;

const register: CustomHandler<DataType, ParameterType, BodyType, QueryType> = async (request, response) => {
    const { email } = request.body;

    response.json({
        status: { success: true },
        data: {
            user: {
                status: UserStatus.pending,
                email: email,
            },
            token: ""
        },
    });
};

export const registerEndpoint = new EndPoint<DataType, ParameterType, BodyType, QueryType>("/user/register", "post", register, __filename, {
    document: "both",
    autharize: false,
});
