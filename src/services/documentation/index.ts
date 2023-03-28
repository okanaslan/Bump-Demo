import { OpenAPI3 } from "./openAPI3";
import { JsonSchemaGenerator } from "./jsonSchemaGenerator";
import { ParameterObject, PathItemObject, ReferenceObject, SchemaObject } from "openapi3-ts";

import { createDirectory, getFileName, writeFile } from "../../utils/fileUtils";
import { EndPoint } from "../../endpoints";
import { getUserEndpoint } from "../../endpoints/auth/getUser";

export class DocumentationService {
    static documentEndpoints() {
        DocumentationService.addEndpoint(getUserEndpoint);

        const documentation = OpenAPI3.documentation.getSpec();
        writeFile({ filePath: "swagger.json", data: JSON.stringify(documentation) });

        console.log("Endpoints documanted");
        process.exit();
    }

    private static addEndpoint(endpoint: EndPoint<any, any, any, any>) {
        const { fileName, folderName } = getFileName({ filePath: endpoint.filePath });

        const schema = DocumentationService.saveEndpoint(endpoint);
        const bodySchema = schema?.properties?.body;
        const dataSchema = schema?.properties?.data;
        const paramsSchema = DocumentationService.schemaToParameter(schema?.properties?.params, "path");
        const querySchema = DocumentationService.schemaToParameter(schema?.properties?.query, "query");

        const pathDoc: PathItemObject = {};
        pathDoc[endpoint.method] = {
            operationId: fileName,
            tags: [folderName],
            parameters: endpoint.config.autharize
                ? [{ name: "token", in: "header" as const, required: true, schema: {} }, ...querySchema, ...paramsSchema]
                : [...querySchema, ...paramsSchema],
            requestBody:
                endpoint.method == "get"
                    ? undefined
                    : {
                          content: {
                              "application/json": {
                                  schema: bodySchema,
                              },
                          },
                      },
            responses: {
                default: {
                    description: "Success Response",
                    content: {
                        "application/json": {
                            schema: dataSchema,
                        },
                    },
                },
            },
        };

        OpenAPI3.addPathDefinition(OpenAPI3.documentation, endpoint.path, pathDoc);
    }

    private static saveEndpoint(endpoint: EndPoint<any, any, any, any>): SchemaObject | undefined {
        const { fileName, folderName } = getFileName({ filePath: endpoint.filePath });
        const schema = JsonSchemaGenerator.generateSchema(`${fileName}Documentation`);
        createDirectory({ dir: `./generated/${folderName}` });
        writeFile({ filePath: `./generated/${folderName}/${fileName}.json`, data: JSON.stringify(schema ?? {}) });
        return schema;
    }

    private static schemaToParameter(schema: SchemaObject | ReferenceObject | undefined, inside: "path" | "query"): ParameterObject[] {
        const parameters: ParameterObject[] = [];
        if (schema && "properties" in schema && schema.properties) {
            for (const property of Object.keys(schema.properties)) {
                parameters.push({ in: inside, name: property, required: true, schema: {} });
            }
        }
        return parameters;
    }
}
