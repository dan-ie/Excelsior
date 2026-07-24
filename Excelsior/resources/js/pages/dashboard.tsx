import { Head, Link, router } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import placeholder from '@/assets/placeholder-image.png'
import {Project} from '../types/project';
import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CsvImport from "./Project/Components/CsvImport"

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    );

type Props = {
    Projects: Project[];
}
export default function Dashboard({Projects}:Props) {
    const [open,setOpen] = useState(false);

    const [projects, setProjects] = useState(Projects);

    const createProject = () => {
        router.post(`/project`)
    }
   const deleteProject = (projectId: number) => {
        axios.delete(`/project-delete/${projectId}`)
  .then(() => {
            setProjects(prev =>
                prev.filter(project => project.id !== projectId)
            );
        });
    }


    return (
        <>

            <Head title="Dashboard" />
            <div className='h-full flex flex-col'>
                <div className="grid grid-cols-3 items-center relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border max-h-150 min-h-100 ml-4 mr-4 pb-4 pt-4">
                    <div></div>
                    <p className="text-gray-900 text-6xl text-center align-middle whitespace-nowrap font-semibold mr-10 dark:text-gray-100"> Your Templates </p>
                    <div className = 'flex justify-end'>
                        <button className="cursor-pointer mr-10 align-middle bg-blue-500 hover:bg-blue-600 transition border border-3 border-blue-200 rounded-lg h-10 w-30 min-w-30 text-white dark:border-blue-700/30"> {"View all ->"} </button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-4 p-4  flex-1" >
                    <button onClick={createProject}>
                        <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer group dark:border-gray-700 dark:hover:bg-slate-950 dark:hover:border-blue-600 ">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition">
                                <span className="text-3xl">+</span>
                            </div>
                            <p className="mt-2 font-medium text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">New Template</p>
                        </div>
                    </button>
                    {projects.map(f =>
                    <>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent>
                                <CsvImport fields={f.fields} projectId={f.id}/>
                            </DialogContent>
                        </Dialog>
                        <div className=" h-full flex flex-col relative  overflow-hidden rounded-xl border-2 border-sidebar-border/70 dark:border-sidebar-border">
                            <div className="w-full flex justify-end">
                            <button onClick= {() => deleteProject(f.id)} >
                                    <div className="cursor-pointer text-black hover:text-blue-500 bg-white w-10 h-10 m-2 align-right p-2 rounded-full transition">
                                    <TrashIcon />
                                    </div>
                            </button>


                            <Link href={`/project/${f.id}`}
                                    className="cursor-pointer text-black hover:text-blue-500 bg-white w-10 h-10 m-2 align-right p-2 rounded-full transition">
                                    <EditIcon />
                            </Link>
                            </div>
                            <div className="flex-1">
                                <img className="w-full h-48 object-contain" src={f.image_url ? f.image_url : placeholder} alt={f.name} />
                            </div>
                            <div className=" flex-1 flex flex-col justify-end">
                                <hr className="border-1 border-gray:500"></hr>
                                <div className="m-5 flex flex-col items-center">
                                    <p className="font-sans text-center text-lg font-medium"> {f.name} <br /></p>
                                    <p className="font-sans text-center text-lg font-light"> {f.description} <br /></p>
                                    <p className="font-sans text-center italic">Created on: <span className='text-red-800'>{f.created_at}</span> </p>
                                    <button onClick={() => setOpen(true)} className="cursor-pointer mt-4 text-center bg-green-500 hover:bg-green-600 transition border border-3 rounded-lg h-10 w-30 min-w-30 text-white dark:border-green-700/30">Use template</button>
                                </div>
                            </div>
                        </div>
                    </>
                    )}





                </div>
            </div>

        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
