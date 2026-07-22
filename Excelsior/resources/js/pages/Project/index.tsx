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
    const [fields, setFields] = useState(project.fields);
    const addField = (field) => {
            setFields([...fields, field]);
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
        };
    // create a variable to store the current project data or the data that's gonna be changed
        const [projectMeta, setProjectMeta] = useState({
            name: project.name,
            description: project.description ?? '',
        });
        const [processing, setProcessing] = useState(false);
    // function to update the values of project.name and description when typing inside the input fields
        const updateProjectMeta = (updates: Partial<typeof projectMeta>) => {
            setProjectMeta((prev) => ({
                ...prev,
                ...updates,
            }));
        };
         const saveFields= () => {
            axios.post(`/templates/${project.id}/fields`,fields)
                .then(response => {
        setFields(response.data.fields);
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
    <div className="p-5">
        <div className="min-w-0 flex-1 space-y-3">
            <div>
                <label className="text-xs font-medium text-muted-foreground">project Name</label>
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
                    className="w-full rounded-md border border-border bg-background p-2 text-sm text-foreground mt-1"
                />
            </div>
            <Button onClick={onSave} disabled={processing} size="sm">
                Save
            </Button>
        </div>
        <div className="grid grid-cols-2 p-5 gap-2">
            <div className="border p-5">
                <EmailContainer />
            </div>
            <div className="border p-5">
                <FileContainer />

            </div>
        </div>
        <div>
            <FieldCreator    
            fields={fields}
            addField={addField}
            updateField={updateField}
            removeField={removeField}
            moveField={moveField}
            saveFields={saveFields}
        />
        </div>
        <div className="border p-5">
                <CsvImport />

            </div>
    </div>
    )
}