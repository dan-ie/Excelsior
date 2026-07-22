import axios from "axios";
import {useState} from "react"


 export default function CsvImport() {
    const [file, setFile] = useState<File | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [status, setStatus] = useState("");

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

        const formData = new FormData();
        formData.append("csv_file", selectedFile);
        try {
            setStatus("Reading CSV...")

            const response = await axios.post("/import-csv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }
        );
            // setHeaders(typeof response.data=='string' ? response.data.split(';') : response.data[0].split(';'));
            setHeaders(response.data);
            setStatus("CSV upload successful");

        }
        catch (error) {
            setStatus(`CSV file upload encountered an error`)
        }
    };

const updateMapping = (csvColumn: string, field: string) => {
    setMapping((prev) => ({
        ...prev,
        [csvColumn]: field,
    }));
};
const saveMapping =( ) => {
    console.log(mapping);
    setStatus("Mapping saved");
    };

console.log(headers);

return (
 <div className="flex flex-col items-center gap-2 w-full">
            <label className="bg-gray-600 hover:bg-gray-500 h-10 text-center active:bg-gray-400 cursor-pointer flex items-center justify-center text-white px-4 rounded ">

                {file ? file.name : "Upload a CSV"}
                <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={saveFile}
                />
            </label>

            {status && (
                <p className="text-sm font-semibold text-gray-700">{status}
                </p>)}

            {headers.length > 0 && (
                 <div>
                 <h3>CSV Columns:</h3>
                 {headers.map((header) =>(
                     <div
                      key={header}
                      className="flex items-center gap-10"
                      >
                     <p className="w-60">
                     {header}
                     </p>
                      <select
                      className="border rounded p-2"
                      value={mapping[header] || ""}
                      onChange={(e) =>
                          updateMapping(
                              header,
                              e.target.value
                              )}
                     >
                     <option value="">
                     Select field
                     </option>

                     {certificateFields.map((field) => (
                         <option key={field} value={field}
                         >
                         {field}
                         </option>
                         ))}


                     </select>
                     </div>
                ) )}

                 <button
                 className="bg-blue-600 text-white px-4 py-2 rounded"
                 onClick={saveMapping}
                  >
                 Save Mapping
                 </button>

        </div>
        )}
    </div>
    );
}

