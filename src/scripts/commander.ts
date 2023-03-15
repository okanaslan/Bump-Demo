import { program } from "commander";
import { DocumentationService } from "../services/documentation";

program.name("commander").description("CLI to run scripts").version("1.0.0");

program.command("documentEndpoints").action(async () => {
    try {
        DocumentationService.documentEndpoints();
    } catch (error) {
        console.error(error);
        process.exit();
    }
});


program.parse();
