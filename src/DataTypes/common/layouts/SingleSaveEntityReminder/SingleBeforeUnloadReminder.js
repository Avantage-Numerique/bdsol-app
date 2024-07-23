import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { lang } from "@/src/common/Data/GlobalConstants";

// Prompt the user if they try and leave with unsaved changes
const SingleBeforeUnloadReminder = ({formTools, ...props}) => {
    const router = useRouter();
    
    const initFormStateInputs = useRef(0);
    const unsavedChanges = useRef(false);
    
    //SetTimeout soo that formTools has time to update fields and stop changing and set initFormStateInputs
    useEffect( () => {
        const timer = setTimeout(() => {
            initFormStateInputs.current = formTools.formState.inputs;
        }, 1000);
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        //If initFormStateInputs has been updated check for unsavedChanges, else no unsavedChanges
        if(initFormStateInputs.current != 0)
            unsavedChanges.current = JSON.stringify(initFormStateInputs.current) !== JSON.stringify(formTools.formState.inputs) 
        else
            unsavedChanges.current = false;

        console.log("UnsavedChanges", unsavedChanges.current);
        console.log("stringify init", JSON.stringify(initFormStateInputs.current))
        console.log("stringify current", JSON.stringify(formTools.formState.inputs))
        
        //Set event listener on routeChange and beforeUnload
        const warningText = lang.onNavigationBlockWithoutSave;
        const handleWindowClose = (e) => {
            //If changes haven't occured, just procced as normal
            if (!unsavedChanges.current) return;

            e.preventDefault();
            return (e.returnValue = warningText);
        };

        const handleBrowseAway = () => {
            //If changes haven't occured, just procced as normal
            if (!unsavedChanges.current) return;

            if (window.confirm(warningText)) return;
                router.events.emit('routeChangeError');
                throw 'routeChange aborted.';
        };

        window.addEventListener('beforeunload', handleWindowClose);
        router.events.on('routeChangeStart', handleBrowseAway);

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            router.events.off('routeChangeStart', handleBrowseAway);
        };

    }, [formTools.formState.inputs, initFormStateInputs]);

}

export default SingleBeforeUnloadReminder;