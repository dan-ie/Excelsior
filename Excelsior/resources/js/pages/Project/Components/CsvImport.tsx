import axios from "axios";
import {useState} from "react"
import {TemplateField } from '@/types/project'
type Props ={
    fields: TemplateField[];
    projectId: number;
}
 export default function CsvImport({fields,projectId}:Props) {
    const [file, setFile] = useState<File | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [recipientColumn, setRecipientColumn] = useState("");
    const [status, setStatus] = useState("");
        const formData = new FormData();

    const [mapping, setMapping] = useState<Record<string, string>>({});

     const certificateFields = [
        "Recipient Name",
        "Email",
        "Date of completion",
    ];


    const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            handleSubmission(selectedFile);
        }
    };

    const handleSubmission = async (selectedFile: File) => {
        if (!selectedFile) {
            setStatus('Error, no file selected')
            return
        }

        formData.append("file", selectedFile);
        try {
            setStatus("Reading CSV...")

            const response = await axios.post("/import-csv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }
        );
        console.log(response);
            // setHeaders(typeof response.data=='string' ? response.data.split(';') : response.data[0].split(';'));
            setHeaders(response.data);
            setStatus("CSV upload successful");

        }
        catch (error) {
            setStatus(`CSV file upload encountered an error`)
        }
    };

    const updateMapping = (csvColumn: string, fieldId: number) => {

        setMapping((prev) => {
            const updated = {
                ...prev,
                [fieldId]: csvColumn,
            };

            return updated;
        });
    };
    const saveMapping = () => {
        formData.set(
            "mapping",
            JSON.stringify(mapping)
        );
        formData.set("recipientColumn", recipientColumn);

        axios.post(`/projects/${projectId}/render`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    };

return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <label className="group w-full h-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
            <svg
                className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors"
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
                {file ? file.name : "Click to upload a CSV file"}
            </span>
            <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={saveFile}
            />
        </label>

        {status && (
            <p className="w-full text-sm font-medium text-center text-gray-600 bg-gray-50 rounded-lg py-2 px-3">
                {status}
            </p>
        )}

        {headers.length > 0 && (
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        Email Recipient Column
                    </h3>
                    <select
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow"
                        value={recipientColumn}
                        onChange={(e) => setRecipientColumn(e.target.value)}
                    >
                        <option value="">Select recipient column</option>

                        {headers.map((header) => (
                            <option key={header} value={header}>
                                {header}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                        CSV Columns
                    </h3>
                    <div className="flex flex-col divide-y divide-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                        {headers.map((header) => (
                            <div
                                key={header}
                                className="flex items-center gap-4 px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <p className="w-1/2 text-sm font-medium text-gray-700 truncate">
                                    {header}
                                </p>
                                <select
                                    className="w-1/2 border border-gray-300 rounded-lg p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow"
                                    onChange={(e) =>
                                        updateMapping(
                                            header,
                                            e.target.value
                                        )}
                                >
                                    <option value="">
                                        Select field
                                    </option>

                                    {fields.map((field) => (
                                        <option key={field.id} value={field.id}
                                        >
                                            {field.name}
                                        </option>
                                    ))}


                                </select>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
                    onClick={saveMapping}
                >
                    Save Mapping
                </button>
            </div>
        )}
    </div>
);
}