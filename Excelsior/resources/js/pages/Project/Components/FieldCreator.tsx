import { useState } from "react";
import placeholder from '@/assets/placeholder-image.png'
import axios from "axios";
type TemplateField = {
    id: number;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    settings: {};
};
type Props = {
    fields: TemplateField;
}
export default function FieldCreator({fields,addField,setFields,removeField,moveField,saveFields}:Props){
const [dragging, setDragging] = useState<number | null>(null);
    
   
    return(
        <>
            <div className="relative" onMouseMove={(e) => {
                    if (dragging === null) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    moveField(
                        dragging,
                        e.clientX - rect.left,
                        e.clientY - rect.top
                    );
                }}
                onMouseUp={() => setDragging(null)}>
                <img src={placeholder} />

                {fields.map((field) => (
                    <div
                        key={field.id}
                        className="absolute border bg-white/50 cursor-move"
                        style={{
                            left: field.x +'px',
                            top: field.y +'px',
                            width: field.width +'px',
                            height: field.height +'px',
                        }}
                        onMouseDown={() => setDragging(field.id)}
                    >
                        {field.name}
                    </div>
                ))}
            </div>    
            <button onClick={saveFields}>save Fields</button>   
             <button onClick={() => addField(
            {
                id: Date.now(),
                name: "Recipient Name",
                x: 100,
                y: 100,
                width: 200,
                height: 40,
                settings:{'color':'red'},
            }
        )}>Add Field</button>
        </>
    )

}