import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { lang } from "@/src/common/Data/GlobalConstants";

// Prompt the user if they try and leave with unsaved changes
/**
 * 
 * @param {object} formTools To check wether something has changed and prompt user
 * @param {boolean} saveIntention State which should change on user opening SingleSaveEntityReminder to disable listeners
 *  true if modal is opened, false if modal is closed
 */
const SingleBeforeUnloadReminder = ({formTools, saveIntention, ...props}) => {
    const router = useRouter();

    useEffect(() => {
        //Set event listener on routeChange and beforeUnload
        const warningText = lang.onNavigationBlockWithoutSave;
        const handleWindowClose = (e) => {
            //If changes haven't occured, just procced as normal
            if (!formTools.formState.hasAnyInputBeenTouched) return;

            e.preventDefault();
            return (e.returnValue = warningText);
        };

        const handleBrowseAway = () => {
            //If changes haven't occured, just procced as normal
            if (!formTools.formState.hasAnyInputBeenTouched) return;

            if (window.confirm(warningText)) return;
                router.events.emit('routeChangeError');
                throw 'routeChange aborted.';
        };

        //If intention is to save, disable the listener else enable listeners
        if(saveIntention) {
            window.removeEventListener('beforeunload', handleWindowClose);
            router.events.off('routeChangeStart', handleBrowseAway);
        }
        else {
            window.addEventListener('beforeunload', handleWindowClose);
            router.events.on('routeChangeStart', handleBrowseAway);
        }

        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
            router.events.off('routeChangeStart', handleBrowseAway);
        }

    }, [formTools.formState.inputs, saveIntention /*, initFormStateInputs*/]);

}

export default SingleBeforeUnloadReminder;