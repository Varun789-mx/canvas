export enum FileType {
    file = "file",
    folder = "folder",
}
export interface FileNode {
    name: string;
    type: FileType.file;
    content: string;
}
export interface FolderNode {
    name: string;
    type: FileType.folder;
    items: FileStructureType[];
}
export type FileStructureType = FolderNode | FileNode;