import { SchemaObject } from "openapi3-ts";
import { createGenerator } from "ts-json-schema-generator";

export class JsonSchemaGenerator {
    static instance = createGenerator({
        path: "./src/endpoints/**/*.ts",
        tsconfig: "./tsconfig.json",
        expose: "none",
        additionalProperties: false,
        jsDoc: "extended",
        skipTypeCheck: true,
    });

    static generateSchema(type: string): SchemaObject | undefined {
        try {
            const schema = JsonSchemaGenerator.instance.createSchema(type);
            return schema.definitions![Object.keys(schema.definitions!)[0]!] as SchemaObject | undefined;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}
