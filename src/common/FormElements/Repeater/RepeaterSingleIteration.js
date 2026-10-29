import { useEffect } from "react";

import Button from "@/src/common/FormElements/Button/Button";
import { useFormUtils } from "@/src/hooks/useFormUtils/useFormUtils";
import { iterateOverChildren } from "./iterateOverChildren";

/**
 * Component generated for each child.
 * The reason we need this component is that we need to have a form state for every child
 *
 * @param {RepeaterSingleIterationProps} props
 * @returns
 */
export const RepeaterSingleIteration = ({
    children,
    formInitSubStructure,
    iterationKey,
    updateIterationValue,
    deleteIterationByKey,
}) => {
    //Create its own sub form state
    const { formState, formTools } = useFormUtils(formInitSubStructure);

    // update the value
    useEffect(() => {
        updateIterationValue(iterationKey, formState.inputs, formState.isValid, formState.hasAnyInputBeenTouched);
    }, [formState]);

    const deleteIterationButton = (
        <Button className="btn-close" onClick={() => deleteIterationByKey()}>
            &times;
        </Button>
    );

    //Return the children with the recursive function
    return (
        <>
            <div className="d-flex justify-content-end p-0">{deleteIterationButton}</div>
            <div>{iterateOverChildren(children, formInitSubStructure, formTools, deleteIterationByKey)}</div>
        </>
    );
};
