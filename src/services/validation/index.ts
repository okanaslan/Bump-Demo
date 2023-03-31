import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";

import { readFile, getFileDetails } from "../../utils/fileUtils";

export class Validation {
    private static ajv = new Ajv();

    static validateRequest<DataType>(filePath: string, body: DataType): void {
        const bodySchema = Validation.getEndpointSchema<DataType>(filePath, "body");
        Validation.validate(bodySchema, body);
    }

    private static validate<DataType>(schema: JSONSchemaType<DataType>, data: DataType): void {
        addFormats(Validation.ajv, ["date-time"]);
        const validator = Validation.ajv.compile<DataType>(schema);
        const validated = validator(data);
        if (!validated) {
            throw new Error(JSON.stringify(validator.errors));
        }
    }

    private static getEndpointSchema<DataType>(filePath: string, type: "body" | "params" | "query" | "data"): JSONSchemaType<DataType> {
        const { fileName, folderName } = getFileDetails({ filePath });
        const { file: schemaString } = readFile({ filePath: `./generated/${folderName}/${fileName}.json` });
        const schema = JSON.parse(schemaString);
        return schema.properties?.[type];
    }
}
