import axios from "axios";
import {useState} from "react"


export default function FileContainer(){
    const [file, setFile] = useState<any>(null)
    const [status, setStatus] = useState("")

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

            const response = await axios.post("http://127.0.0.1:8000/api/upload", formData, {
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

    return(
        <div className="flex flex-col items-center gap-2 w-full">
            <label className="bg-gray-600 hover:bg-gray-500 h-10 text-center active:bg-gray-400 cursor-pointer flex items-center justify-center text-white px-4 rounded w-full"> 
                {file ? file.name : "Choose a file"} 
                <input type="file" className="hidden" onChange={saveFile} />
            </label>
            {status && <p className="text-sm font-semibold text-gray-700">{status}</p>}
        </div>
    )
}