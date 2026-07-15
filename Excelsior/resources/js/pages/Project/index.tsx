import EmailContainer from "./Components/EmailContainer";
import FileContainer from "./Components/FileContainer";

export default function Project(project){
    console.log(project);
    return(
        <>
        <div className="flex border w-full space-between">
        <EmailContainer />
        <FileContainer />
        </div>
        </>
    )
}