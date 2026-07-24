import EmailContainer from "./Components/EmailContainer";
import FileContainer from "./Components/FileContainer";
import CsvImport from "./Components/CsvImport";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import type { Project } from '@/types/project';
import FieldCreator from "./Components/FieldCreator";
type Props = {
    project: Project;
};

export default function ProjectDetails({project}:Props){
    const [selectedField, setSelectedField] = useState<number | null>(null);
    const [deletedFieldIds, setDeletedFieldIds] = useState([]);
    const [fields, setFields] = useState(project.fields);
    const addField = (field) => {
            setFields([...fields, field]);
        };
console.log(project);
// create a variable to store the current project data or the data that's gonna be changed
    const [projectMeta, setProjectMeta] = useState({
        name: project.name,
        description: project.description ?? '',
        is_public: project.is_public
    });
    const [processing, setProcessing] = useState(false);
// function to update the values of project.name and description when typing inside the input fields
    const updateProjectMeta = (updates: Partial<typeof projectMeta>) => {
        setProjectMeta((prev) => ({
            ...prev,
            ...updates,
        }));
    };
const updateField = (id, changes) => {
            setFields(fields.map(field =>
                field.id === id
                    ? { ...field, ...changes }
                    : field
            ));
        };
        const removeField = (id) => {
            setFields(fields.filter(field => field.id !== id));
                setDeletedFieldIds(prev => [
                ...prev,
                id
                ]);

        };
         const saveFields= () => {
            axios.post(`/templates/${project.id}/fields`,{fields,deletedFieldIds})
                .then(response => {
        setFields(response.data.fields);
            setDeletedFieldIds([]);

    });
        }
        const moveField = (id: number, x: number, y: number) => {
                setFields((prev) =>
                    prev.map((field) =>
                        field.id === id
                            ? { ...field, x, y }
                            : field
                    )
                );
            };
        //save the new data, route to ProjectController update function with the new name and description values
        const onSave = async () => {
            setProcessing(true);
            try {
                await axios.patch(`/project/${project.id}`, projectMeta);
                toast.success("Project saved successfully!");

            } catch (error) {
                console.error(error);

            }
            setProcessing(false);
        };
   return(
    <div className="p-6 max-w-5xl mx-auto space-y-8">
        <div className="min-w-0 flex-1 space-y-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div>
                <label className="text-xs font-medium text-muted-foreground">Project Name</label>
                <Input
                    value={projectMeta.name}
                    onChange={(e) => updateProjectMeta({ name: e.target.value })}
                    className="mt-1"
                />
            </div>
            <div>
                <label className="text-xs font-medium text-muted-foreground">Description</label>
                <textarea
                    value={projectMeta.description ?? ''}
                    onChange={(e) => updateProjectMeta({ description: e.target.value })}
                    rows={2}
                    className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow"
                />
            </div>
            <label className="flex items-center gap-2 cursor-pointer w-fit">
                <input
                    type='checkbox'
                    checked={projectMeta.is_public ?? false}
                    onChange={(e) => updateProjectMeta({ is_public: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                />
                <span className="text-sm text-foreground">Make project public?</span>
            </label>

            <Button onClick={onSave} disabled={processing} size="sm">
                Save
            </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                <EmailContainer emailTemplate={project.email_template} projectId={project.id} />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
                <FileContainer projectId={project.id} existingFile={project.file} />
            </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
            <FieldCreator
                thumbnail={project.file.thumbnail_path}
                fields={fields}
                addField={addField}
                selectedField={selectedField}
                setSelectedField={setSelectedField}
                updateField={updateField}
                removeField={removeField}
                moveField={moveField}
                saveFields={saveFields}
                setDeletedFieldIds={setDeletedFieldIds}
            />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
            <CsvImport fields={fields} projectId={project.id} />
        </div>
    </div>
    )
}