import {FileContext} from "@/context/FileContext";

export const FILE_PATH = "http://localhost:8000/files/download/";

export function getFilePath(file: FileContext): string {
    return FILE_PATH + file.filePath.split("/")[1];
}