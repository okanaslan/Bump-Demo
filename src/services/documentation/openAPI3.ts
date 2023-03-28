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
        components: { schemas: {} },
    });

    static addPathDefinition(doc: OpenApiBuilder, name: string, pathDoc: PathItemObject) {
        const splited = name.split("/");
        for (let index = 0; index < splited.length; index++) {
            const element = splited[index]!;
            if (element[0] == ":") {
                splited[index] = `{{${element.substring(1)}}}`;
            }
        }
        const path = splited.join("/");
        doc.addPath(path, pathDoc);
    }
}
