import { OpenApiBuilder, PathItemObject } from "openapi3-ts";

export class OpenAPI3 {
    static readonly documentation = new OpenApiBuilder({
        openapi: "3.1.0",
        info: {
            title: "API",
            description: "API",
            version: "1.0.0",
        },
        servers: [{ url: "http://localhost:{port}", description: "Local", variables: { port: { default: "3000" } } }],
        paths: {},
        tags: [],
    });

    static addPathDefinition(path: string, pathDoc: PathItemObject) {
        // In the express server path a parameter is defined as :parameter.
        // We need to change it to {{parameter}} to be compatible with openapi3-ts
        const splited = path.split("/");
        for (let index = 0; index < splited.length; index++) {
            const element = splited[index]!;
            if (element[0] == ":") {
                splited[index] = `{{${element.substring(1)}}}`;
            }
        }
        const convertedPath = splited.join("/");
        OpenAPI3.documentation.addPath(convertedPath, pathDoc);
    }
}
