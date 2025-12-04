import { useEffect, useState } from "react";

const confirmationMessage = 'You have unsaved messages. Countinue?'

export function UseConfirmTabClose(){
    const [hasUnsavedChanges,setHasUnsavedChanges] = useState(false)
    useEffect(()=>{
        function handleBeforeUnload(ev){
            if (hasUnsavedChanges){
                ev.returnValue = confirmationMessage
                return confirmationMessage
            }
        }
        window.addEventListener('beforeunload',handleBeforeUnload)
        return ()=> {
            window.removeEventListener('beforeunload',handleBeforeUnload)
        }
    }),[hasUnsavedChanges]

    return setHasUnsavedChanges
}