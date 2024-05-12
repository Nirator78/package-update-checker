import Ajv from "ajv"
import { configFileSchema } from "../schemas/config-file.schema"

export const verifyConfigFileService = async (configContent: any) => {
	// Verify if config file has the correct schema
	const ajv = new Ajv()
	// Define the schema
	const validate = ajv.compile(configFileSchema)
	// Validate the schema
	if (!validate(configContent)) {
		console.error(validate.errors)
		throw new Error("Config file has the wrong schema")
	}
};