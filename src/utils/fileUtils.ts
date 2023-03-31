import { readdirSync, writeFileSync, existsSync, mkdirSync, readFileSync } from "fs";

export function getFileDetails({ filePath }: { filePath: string }) {
    const splittedPath = filePath.replace(/\\/g, "/").split("/");
    const fileName = splittedPath.pop()?.split(".")[0] ?? "unknown";
    const folderName = splittedPath.pop() ?? "unknown";
    return { fileName, folderName };
}

export function createDirectory({ dir }: { dir: string }) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}

export function writeFile({ filePath, data }: { filePath: string; data: string }) {
    writeFileSync(filePath, data, "utf8");
}

export function readFile({ filePath }: { filePath: string }) {
    const file = readFileSync(filePath, "utf8");
    return { file };
}

export function readDirectory({ path }: { path: string }) {
    const files = readdirSync(path);
    return { files };
}
