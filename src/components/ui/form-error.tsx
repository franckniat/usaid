import {TriangleAlert} from "lucide-react"

interface FormErrorProps{
    message?:string;
}

export const FormError = ({message}:FormErrorProps)=>{
    if(!message)return null

    return(
        <div className="bg-red-600/15 p-3 rounded-md flex items-center gap-x-2  text-red-400">
            <TriangleAlert className="w-4 h-4"/>
            <p className="text-xs">{message}</p>
        </div>
    )
}