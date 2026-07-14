import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import placeholder from '@/assets/placeholder-image.png'
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>

);
export default function Dashboard() {
    return (
        <>
        
            <Head title="Dashboard" />
            <div className='h-full flex flex-col'>
                <div className="grid grid-cols-3 items-center relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border max-h-150 min-h-100 ml-4 mr-4 pb-4 pt-4">
                    <div></div>
                    <p className="text-gray-900 text-6xl text-center align-middle whitespace-nowrap font-semibold mr-10"> Your Templates </p>
                    <div className = 'flex justify-end'>
                        <button className="cursor-pointer mr-10 align-middle bg-blue-500 hover:bg-blue-600 transition border border-3 border-blue-200 rounded-lg h-10 w-30 min-w-30 text-white "> {"View all ->"} </button>
                    </div>
                </div>




                

                <div className="grid gap-4 md:grid-cols-4 p-4  flex-1" >
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition">
                            <span className="text-3xl">+</span>
                        </div>
                        <p className="mt-2 font-medium text-gray-500 group-hover:text-blue-600">New Template</p>
                    </div>

                    <div className=" h-full flex flex-col relative  overflow-hidden rounded-xl border-2 border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="w-full flex justify-end"> 
                          <button className="cursor-pointer text-black hover:text-blue-500 bg-white w-10 h-10 m-2 align-right p-2 rounded-full transition">
                                <EditIcon />
                            </button> 
                        </div>
                        <div className="flex-1"> 
                            <img className="w-full" src={placeholder}></img>
                        </div>
                        <div className=" flex-1 flex flex-col justify-end"> 
                            <hr className="border-1 border-gray:500"></hr>
                            <div className="m-5 flex flex-col items-center">
                                <p className="font-sans text-center text-lg font-medium"> Placeholder 1 <br /></p>
                                <p className="font-sans text-center italic">Created on: <span className='text-red-800'>date</span> </p> 
                                <button className="cursor-pointer mt-4 text-center bg-green-500 hover:bg-green-600 transition border border-3 rounded-lg h-10 w-30 min-w-30 text-white ">Use template</button>

                            </div>
                        </div>
                    </div>



                    <div className=" h-full flex flex-col relative  overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                       <div className="w-full flex justify-end"> 
                          <button className="cursor-pointer text-black hover:text-blue-500 bg-white w-10 h-10 m-2 align-right p-2 rounded-full transition">
                                <EditIcon />
                            </button> 
                        </div>
                        <div className="flex-1"> 
                            <img className="w-full" src={placeholder}></img>
                        </div>
                        <div className=" flex-1 flex flex-col justify-end"> 
                            <hr className="border-1 border-gray:500"></hr>
                            <div className="m-5 flex flex-col items-center">
                                <p className="font-sans text-center text-lg font-medium"> Placeholder 2 <br /></p>
                                <p className="font-sans text-center italic">Created on: <span className='text-red-800'>date</span> </p> 
                                <button className="cursor-pointer mt-4 text-center bg-green-500 hover:bg-green-600 transition border border-3 rounded-lg h-10 w-30 min-w-30 text-white ">Use template</button>

                            </div>
                        </div>  
                    </div>
                    <div className=" h-full flex flex-col relative  overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                       <div className="w-full flex justify-end"> 
                          <button className="cursor-pointer text-black hover:text-blue-500 bg-white w-10 h-10 m-2 align-right p-2 rounded-full transition">
                                <EditIcon />
                            </button> 
                        </div>
                        <div className="flex-1"> 
                            <img className="w-full" src={placeholder}></img>
                        </div>
                        <div className=" flex-1 flex flex-col justify-end"> 
                            <hr className="border-1 border-gray:500"></hr>
                            <div className="m-5 flex flex-col items-center">
                                <p className="font-sans text-center text-lg font-medium"> Placeholder 3 <br /></p>
                                <p className="font-sans text-center italic">Created on: <span className='text-red-800'>date</span> </p> 
                                <button className="cursor-pointer mt-4 text-center bg-green-500 hover:bg-green-600 transition border border-3 rounded-lg h-10 w-30 min-w-30 text-white ">Use template</button>

                            </div>
                        </div>                      
                    </div>
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
