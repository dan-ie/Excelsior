import axios from "axios";
import {useState} from "react"

type ExistingFile = {
    name: string;
    path?: string;
    size?: number;
    [key: string]: any;
}

type Props = {
    projectId: number;
    existingFile?: ExistingFile | null;
}

const formatBytes = (bytes?: number) => {
    if (!bytes && bytes !== 0) return "";
    if (bytes === 0) return "0 KB";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
}

export default function FileContainer({projectId, existingFile}:Props){
    const [file, setFile] = useState<any>(null)
    const [status, setStatus] = useState("")
    const [showUploader, setShowUploader] = useState(!existingFile)

    const saveFile = (e) => { //e for event 
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            handleSubmission(selectedFile, e);
        }
    }

    const handleSubmission = async (selectedFile: any, e: any) => {
        if (!selectedFile) {
            setStatus('Error, no file selected')
            return
        }
    
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            setStatus("Uploading file")

            const response = await axios.post(`/projects/${projectId}/file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            if (response.data.success) {
                setStatus("File upload successful")
            }
        }
        catch (error) {
            setStatus(`File upload encountered an error`)
        } finally {
            e.target.value = "";
        }
    }

    const displayName = file ? file.name : existingFile?.name;
    const displaySize = file ? file.size : existingFile?.size;

    return(
        <div className="flex flex-col gap-3 w-full">
            {!showUploader && existingFile ? (
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6 15h4.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25h-4.5m-9 0h4.5a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25z" />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                        {displaySize !== undefined && (
                            <p className="text-xs text-gray-500">{formatBytes(displaySize)}</p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowUploader(true)}
                        className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Replace
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2 w-full">
                    <label className="group w-full h-24 flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                        <svg
                            className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 16.5V9m0 0l3.5 3.5M12 9L8.5 12.5M20.25 19.5H3.75A1.5 1.5 0 012.25 18V6a1.5 1.5 0 011.5-1.5h16.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5z"
                            />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {displayName ? displayName : "Choose a file"}
                        </span>
                        <input type="file" className="hidden" onChange={saveFile} />
                    </label>
                    {existingFile && (
                        <button
                            type="button"
                            onClick={() => setShowUploader(false)}
                            className="text-xs font-medium text-gray-500 hover:text-gray-700 self-start"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            )}

            {status && <p className="text-sm font-medium text-gray-600 bg-gray-50 rounded-lg py-2 px-3">{status}</p>}
        </div>
    )
}