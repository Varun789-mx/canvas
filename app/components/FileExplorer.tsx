import { useState } from "react";
import { FileStructureType, FileType } from "../lib/Types";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";

function Directory({ FileStructure }: { FileStructure: FileStructureType }) {
    const [Expanded, setExpanded] = useState(true);

    if (FileStructure.type === FileType.file) {
        return (
            <div className="flex items-center gap-2 px-3 py-1 hover:bg-gray-700/50 cursor-pointer text-gray-300 text-sm">
                <File size={16} className="text-gray-400 shrink-0" />
                <span>{FileStructure.name}</span>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div
                className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700/50 cursor-pointer text-gray-200 text-sm"
                onClick={() => setExpanded(!Expanded)}
            >
                {Expanded ? (
                    <ChevronDown size={16} className="shrink-0" />
                ) : (
                    <ChevronRight size={16} className="shrink-0" />
                )}
                <Folder size={16} className="text-gray-400 shrink-0" />
                <span className="font-normal">{FileStructure.name}</span>
            </div>
            {Expanded && FileStructure.items && (
                <div className="pl-4">
                    {FileStructure.items.map((item, index) => (
                        <Directory key={index} FileStructure={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Directory;